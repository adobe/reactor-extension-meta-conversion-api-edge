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

import React from 'react';
import { Content, ContextualHelp, Heading } from '@adobe/react-spectrum';
import CONSTANTS from '../../utils/constants';
import WrappedComboBoxField from '../../components/wrappedComboBox';

const isAppActionSource = (actionSource) =>
  actionSource?.toLowerCase() === CONSTANTS.APP;

const trackingEnabledItems = [
  { id: 0, name: 'false' },
  { id: 1, name: 'true' }
];

export default ({ actionSource } = {}) => {
  const requiredForApp = isAppActionSource(actionSource);

  return [
    [
      'advertiserTrackingEnabled',
      'Advertiser Tracking Enabled',
      'Specifies ATT permission on an iOS 14.5+ device.',
      requiredForApp,
      <ContextualHelp>
        <Heading>Need help?</Heading>
        <Content>
          <p>
            Required for app events. Use this field to specify ATT permission on
            an iOS 14.5+ device. Set to <code>false</code> for disabled or{' '}
            <code>true</code> for enabled.
          </p>
        </Content>
      </ContextualHelp>,
      WrappedComboBoxField,
      {
        defaultItems: trackingEnabledItems,
        allowsCustomValue: true,
        minWidth: 'size-4600'
      }
    ],
    [
      'applicationTrackingEnabled',
      'Application Tracking Enabled',
      'Reflects the user\u2019s app-level ad tracking opt-out setting.',
      requiredForApp,
      <ContextualHelp>
        <Heading>Need help?</Heading>
        <Content>
          <p>
            Required for app events. A person can choose to enable ad tracking
            on an app level. Set to <code>false</code> for disabled or{' '}
            <code>true</code> for enabled.
          </p>
        </Content>
      </ContextualHelp>,
      WrappedComboBoxField,
      {
        defaultItems: trackingEnabledItems,
        allowsCustomValue: true,
        minWidth: 'size-4600'
      }
    ],
    [
      'extinfoVersion',
      'Extinfo: Version',
      'extinfo version. Use "a2" for Android, "i2" for iOS.',
      requiredForApp,
      <ContextualHelp>
        <Heading>Need help?</Heading>
        <Content>
          <p>
            Required for app events. Index 0 of the <code>extinfo</code> array.
            Use <code>a2</code> for Android, <code>i2</code> for iOS.
          </p>
        </Content>
      </ContextualHelp>
    ],
    [
      'extinfoAppPackageName',
      'Extinfo: App Package Name',
      'Example: com.facebook.sdk.samples.hellofacebook'
    ],
    [
      'extinfoShortVersion',
      'Extinfo: Short Version',
      'Short version (int or string). Example: 1.0'
    ],
    [
      'extinfoLongVersion',
      'Extinfo: Long Version',
      'Long version. Example: 1.0 long'
    ],
    [
      'extinfoOsVersion',
      'Extinfo: OS Version',
      'OS version. Example: 13.4.1',
      requiredForApp,
      <ContextualHelp>
        <Heading>Need help?</Heading>
        <Content>
          <p>
            Required for app events. Index 4 of the <code>extinfo</code> array.
          </p>
        </Content>
      </ContextualHelp>
    ],
    [
      'extinfoDeviceModelName',
      'Extinfo: Device Model Name',
      'Example: iPhone5,1'
    ],
    ['extinfoLocale', 'Extinfo: Locale', 'Example: En_US'],
    [
      'extinfoTimezoneAbbreviation',
      'Extinfo: Timezone Abbreviation',
      'Example: PDT'
    ],
    ['extinfoCarrier', 'Extinfo: Carrier', 'Example: AT&T'],
    ['extinfoScreenWidth', 'Extinfo: Screen Width', 'Example: 320'],
    ['extinfoScreenHeight', 'Extinfo: Screen Height', 'Example: 568'],
    ['extinfoScreenDensity', 'Extinfo: Screen Density', 'Example: 2'],
    ['extinfoCpuCores', 'Extinfo: CPU Cores', 'Example: 2'],
    [
      'extinfoExternalStorageSizeGb',
      'Extinfo: External Storage Size (GB)',
      'External storage size in GB. Example: 13'
    ],
    [
      'extinfoFreeSpaceExternalStorageGb',
      'Extinfo: Free Space on External Storage (GB)',
      'Free space on external storage in GB. Example: 8'
    ],
    [
      'extinfoDeviceTimezone',
      'Extinfo: Device Timezone',
      'Example: USA/New York'
    ],
    [
      'campaignIds',
      'Campaign IDs',
      'Encrypted string appended to the outbound URL or deep link.'
    ],
    [
      'installReferrer',
      'Install Referrer',
      'Third-party install referrer (Android only).'
    ],
    [
      'installerPackage',
      'Installer Package',
      'Used internally by the Android SDKs.'
    ],
    [
      'urlSchemes',
      'URL Schemes',
      'Used internally by the iOS and Android SDKs.'
    ],
    ['vendorId', 'Vendor ID', 'Vendor ID.'],
    [
      'windowsAttributionId',
      'Windows Attribution ID',
      'Attribution token used for Windows 10.'
    ]
  ];
};
