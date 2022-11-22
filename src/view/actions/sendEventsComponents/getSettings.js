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

export default ({
  isTestEvent,
  testEventCode,
  eventName,
  eventTime,
  eventSourceUrl,
  optOut,
  eventId,
  actionSource,
  email,
  phone,
  gender,
  dob,
  lastName,
  firstName,
  city,
  state,
  zip,
  country,
  externalId,
  clientIpAddress,
  clientUserAgent,
  fbc,
  fbp,
  subscriptionId,
  fbLoginId,
  leadId,
  value,
  currency,
  contentName,
  contentCategory,
  contentIds,
  contents,
  contentType,
  orderId,
  predictedLtv,
  numItems,
  searchString,
  status,
  deliveryCategory,
  lduEnabled,
  customData
}) => ({
  isTestEvent,
  testEventCode,
  eventName,
  eventTime,
  eventSourceUrl,
  optOut,
  eventId,
  actionSource: actionSources.getActionSourceId(actionSource),
  email,
  phone,
  gender,
  dob,
  lastName,
  firstName,
  city,
  state,
  zip,
  country,
  externalId,
  clientIpAddress,
  clientUserAgent,
  fbc,
  fbp,
  subscriptionId,
  fbLoginId,
  leadId,
  value,
  currency,
  contentName,
  contentCategory,
  contentIds,
  contents,
  contentType,
  orderId,
  predictedLtv,
  numItems,
  searchString,
  status,
  deliveryCategory,
  lduEnabled,
  customData
});
