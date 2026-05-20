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
import { useFormContext } from 'react-hook-form';
import {
  Content,
  Flex,
  Link,
  TextField,
  ContextualHelp,
  Heading,
  Badge,
  Text,
  View
} from '@adobe/react-spectrum';

import Info from '@spectrum-icons/workflow/Info';
import WrappedTextField from '../../components/wrappedTextField';
import fetchDataAndSetupAccount from '../helpers/fetchDataAndSetupAccount';
import EmqArea from './emqArea';
import ConnectToMetaButton from './connectToMetaButton';

const debounce = (callback, wait = 1000) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export default function ConfigurationFields({ mode }) {
  const { watch, setValue } = useFormContext();
  const [pixelId] = watch(['pixelId', 'accessToken']);
  const [deferredPixelId, setDeferredPixelId] = React.useState(pixelId);

  const [showEmqArea, setShowEmqArea] = React.useState(false);
  const [showConnectToMetaButton, setShowConnectToMetaButton] =
    React.useState(false);

  const debouncedOnPixelChange = React.useCallback(
    debounce((v) => setDeferredPixelId(v), 300),
    []
  );

  return (
    <Flex gap="size-300" direction="row" wrap="wrap">
      <Flex direction="column" gap="size-65">
        {mode === 'override' && (
          <>
            <Heading level="3">Configuration Overrides</Heading>

            <Badge variant="info">
              <Info aria-label="Information about configuration overrides section" />
              <Text>
                Use this section to override any settings defined inside the
                extension configuration.
              </Text>
            </Badge>
          </>
        )}

        <Heading level={mode === 'override' ? 4 : 3}>Settings</Heading>

        <WrappedTextField
          name="pixelId"
          component={TextField}
          width="size-4600"
          label="Pixel ID"
          isRequired={mode !== 'override'}
          necessityIndicator={mode === 'override' ? '' : 'label'}
          supportDataElement
          onChange={debouncedOnPixelChange}
          contextualHelp={
            <ContextualHelp>
              <Heading>Finding your Pixel ID</Heading>
              <Content>
                <Text
                  UNSAFE_style={{
                    display: 'block',
                    marginBottom: '8px'
                  }}
                >
                  If you already have a Meta Pixel set up for your website, use
                  that same Pixel ID here.
                </Text>
                <Text
                  UNSAFE_style={{
                    fontWeight: 'bold',
                    display: 'block',
                    marginBottom: '4px'
                  }}
                >
                  To find your Pixel ID:
                </Text>
                <ol
                  style={{
                    margin: '0 0 12px 0',
                    paddingLeft: '18px',
                    lineHeight: '1.6'
                  }}
                >
                  <li>
                    Open{' '}
                    <Link>
                      <a
                        href="https://business.facebook.com/events_manager"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Events Manager
                      </a>
                    </Link>
                  </li>
                  <li>Select your pixel</li>
                  <li>
                    Click the <strong>Dataset ID</strong> on the right side of
                    the page to copy it, then paste it here
                  </li>
                </ol>
                <Text
                  UNSAFE_style={{
                    display: 'block',
                    fontStyle: 'italic'
                  }}
                >
                  Don&apos;t have a pixel yet?{' '}
                  <Link>
                    <a
                      href="https://developers.facebook.com/docs/meta-pixel/get-started"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Follow the setup guide
                    </a>
                  </Link>
                  .
                </Text>
              </Content>
            </ContextualHelp>
          }
        />

        <WrappedTextField
          name="accessToken"
          component={TextField}
          width="size-4600"
          label="Access Token"
          isRequired={mode !== 'override'}
          necessityIndicator={mode === 'override' ? '' : 'label'}
          supportDataElement
          contextualHelp={
            <ContextualHelp>
              <Heading>Getting an Access Token</Heading>
              <Content>
                <Text
                  UNSAFE_style={{
                    fontWeight: 'bold',
                    display: 'block',
                    marginBottom: '4px'
                  }}
                >
                  Recommended: via Events Manager
                </Text>
                <ol
                  style={{
                    margin: '0 0 12px 0',
                    paddingLeft: '18px',
                    lineHeight: '1.6'
                  }}
                >
                  <li>
                    Open{' '}
                    <Link>
                      <a
                        href="https://business.facebook.com/events_manager"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Events Manager
                      </a>
                    </Link>
                    {' '}and select your Pixel
                  </li>
                  <li>
                    Go to the <strong>Settings</strong> tab
                  </li>
                  <li>
                    Under <strong>Conversions API</strong>, click{' '}
                    <strong>Generate access token</strong> (visible to users
                    with developer privileges only)
                  </li>
                  <li>Follow the on-screen instructions</li>
                  <li>Copy the generated token and paste it here</li>
                </ol>
                <Text
                  UNSAFE_style={{
                    display: 'block',
                    fontStyle: 'italic'
                  }}
                >
                  An alternative method via Business Manager is also available
                  —{' '}
                  <Link>
                    <a
                      href="https://developers.facebook.com/documentation/ads-commerce/conversions-api/get-started"
                      target="_blank"
                      rel="noreferrer"
                    >
                      see the guide
                    </a>
                  </Link>
                  .
                </Text>
              </Content>
            </ContextualHelp>
          }
        />

        {mode !== 'override' && showConnectToMetaButton && (
          <ConnectToMetaButton
            onPress={() =>
              fetchDataAndSetupAccount({
                setValue,
                setShowConnectToMetaButton,
                setShowEmqArea
              })
            }
          />
        )}
      </Flex>

      {mode !== 'override' && showEmqArea && (
        <EmqArea pixelId={deferredPixelId} />
      )}
    </Flex>
  );
}
