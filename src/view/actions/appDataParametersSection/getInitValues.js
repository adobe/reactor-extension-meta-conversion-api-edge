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
export default ({ settings }) => {
  return {
    advertiserTrackingEnabled: settings?.advertiserTrackingEnabled || '',
    applicationTrackingEnabled: settings?.applicationTrackingEnabled || '',
    campaignIds: settings?.campaignIds || '',
    installReferrer: settings?.installReferrer || '',
    installerPackage: settings?.installerPackage || '',
    urlSchemes: settings?.urlSchemes || '',
    vendorId: settings?.vendorId || '',
    windowsAttributionId: settings?.windowsAttributionId || '',
    extinfoVersion: settings?.extinfoVersion || '',
    extinfoAppPackageName: settings?.extinfoAppPackageName || '',
    extinfoShortVersion: settings?.extinfoShortVersion || '',
    extinfoLongVersion: settings?.extinfoLongVersion || '',
    extinfoOsVersion: settings?.extinfoOsVersion || '',
    extinfoDeviceModelName: settings?.extinfoDeviceModelName || '',
    extinfoLocale: settings?.extinfoLocale || '',
    extinfoTimezoneAbbreviation: settings?.extinfoTimezoneAbbreviation || '',
    extinfoCarrier: settings?.extinfoCarrier || '',
    extinfoScreenWidth: settings?.extinfoScreenWidth || '',
    extinfoScreenHeight: settings?.extinfoScreenHeight || '',
    extinfoScreenDensity: settings?.extinfoScreenDensity || '',
    extinfoCpuCores: settings?.extinfoCpuCores || '',
    extinfoExternalStorageSizeGb: settings?.extinfoExternalStorageSizeGb || '',
    extinfoFreeSpaceExternalStorageGb:
      settings?.extinfoFreeSpaceExternalStorageGb || '',
    extinfoDeviceTimezone: settings?.extinfoDeviceTimezone || ''
  };
};
