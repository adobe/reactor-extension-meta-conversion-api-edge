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
  Text,
  TextField,
  ContextualHelp,
  View
} from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

import WrappedComboboxField from '../../components/wrappedComboBox';
import Parameters from './getParameters';
import actionSources from '../../utils/actionSources';

export default function ServerEventParametersFields() {
  const { watch } = useFormContext();
  const [actionSource] = watch(['actionSource']);

  const serverEvents = Parameters({ actionSource });

  return (
    <View>
      <Content>
        <Text>
          Use the data mapping below to configure a Meta event using your data
          from Adobe Edge. These events will be sent to your Pixel via Meta
          Conversions API. For more information about these parameters, go to
        </Text>{' '}
        <Link>
          <a
            href="https://developers.facebook.com/docs/marketing-api/conversions-api/parameters"
            target="_blank"
            rel="noreferrer"
          >
            Meta for Developers.
          </a>
        </Link>
      </Content>

      <Flex alignItems="center" gap="size-75">
        <Heading level="3"> Server Event Parameters</Heading>

        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            Send actions that occur as a Meta Standard or Custom Event. For more
            details, see the{' '}
            <Link>
              <a
                href="https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event"
                rel="noreferrer"
                target="_blank"
              >
                documentation
              </a>
            </Link>
            .
          </Content>
        </ContextualHelp>
      </Flex>

      <WrappedComboboxField
        minWidth="size-4600"
        width="size-4600"
        name="actionSource"
        label="Action Source"
        necessityIndicator="label"
        description="This field allows you to specify where your conversion occurred."
        isRequired
        allowsCustomValue
        defaultItems={actionSources
          .getActionSourceNames()
          .map((q) => ({ id: q, name: q }))}
      />

      {serverEvents.map(
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
