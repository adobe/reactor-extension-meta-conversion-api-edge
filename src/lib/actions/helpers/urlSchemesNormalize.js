/*
Copyright 2026 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const {
  URL_SCHEMES_INVALID_MESSAGE
} = require('../../../constants/urlSchemesInvalidMessage');
const coerceUrlSchemesStringArray = require('../../../constants/coerceUrlSchemesStringArray');
const parseUrlSchemesJsonArray = require('../../../constants/parseUrlSchemesJsonArray');

const assertStringArray = (arr) => {
  const coerced = coerceUrlSchemesStringArray(arr);
  if (coerced == null) {
    throw new Error(URL_SCHEMES_INVALID_MESSAGE);
  }
  return coerced;
};

/**
 * Normalize url_schemes for Meta CAPI app_data.
 *
 * @param {unknown} value
 * @returns {string[]|undefined}
 */
function normalizeUrlSchemes(value) {
  if (value == null || value === '') {
    return undefined;
  }
  if (Array.isArray(value)) {
    return assertStringArray(value);
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) {
      return undefined;
    }
    const parsed = parseUrlSchemesJsonArray(trimmed);
    if (parsed == null) {
      throw new Error(URL_SCHEMES_INVALID_MESSAGE);
    }
    return parsed;
  }
  throw new Error(URL_SCHEMES_INVALID_MESSAGE);
}

module.exports = {
  normalizeUrlSchemes
};
