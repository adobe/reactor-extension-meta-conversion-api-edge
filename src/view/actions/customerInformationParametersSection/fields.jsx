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

/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Content,
  Flex,
  Heading,
  Link,
  TextField,
  ContextualHelp,
  View
} from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

import Parameters from './getParameters';

export default function ServerEventParametersFields() {
  const { watch } = useFormContext();
  const [actionSource] = watch(['actionSource']);

  const customerInformation = Parameters({ actionSource });

  return (
    <View>
      <Flex alignItems="center" gap="size-75">
        <Heading level="3">Customer Information Parameters</Heading>

        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              Sending customer information parameters may help increase Event
              Match Quality. Only matched events can be used for ads attribution
              and ad delivery optimization, and the higher the matching quality,
              the better.
            </p>
            <p>
              Examples of high-quality customer information parameters include:
              email address (
              <strong>
                <code>em</code>
              </strong>
              ), IP address (
              <strong>
                <code>client_ip_address</code>
              </strong>
              ), name (
              <strong>
                <code>fn</code>
              </strong>{' '}
              and{' '}
              <strong>
                <code>ln</code>
              </strong>
              ) or phone number (
              <strong>
                <code>ph</code>
              </strong>
              ).
            </p>
            <p>
              For more details, see the{' '}
              <Link>
                <a
                  href="https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters"
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

      {customerInformation.map(
        ([name, label, description, isRequired, contextualHelp]) => {
          return (
            <WrappedTextField
              key={name}
              name={name}
              component={TextField}
              width="size-4600"
              label={label}
              description={description}
              isRequired={isRequired}
              necessityIndicator={isRequired && 'label'}
              contextualHelp={contextualHelp}
              supportDataElement
            />
          );
        }
      )}
    </View>
  );
}
