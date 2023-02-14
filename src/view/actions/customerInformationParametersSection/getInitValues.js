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
export default ({ settings }) => {
  return {
    email: settings?.email || '',
    phone: settings?.phone || '',
    firstName: settings?.firstName || '',
    lastName: settings?.lastName || '',
    dob: settings?.dob || '',
    gender: settings?.gender || '',
    city: settings?.city || '',
    state: settings?.state || '',
    zip: settings?.zip || '',
    country: settings?.country || '',
    externalId: settings?.externalId || '',
    clientIpAddress: settings?.clientIpAddress || '',
    clientUserAgent: settings?.clientUserAgent || '',
    fbc: settings?.fbc || '',
    fbp: settings?.fbp || '',
    subscriptionId: settings?.subscriptionId || '',
    fbLoginId: settings?.fbLoginId || '',
    leadId: settings?.leadId || ''
  };
};
