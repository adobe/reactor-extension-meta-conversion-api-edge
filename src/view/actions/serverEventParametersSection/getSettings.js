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

import actionSources from '../../utils/actionSources';

export default (values) => {
  const result = {};

  [
    'eventName',
    'eventTime',
    'eventSourceUrl',
    'optOut',
    'eventId',
    'actionSource'
  ].forEach((v) => {
    if (v === 'optOut') {
      if (values[v] === 'true') {
        result.optOut = true;
      } else if (values[v] === 'false') {
        result.optOut = false;
      } else if (values[v]) {
        result.optOut = values[v];
      }
    } else if (values[v]) {
      result[v] =
        v === 'actionSource'
          ? actionSources.getActionSourceId(values[v])
          : values[v];
    }
  });

  return result;
};
