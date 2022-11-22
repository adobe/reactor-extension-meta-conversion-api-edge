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
import { Controller, useFormContext } from 'react-hook-form';
import {
  Content,
  Flex,
  Heading,
  Checkbox,
  ContextualHelp,
  View
} from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';

export default function LimitedDataUseFields() {
  const { control, watch } = useFormContext();
  const [isTestEvent] = watch(['isTestEvent']);

  return (
    <View>
      <Flex alignItems="center" gap="size-75">
        <Heading level="3">Test Event</Heading>

        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              You can verify that your server events are received correctly by
              Meta by using the Test Events tool in Events Manager to generate a
              test ID. Set the test ID here to start seeing event activity
              appear in the Test Events window.
            </p>
          </Content>
        </ContextualHelp>
      </Flex>

      <Controller
        control={control}
        name="isTestEvent"
        defaultValue=""
        render={({ field: { onChange: reactHookFormOnChange, value } }) => (
          <Checkbox isSelected={value} onChange={reactHookFormOnChange}>
            Send as Test Event
          </Checkbox>
        )}
      />

      {isTestEvent && (
        <WrappedTextField
          name="testEventCode"
          width="size-4600"
          label="Test Event Code"
          isRequired
          necessityIndicator="label"
        />
      )}
    </View>
  );
}
