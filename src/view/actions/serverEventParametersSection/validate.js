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
import CONSTANTS from '../../utils/constants';
import { isDataElementToken } from '../../utils/validators';

export default (values) => {
  const errors = {};

  [
    ['eventName', values.eventName, 'an event name'],
    ['eventTime', values.eventTime, 'an event time'],
    ['actionSource', values.actionSource, 'the action source']
  ].forEach(([key, value, errorVariableDescription]) => {
    checkRequired(key, value, errorVariableDescription || `a ${key}`, errors);
  });

  if (
    values?.actionSource?.toLowerCase() === CONSTANTS.WEBSITE &&
    !values.eventSourceUrl
  ) {
    errors.eventSourceUrl = 'Please provide the event source URL.';
  }

  if (
    values?.eventSourceUrl &&
    !isDataElementToken(values.eventSourceUrl) &&
    !values.eventSourceUrl.match(/https?:\/\//)
  ) {
    errors.eventSourceUrl =
      'The URL must begin with http://, https:// or be a data element.';
  }

  return errors;
};
