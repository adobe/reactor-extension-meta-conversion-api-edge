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
import { Controller, useFormContext } from 'react-hook-form';
import {
  Content,
  Flex,
  Heading,
  Link,
  Checkbox,
  ContextualHelp,
  View
} from '@adobe/react-spectrum';

export default function LimitedDataUseFields() {
  const { control } = useFormContext();

  return (
    <View>
      <Flex alignItems="center" gap="size-75">
        <Heading level="3">Limited Data Use</Heading>

        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              Limited Data Use feature gives businesses more control over how
              their data is used in our systems and better support them with
              their California Consumer Privacy Act (CCPA) compliance efforts.
            </p>
            <p>
              Learn more about{' '}
              <Link>
                <a
                  href="https://developers.facebook.com/docs/marketing-apis/data-processing-options/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Limited Data Use and Data Processing Options
                </a>
              </Link>
              .
            </p>
          </Content>
        </ContextualHelp>
      </Flex>

      <Controller
        control={control}
        name="lduEnabled"
        defaultValue=""
        render={({ field: { onChange: reactHookFormOnChange, value } }) => (
          <Checkbox isSelected={value} onChange={reactHookFormOnChange}>
            Enable Limited Data Use
          </Checkbox>
        )}
      />
    </View>
  );
}
