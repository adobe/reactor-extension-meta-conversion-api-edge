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
import { useFormContext } from 'react-hook-form';
import {
  Content,
  Flex,
  Heading,
  Link,
  TextField,
  ContextualHelp,
  InlineAlert,
  View
} from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';
import { isDataElementToken } from '../../utils/validators';

import Parameters from './getParameters';

export default function AppDataParametersFields() {
  const { watch } = useFormContext();
  const [actionSource] = watch(['actionSource']);

  const appDataParameters = Parameters({ actionSource });
  const isDataElement = isDataElementToken(actionSource);

  return (
    <div className="app-data-parameters-section">
      <Flex alignItems="center" gap="size-75">
        <Heading level="4">App Data Parameters</Heading>

        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              Use these parameters to share app data and device information with
              the Conversions API. <code>extinfo</code> is sent as a 16-element
              ordered array; any blank field is sent as an empty string
              placeholder.
            </p>
            <p>
              For more details, see the{' '}
              <Link>
                <a
                  href="https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/app-data"
                  rel="noreferrer"
                  target="_blank"
                >
                  documentation
                </a>
              </Link>
              .
            </p>
          </Content>
        </ContextualHelp>
      </Flex>

      {isDataElement && (
        <View marginTop="size-100" marginBottom="size-200">
          <InlineAlert variant="negative" width="size-6000">
            <Heading>Required fields may be missing</Heading>
            <Content>
              The action source is a data element. If it resolves to{' '}
              <strong>app</strong> at runtime, Meta requires{' '}
              <code>advertiser_tracking_enabled</code>,{' '}
              <code>application_tracking_enabled</code>, <code>extinfo[0]</code>{' '}
              (version), and <code>extinfo[4]</code> (OS version). Missing these
              values will cause Meta to reject the event.
            </Content>
          </InlineAlert>
        </View>
      )}

      {appDataParameters.map(
        ([
          name,
          label,
          description,
          isRequired,
          contextualHelp,
          WrappedComponent = WrappedTextField,
          rest = { component: TextField }
        ]) => {
          return (
            <WrappedComponent
              key={name}
              name={name}
              width="size-4600"
              label={label}
              description={description}
              isRequired={isRequired}
              necessityIndicator={isRequired && 'label'}
              contextualHelp={contextualHelp}
              supportDataElement
              {...rest}
            />
          );
        }
      )}
    </div>
  );
}
