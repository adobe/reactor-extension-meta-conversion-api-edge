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
  Link,
  TextField,
  ContextualHelp,
  Heading,
  View,
  Image,
  Text,
  Button
} from '@adobe/react-spectrum';
import WrappedTextField from '../../components/wrappedTextField';
import emqImage from '../../../../resources/images/emq.png';
import { isDataElementToken } from '../../utils/validators';

const goToEmq = (pixelId) => {
  window.open(
    `https://business.facebook.com/events_manager2/${
      pixelId ? `list/dataset/${pixelId}/overview` : ''
    }`,
    '_blank'
  );
};

export default function ConfigurationFields() {
  const { watch } = useFormContext();
  const [pixelId] = watch(['pixelId']);

  return (
    <Flex gap="size-300" direction="row" wrap="wrap">
      <Flex direction="column" gap="size-65">
        <Heading>Settings</Heading>

        <WrappedTextField
          name="pixelId"
          component={TextField}
          width="size-4600"
          label="Pixel ID"
          isRequired
          necessityIndicator="label"
          supportDataElement
        />

        <WrappedTextField
          name="accessToken"
          component={TextField}
          width="size-4600"
          label="Access Token"
          isRequired
          necessityIndicator="label"
          supportDataElement
          contextualHelp={
            <ContextualHelp>
              <Heading>Need help?</Heading>
              <Content>
                <p>
                  A Meta System User access token is required to send events via
                  Conversions API.
                </p>
                <Link>
                  <a
                    href="https://developers.facebook.com/docs/marketing-api/conversions-api/get-started#via-events-manager"
                    rel="noreferrer"
                    target="_blank"
                  >
                    How to generate a System User access token via Events
                    Manager
                  </a>
                </Link>
              </Content>
            </ContextualHelp>
          }
        />
      </Flex>

      <View minWidth="size-4600" maxWidth="size-4600">
        <Heading UNSAFE_style={{ textAlign: 'center' }}>
          Conversion API Event Match <br />
          Quality (EMQ)
        </Heading>
        <div style={{ textAlign: 'justify' }}>
          The EMQ score is a metric that indicates how effective the customer
          information sent from the Conversion API may be to matching to a Meta
          account. You can view your event match quality in{' '}
          <Link>
            <a
              href="https://business.facebook.com/events_manager/"
              rel="noreferrer"
              target="_blank"
            >
              Events Manager
            </a>
          </Link>
          .
        </div>
        <View marginTop="size-200">
          <Image src={emqImage} />
          <Text UNSAFE_style={{ fontStyle: 'italic', color: '#757575' }}>
            &nbsp;&nbsp;Illustration purposes only
          </Text>
        </View>
        {pixelId && !isDataElementToken(pixelId) && (
          <View marginTop="size-200" UNSAFE_style={{ textAlign: 'center' }}>
            <Button
              variant="accent"
              onPress={() => {
                goToEmq(pixelId);
              }}
            >
              <Text>View EMQ Score</Text>
            </Button>
          </View>
        )}
      </View>
    </Flex>
  );
}
