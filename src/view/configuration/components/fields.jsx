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
  Badge,
  Text
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
  const [pixelId, accessToken] = watch(['pixelId', 'accessToken']);
  const [deferredPixelId, setDeferredPixelId] = React.useState(pixelId);

  const [showEmqArea, setShowEmqArea] = React.useState(false);
  const [showConnectToMetaButton, setShowConnectToMetaButton] =
    React.useState(false);

  const debouncedOnPixelChange = React.useCallback(
    debounce((v) => setDeferredPixelId(v), 300),
    []
  );

  React.useEffect(() => {
    setShowConnectToMetaButton(!pixelId && !accessToken);
    setShowEmqArea(Boolean(pixelId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
