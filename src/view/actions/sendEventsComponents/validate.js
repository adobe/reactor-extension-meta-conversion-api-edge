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

import checkRequired from '../../utils/checkRequired';

export default (values) => {
  const errors = {};

  if (values.isTestEvent && !values.testEventCode) {
    errors.testEventCode =
      'To send a test event, Please enter a Test Event Code';
  }

  [
    ['eventName', values.eventName, 'an event name'],
    ['eventTime', values.eventTime, 'an event time'],
    ['actionSource', values.actionSource, 'the action source']
  ].forEach(([key, value, errorVariableDescription]) => {
    checkRequired(key, value, errorVariableDescription || `a ${key}`, errors);
  });

  if (
    values.actionSource &&
    values.actionSource.toLowerCase() === 'website' &&
    !values.clientUserAgent
  ) {
    errors.clientUserAgent =
      'For website events, please specify the Client User Agent';
  }

  if (
    values.actionSource &&
    values.actionSource.toLowerCase() === 'website' &&
    !values.eventSourceUrl
  ) {
    errors.eventSourceUrl =
      'For website events, please specify the Event Source URL';
  }

  if (
    typeof values.customData === 'string' &&
    !values.customData.includes('{{')
  ) {
    try {
      const payload = JSON.parse(values.customData);
      if (
        values.eventName &&
        values.eventName.toLowerCase() === 'purchase' &&
        (!payload.hasOwnProperty('currency') ||
          !payload.hasOwnProperty('value'))
      ) {
        errors.customData =
          'The parameters "currency" and "value" are required for Purchase events';
      }
    } catch (e) {
      errors.customData = 'Please enter a valid JSON payload';
    }
  }

  return errors;
};
