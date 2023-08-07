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

/* eslint-disable camelcase */

const shaHashingHelper = require('./helpers/shaHashingHelper');
const {
  emailNormalizer,
  phoneNumberNormalizer,
  nameNormalizer,
  cityNormalizer,
  stateNormalizer,
  zipNormalizer,
  countryNormalizer
} = require('./helpers/normalizers');
const { isString, isObject } = require('./helpers/validators');
const parseCustomData = require('./helpers/parseCustomData');
const lduValue = 'LDU';
const agentValue = 'adobe_launch';

const buildEventBody = async (getSettings) => {
  const {
    actionSource,
    clientIpAddress,
    clientUserAgent,
    country,
    city,
    customData,
    dob,
    email,
    eventId,
    eventName,
    eventSourceUrl,
    eventTime,
    externalId,
    fbc,
    fbLoginId,
    fbp,
    firstName,
    gender,
    isTestEvent,
    lduEnabled,
    leadId,
    lastName,
    optOut,
    phone,
    state,
    subscriptionId,
    testEventCode,
    zip,
    partnerId,
    partnerName
  } = getSettings();

  const body = {
    test_event_code: isTestEvent ? testEventCode : undefined,
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        event_id: eventId ? eventId : undefined,
        event_source_url: eventSourceUrl ? eventSourceUrl : undefined,
        action_source: actionSource,
        opt_out: optOut ? optOut : undefined,
        data_processing_options: lduEnabled ? [lduValue] : [],
        data_processing_options_country: lduEnabled ? 0 : undefined,
        data_processing_options_state: lduEnabled ? 0 : undefined,
        user_data: {
          client_ip_address: clientIpAddress,
          client_user_agent: clientUserAgent,
          country: country ? await countryNormalizer(country) : undefined,
          ct: city ? await cityNormalizer(city) : undefined,
          db: dob
            ? await shaHashingHelper('Date of birth (db)', dob)
            : undefined,
          em: email ? await emailNormalizer(email) : undefined,
          external_id: externalId
            ? await shaHashingHelper('External ID (external_id)', externalId)
            : undefined,
          fb_login_id: fbLoginId ? fbLoginId : undefined,
          fbc: fbc ? fbc : undefined,
          fbp: fbp ? fbp : undefined,
          fn: firstName
            ? await nameNormalizer('First Name (fn)', firstName)
            : undefined,
          ge: gender
            ? await shaHashingHelper('Gender (ge)', gender)
            : undefined,
          lead_id: leadId ? leadId : undefined,
          ln: lastName
            ? await nameNormalizer('Last Name (ln)', lastName)
            : undefined,
          ph: phone ? await phoneNumberNormalizer(phone) : undefined,
          st: state ? await stateNormalizer(state) : undefined,
          subscription_id: subscriptionId ? subscriptionId : undefined,
          zp: zip ? await zipNormalizer(zip) : undefined,
          partner_name: partnerName ? partnerName : undefined,
          partner_id: partnerId ? partnerId : undefined
        }
      }
    ],
    partner_agent: agentValue
  };

  if (customData) {
    let c = customData;

    // Previous versions of the extension were saving custom data as a string.
    if (isString(customData)) {
      c = parseCustomData(c);
    }

    if (isObject(c)) {
      body.data[0].custom_data = c;
    }
  }

  return {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  };
};

module.exports = async ({ utils }) => {
  const { getExtensionSettings, getSettings, fetch } = utils;
  const { pixelId, accessToken } = getExtensionSettings();
  const version = 'v17.0';
  const url = `https://graph.facebook.com/${version}/${pixelId}/events/?access_token=${accessToken}`;

  return fetch(url, await buildEventBody(getSettings));
};
