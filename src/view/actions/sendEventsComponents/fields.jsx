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
  Checkbox,
  Content,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  TextField,
  TextArea,
  ContextualHelp
} from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';
import WrappedCheckboxComponent from '../../components/wrappedCheckboxComponent';
import WrappedComboboxField from '../../components/wrappedComboBox';
import Parameters from './getParameters';
import actionSources from '../../utils/actionSources';

export default function SendEventSectionFields() {
  const { watch } = useFormContext();
  const [isTestEvent, actionSource] = watch(['isTestEvent', 'actionSource']);

  const { customerInformation, serverEvents } = Parameters({ actionSource });

  const dpoURI =
    'https://developers.facebook.com/docs/marketing-apis/data-processing-options/';
  const customerInformationURI =
    'https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters';
  const customDataURI =
    'https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data';

  const customerInformationText = `These parameters are a set of identifiers Meta can use
    for targeted attribution. You must provide at least one of the following keys in your
    request. For more details, see the `;
  const customDataText = `Use these parameters to send additional data we can use for ads
    delivery optimization. For Purchase events, value and currency are required. If data elements
    are being utilized, please validate that they are being replaced correcly. For more
    detail, see the `;
  const testEventText = `You can verify that your server events are received correctly by
    Meta by using the Test Events tool in Events Manager to generate a test ID. Set the
    test ID here to start seeing event activity appear in the Test Events window.`;

  return (
    <Flex direction="row" gap="size-200">
      <Flex direction="column" gap="size-65">
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
              Send actions that occur as a Meta Standard or Custom Event. For
              more details, see the{' '}
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
                necessityIndicator="label"
                contextualHelp={contextualHelp}
                supportDataElement
              />
            );
          }
        )}
        <WrappedCheckboxComponent component={Checkbox} name="lduEnabled">
          <Text>Enable Limited Data Use</Text>
        </WrappedCheckboxComponent>

        <Content>
          <Text>
            Learn more about{' '}
            <Link>
              <a href={dpoURI} target="_blank" rel="noreferrer">
                Limited Data Use and Data Processing Options
              </a>
            </Link>
          </Text>
        </Content>

        <Heading level="3"> Customer Information Parameters </Heading>

        <Content>
          <Content marginBottom="1em">
            <Text>{customerInformationText}</Text>
            <Link>
              <a href={customerInformationURI} target="_blank" rel="noreferrer">
                documentation.
              </a>
            </Link>
          </Content>
          {customerInformation.map(([name, label]) => {
            return (
              <WrappedTextField
                key={name}
                name={name}
                component={TextField}
                width="size-4600"
                label={label}
                supportDataElement
              />
            );
          })}
        </Content>

        <Heading marginTop="1em"> Custom Data </Heading>
        <Divider size="S" />
        <Content>
          <Content marginBottom="1em">
            <Text>{customDataText}</Text>
            <Link marginBottom="1em">
              <a href={customDataURI} target="_blank" rel="noreferrer">
                documentation.
              </a>
            </Link>
          </Content>
          <WrappedTextField
            name="customData"
            component={TextArea}
            width="size-4600"
            label="Custom Data"
            placeholder='{"currency": "usd", "value": 123.45}'
            supportDataElement
          />
        </Content>

        <Heading marginTop="1em"> Test Event </Heading>
        <Divider size="S" />
        <Content>
          <Content marginBottom="1em">
            <Text>{testEventText}</Text>
          </Content>
          <WrappedCheckboxComponent component={Checkbox} name="isTestEvent">
            Send as Test Event
          </WrappedCheckboxComponent>
          <WrappedTextField
            name="testEventCode"
            component={TextField}
            width="size-4600"
            label="Test Event Code"
            isRequired
            isDisabled={!isTestEvent}
            necessityIndicator="label"
          />
        </Content>
      </Flex>
    </Flex>
  );
}
