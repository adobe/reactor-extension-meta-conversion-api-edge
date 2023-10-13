/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import API_VERSION from '../../utils/apiVersion';
import { getFetchSettings } from '../../utils/fetch';
import getUserId from '../../utils/getUserId';

const APP_ID = '902856961058720'; // Adobe-Event-Forwarding App ID
const FACEBOOK_SCOPES = 'ads_management,manage_business_extension';

// This is a unique ID for our business / client, it can be any string.
const FBE_EXTERNAL_BUSINESS_ID_BASE = 'Adobe-CDP-Fist-Time-User-Experience-';
let FBE_EXTERNAL_BUSINESS_ID;

async function getFbeInstallationDetails(accessToken) {
  const url = `https://graph.facebook.com/${API_VERSION}/fbe_business/fbe_installs?fbe_external_business_id=${FBE_EXTERNAL_BUSINESS_ID}&access_token=${accessToken}`;

  const response = await fetch(url, {
    method: 'GET'
  });
  return response.json();
}

async function convertAccessTokenToSystemAccessToken(
  accessToken,
  clientBusinessManagerId
) {
  const url = `https://graph.facebook.com/${API_VERSION}/${clientBusinessManagerId}/access_token`;

  const formData = new FormData();
  formData.append('app_id', APP_ID);
  formData.append('scope', FACEBOOK_SCOPES);
  formData.append('access_token', accessToken);
  formData.append('fbe_external_business_id', FBE_EXTERNAL_BUSINESS_ID);

  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

async function getPixelAndSystemUserAccessToken(accessToken) {
  const fbeInstallationDetails = await getFbeInstallationDetails(accessToken);
  if (fbeInstallationDetails.error) {
    throw new Error(
      'An error was encoutered while we were fetching the Pixel ID.'
    );
  }

  const {
    data: [fbeInstallation]
  } = fbeInstallationDetails;

  const suatTokenData = await convertAccessTokenToSystemAccessToken(
    accessToken,
    fbeInstallation.business_manager_id
  );

  if (suatTokenData.error) {
    throw new Error(
      'An error was encountered while we were exchanging the access token with a ' +
        'System User access token.'
    );
  }

  return {
    pixelId: fbeInstallation.pixel_id,
    accessToken,
    suatAccessToken: suatTokenData.access_token
  };
}

const initializeFacebookSDK = () => {
  let resolve;

  if (window.FB) {
    return Promise.resolve();
  }

  window.fbAsyncInit = () => {
    window.FB.init({
      appId: APP_ID, // FB App ID
      cookie: false, // enable cookies to allow the server to access the session
      xfbml: false, // parse social plugins on this page
      version: API_VERSION
    });

    resolve();
  };

  ((d, s, id) => {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    const js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  return new Promise((r) => {
    resolve = r;
  });
};

const startMetaLoginAndFetchPixelIdAndToken = (userId) => () => {
  FBE_EXTERNAL_BUSINESS_ID =
    FBE_EXTERNAL_BUSINESS_ID_BASE + (userId || crypto.randomUUID());

  const currencyCode = Intl?.NumberFormat
    ? new Intl.NumberFormat(
        window.navigator.language || window.navigator.userLanguage,
        {
          style: 'currency',
          currency: 'USD'
        }
      ).resolvedOptions().currency
    : 'USD';

  return new Promise((resolve, reject) => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const {
            authResponse: { accessToken }
          } = response;

          getPixelAndSystemUserAccessToken(accessToken)
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error('User cancelled login or did not fully authorize.'));
        }
      },
      {
        scope: FACEBOOK_SCOPES,
        // refer to the extras object table for details
        extras: {
          setup: {
            external_business_id: FBE_EXTERNAL_BUSINESS_ID,
            timezone:
              Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.timeZone ||
              'US/Mountain',
            currency: currencyCode,
            business_vertical: 'MEASUREMENT_AND_OPTIMIZATION',
            channel: 'CONVERSIONS_API'
          },
          business_config: {
            business: {
              name: 'Adobe CDP Fist Time User Experience'
            }
          },
          repeat: false
        }
      }
    );
  });
};

export default () => {
  const userId = getUserId(getFetchSettings().token);
  return initializeFacebookSDK().then(
    startMetaLoginAndFetchPixelIdAndToken(userId)
  );
};
