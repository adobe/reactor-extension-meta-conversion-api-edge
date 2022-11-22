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

import CONSTANTS from '../../utils/constants';
import parseJson from '../../utils/parseJson';
import { isDataElementToken } from '../../utils/validators';

const isEmpty = (data) => {
  if (!data || !data.length) {
    return false;
  }

  if (!data[0].value && !data[0].name) {
    return false;
  }

  return true;
};

export default ({
  customDataJsonPairs = [],
  customDataType,
  customDataRaw,
  eventName
}) => {
  const errors = {};

  if (!customDataRaw && isEmpty(customDataJsonPairs)) {
    return errors;
  }

  if (customDataType === 'raw' && customDataRaw) {
    if (!isDataElementToken(customDataRaw)) {
      const { result, parsedJson } = parseJson(customDataRaw);

      if (!result) {
        errors.customDataRaw = 'Please enter a valid JSON payload.';
      }

      if (
        eventName &&
        eventName.toLowerCase() === CONSTANTS.PURCHASE &&
        (!parsedJson?.currency || !parsedJson?.value)
      ) {
        errors.customDataRaw =
          'The custom data needs to contain the "currency" and "value" keys for Purchase events.';
      }
    }
  }

  if (
    customDataType === 'json' &&
    eventName &&
    eventName.toLowerCase() === CONSTANTS.PURCHASE
  ) {
    const keys = (customDataJsonPairs || []).map(({ key }) => key);
    if (!keys.includes('currency') || !keys.includes('value')) {
      errors[`customDataJsonPairs.0.key`] =
        'The custom data needs to contain the "currency" and "value" keys for Purchase events.';
    }
  }

  return errors;
};
