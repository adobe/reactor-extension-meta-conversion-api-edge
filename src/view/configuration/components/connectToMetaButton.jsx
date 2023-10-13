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
import {
  View,
  Button,
  Heading,
  Content,
  InlineAlert
} from '@adobe/react-spectrum';

export default function ConnectToMetaButton({ onPress }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  return (
    <>
      <View>
        <Button
          variant="accent"
          isPending={isLoading}
          onPress={() => {
            setError(null);
            setIsLoading(true);
            onPress()
              .catch((e) => {
                setError(e);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        >
          Connect to Meta
        </Button>
      </View>
      {error && (
        <InlineAlert variant="negative" width="size-4600" marginTop="size-200">
          <Heading>Authorization failed</Heading>
          <Content>{error.message}</Content>
        </InlineAlert>
      )}
    </>
  );
}
