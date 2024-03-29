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

export default (values) => {
  const errors = {};

  if (
    values?.actionSource?.toLowerCase() === CONSTANTS.WEBSITE &&
    !values.clientUserAgent
  ) {
    errors.clientUserAgent = 'Please provide a Client User Agent.';
  }

  if (values?.lduEnabled && !values.clientIpAddress) {
    errors.clientIpAddress = 'Please provide a Client IP address.';
  }

  if (values?.partnerName && !values.partnerId) {
    errors.partnerId =
      ' If you provide the partner name, then you must also provide partner ID."';
  }

  if (values?.partnerId && !values.partnerName) {
    errors.partnerName =
      ' If you provide the partner ID, then you must also provide partner name."';
  }

  return errors;
};
