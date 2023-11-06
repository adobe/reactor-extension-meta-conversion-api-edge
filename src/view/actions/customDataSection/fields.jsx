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
  Heading,
  View,
  Link,
  Flex,
  ContextualHelp,
  Content
} from '@adobe/react-spectrum';
import getEmptyDataJson from './getEmptyValue';

import PayloadEditor from '../../components/rawJsonEditor';
import PayloadRow from './row';

import {
  addToVariablesFromEntity,
  addToEntityFromVariables
} from '../../utils/entityVariablesConverter';

export default function DataSectionFields() {
  const { setValue, watch } = useFormContext();
  const [customDataRaw, customDataJsonPairs] = watch([
    'customDataRaw',
    'customDataJsonPairs'
  ]);

  return (
    <View>
      <Flex alignItems="center" gap="size-75">
        <Heading level="3">Custom Data</Heading>

        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              Use these parameters to send additional data we can use for ads
              delivery optimization. The format must be a valid JSON object or a
              data element. If data elements are being utilized, please validate
              that they are being replaced correctly.
            </p>
            <p>
              For Purchase events, value and currency are required. For more
              details, see the{' '}
              <Link>
                <a
                  href="https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data"
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

      <PayloadEditor
        label="Data"
        radioLabel="Select the way you want to provide the custom data"
        description="A valid JSON object or a data element."
        typeVariable="customDataType"
        rawVariable="customDataRaw"
        jsonVariable="customDataJsonPairs"
        getEmptyJsonValueFn={getEmptyDataJson}
        row={PayloadRow}
        onTypeSwitch={(v) => {
          // Auto Update Data Content
          if (v === 'json') {
            let variables = [];
            try {
              variables = addToVariablesFromEntity(
                [],
                JSON.parse(customDataRaw)
              );
            } catch (e) {
              // Don't do anything
            }

            if (variables.length === 0) {
              variables.push(getEmptyDataJson());
            }

            setValue('customDataJsonPairs', variables, {
              shouldValidate: true,
              shouldDirty: true
            });
          } else if (
            customDataJsonPairs.length > 1 ||
            customDataJsonPairs[0].key
          ) {
            let entity = JSON.stringify(
              addToEntityFromVariables({}, customDataJsonPairs),
              null,
              2
            );

            if (entity === '{}') {
              entity = '';
            }

            setValue('customDataRaw', entity, {
              shouldValidate: true,
              shouldDirty: true
            });
          }
          // END: Auto Update Data Content
        }}
      />
    </View>
  );
}
