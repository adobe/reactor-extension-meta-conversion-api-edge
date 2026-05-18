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

import resolveUrlSchemesFormValue from './resolveUrlSchemesFormValue';

const keysWithPrimitiveValues = [
  'advertiserTrackingEnabled',
  'applicationTrackingEnabled',
  'campaignIds',
  'installReferrer',
  'installerPackage',
  'vendorId',
  'windowsAttributionId',
  'extinfoVersion',
  'extinfoAppPackageName',
  'extinfoShortVersion',
  'extinfoLongVersion',
  'extinfoOsVersion',
  'extinfoDeviceModelName',
  'extinfoLocale',
  'extinfoTimezoneAbbreviation',
  'extinfoCarrier',
  'extinfoScreenWidth',
  'extinfoScreenHeight',
  'extinfoScreenDensity',
  'extinfoCpuCores',
  'extinfoExternalStorageSizeGb',
  'extinfoFreeSpaceExternalStorageGb',
  'extinfoDeviceTimezone'
];

export default (values) => {
  const result = {};

  keysWithPrimitiveValues.forEach((v) => {
    if (values[v]) {
      result[v] = values[v];
    }
  });

  const urlSchemesResolved = resolveUrlSchemesFormValue(values?.urlSchemes);
  if (
    urlSchemesResolved.kind === 'dataElementToken' ||
    urlSchemesResolved.kind === 'array'
  ) {
    result.urlSchemes = urlSchemesResolved.value;
  }

  return result;
};
