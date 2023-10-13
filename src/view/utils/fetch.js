/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import CONSTANTS from './constants';
import getEnvironment from './getEnvironment';

const { CLIENT_ID, API_PRODUCTION_URL, API_STAGE_URL } = CONSTANTS;
let fetchSettings = { imsOrgId: null, token: null };

export default async (url, options = {}) => {
  if (!fetchSettings.imsOrgId || !fetchSettings.token) {
    return Promise.reject(
      new Error(
        'No settings were found. You need to call `updateFetchSettings` before using `fetch`.'
      )
    );
  }

  const apiUrl =
    fetchSettings.apiEndpoint ||
    (getEnvironment(fetchSettings.token) === 'staging'
      ? API_STAGE_URL
      : API_PRODUCTION_URL);

  url = url.match(/^(?:https?:)?\/\//) ? url : `${apiUrl}${url}`;

  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    ...options,
    headers: {
      Accept: 'application/vnd.api+json;revision=1',
      'Content-Type': 'application/vnd.api+json',
      'X-Api-Key': CLIENT_ID,
      'x-gw-ims-org-id': fetchSettings.imsOrgId,
      Authorization: `Bearer ${fetchSettings.token}`,
      ...options.headers
    }
  });

  let json;

  try {
    json = await response.json();
  } catch (e) {
    return Promise.reject(
      new Error(`The response returned by "${url}" is not a valid JSON.`)
    );
  }

  if (!response.ok) {
    if (json.errors) {
      return Promise.reject(
        new Error(`The URL "${url}" has returned: ${json.errors[0].title}`)
      );
    }

    if (json.error) {
      return Promise.reject(new Error(json.error.message));
    }

    return Promise.reject(
      new Error(
        `The URL "${url}" has returned: ${response.status} ${response.statusText}`
      )
    );
  }

  return json;
};

export const updateFetchSettings = (settings) => {
  fetchSettings = settings;
};

export const getFetchSettings = () => fetchSettings;
