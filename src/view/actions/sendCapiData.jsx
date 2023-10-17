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
import React from 'react';

import ExtensionView from '../components/extensionView';

import ServerEventParametersFields from './serverEventParametersSection/fields';
import getServerEventParametersInitValues from './serverEventParametersSection/getInitValues';
import getServerEventParametersSettings from './serverEventParametersSection/getSettings';
import validateServerEventParametersFields from './serverEventParametersSection/validate';

import LimitedDataUseFields from './limitedDataUseSection/fields';
import getLimitedDataUseInitValues from './limitedDataUseSection/getInitValues';
import getLimitedDataUseSettings from './limitedDataUseSection/getSettings';
import validateLimitedDataUseFields from './limitedDataUseSection/validate';

import CustomerInformationFields from './customerInformationParametersSection/fields';
import getCustomerInformationInitValues from './customerInformationParametersSection/getInitValues';
import getCustomerInformationSettings from './customerInformationParametersSection/getSettings';
import validateCustomerInformationFields from './customerInformationParametersSection/validate';

import CustomDataFields from './customDataSection/fields';
import getCustomDataInitValues from './customDataSection/getInitValues';
import getCustomDataSettings from './customDataSection/getSettings';
import validateCustomDataFields from './customDataSection/validate';

import TestEventFields from './testEventSection/fields';
import getTestEventInitValues from './testEventSection/getInitValues';
import getTestEventSettings from './testEventSection/getSettings';
import validateTestEventFields from './testEventSection/validate';

import ConfigurationFields from '../configuration/components/fields';
import getConfigurationInitValues from '../configuration/components/getInitValues';
import getConfigurationSettings from '../configuration/components/getSettings';

export default function SendCapiData() {
  return (
    <ExtensionView
      getInitialValues={({ initInfo }) => ({
        ...getServerEventParametersInitValues(initInfo),
        ...getLimitedDataUseInitValues(initInfo),
        ...getCustomerInformationInitValues(initInfo),
        ...getCustomDataInitValues(initInfo),
        ...getTestEventInitValues(initInfo),
        ...getConfigurationInitValues(initInfo)
      })}
      getSettings={({ values }) => ({
        ...getServerEventParametersSettings(values),
        ...getLimitedDataUseSettings(values),
        ...getCustomerInformationSettings(values),
        ...getCustomDataSettings(values),
        ...getTestEventSettings(values),
        ...getConfigurationSettings(values)
      })}
      validate={(values) => ({
        ...validateServerEventParametersFields(values),
        ...validateLimitedDataUseFields(values),
        ...validateCustomerInformationFields(values),
        ...validateCustomDataFields(values),
        ...validateTestEventFields(values)
      })}
      render={() => (
        <>
          <ServerEventParametersFields />
          <LimitedDataUseFields />
          <CustomerInformationFields />
          <CustomDataFields />
          <TestEventFields />
          <ConfigurationFields mode="override" />
        </>
      )}
    />
  );
}
