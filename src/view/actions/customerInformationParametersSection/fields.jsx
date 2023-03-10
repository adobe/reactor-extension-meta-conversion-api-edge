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
  View,
  Text,
  Badge
} from '@adobe/react-spectrum';
import Alert from '@spectrum-icons/workflow/Alert';
import WrappedTextField from '../../components/wrappedTextField';

import Parameters from './getParameters';

export default function CustomerInformationParametersFields() {
  const { watch } = useFormContext();
  const [actionSource, lduEnabled] = watch(['actionSource', 'lduEnabled']);

  const customerInformation = Parameters({ actionSource, lduEnabled });

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
      <Badge variant="info">
        <Alert aria-label="Information about field hashing" />
        <Text>
          Before sending the data to the Meta Conversion API endpoint, the
          extension will hash and normalize the values of the following fields:
          <br />
          Email, Phone Number, First Name, Last Name, Gender, Date of Birth,
          City, State, Zip Code, Country, and External ID. <br />
          The extension will not hash the value of these fields if a SHA256
          string is already present.
        </Text>
      </Badge>
    </View>
  );
}
