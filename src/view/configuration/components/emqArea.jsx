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
import {
  Link,
  Heading,
  View,
  Image,
  Text,
  Button,
  ProgressCircle,
  Flex,
  InlineAlert,
  Content,
  Meter
} from '@adobe/react-spectrum';

import emqImage from '../../../../resources/images/emq.png';
import { isDataElementToken } from '../../utils/validators';
import ConnectToMetaButton from './connectToMetaButton';
import getMbeData from '../api/getMbeData';
import getEmqData from '../api/getEmqData';

const calculateVariant = (scoreRating) => {
  if (scoreRating === 'great') {
    return 'positive';
  }

  if (scoreRating === 'none' || scoreRating === 'ok') {
    return '';
  }

  return 'warning';
};

const goToEmq = (pixelId) => {
  window.open(
    `https://business.facebook.com/events_manager2/${
      pixelId ? `list/dataset/${pixelId}/overview` : ''
    }`,
    '_blank'
  );
};

export default function ConfigurationFields({ pixelId }) {
  const [emqAccessToken, setEmqAccessToken] = React.useState(
    window.localStorage.getItem('emqAccessToken')
  );

  const [showConnectToMetaButton, setShowConnectToMetaButton] =
    React.useState(false);

  const [isEmqDataLoading, setIsEmqDataLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [emqData, setEmqData] = React.useState(null);

  React.useEffect(() => {
    if (!isDataElementToken(pixelId) && !emqAccessToken) {
      setShowConnectToMetaButton(true);
    } else {
      setShowConnectToMetaButton(false);
    }

    if (!isDataElementToken(pixelId) && emqAccessToken) {
      setIsEmqDataLoading(true);
      getEmqData(pixelId, emqAccessToken)
        .then(({ data = [] }) => {
          setError(null);
          setEmqData(
            data.map(
              ({
                event_name: eventName,
                event_match_quality: {
                  composite_score: score,
                  score_rating: scoreRating
                }
              }) => ({
                eventName,
                score,
                scoreRating
              })
            )
          );
        })
        .catch((e) => {
          setEmqData(null);
          setError(e);
        })
        .finally(() => {
          setIsEmqDataLoading(false);
        });
    }
  }, [pixelId, emqAccessToken]);

  return (
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

      {pixelId && isDataElementToken(pixelId) && (
        <View marginTop="size-200">
          <Image src={emqImage} alt="EMQ" />
          <Text UNSAFE_style={{ fontStyle: 'italic', color: '#757575' }}>
            &nbsp;&nbsp;Illustration purposes only
          </Text>
        </View>
      )}

      {isEmqDataLoading && (
        <Flex marginTop="size-200" alignItems="center" direction="column">
          <ProgressCircle aria-label="Loading…" isIndeterminate />
        </Flex>
      )}

      {!isEmqDataLoading && emqData && emqData.length === 0 && (
        <>
          <View>
            <Heading level="4">Send recent events to see EMQ score</Heading>
            <div style={{ textAlign: 'justify' }}>
              Your Event Match Quality score is based on events sent through the
              Conversions API in the last 24 to 48 hours. Either no events were
              sent during this time or they were discarded as a result of data
              policies or regulations. To see your Event Match Quality score,
              send recent events frequently.
            </div>
          </View>

          <View marginTop="size-300" UNSAFE_style={{ textAlign: 'center' }}>
            <Button
              variant="accent"
              onPress={() => {
                goToEmq(pixelId);
              }}
            >
              <Text>More Info</Text>
            </Button>
          </View>
        </>
      )}

      {!isEmqDataLoading && emqData && emqData.length > 0 && (
        <>
          <Flex
            direction="column"
            marginTop="size-300"
            gap="size-300"
            alignItems="center"
          >
            {emqData.map((e) => {
              return (
                <Meter
                  key={e.eventName}
                  label={e.eventName}
                  valueLabel={e.score}
                  value={e.score * 10}
                  variant={calculateVariant(e.scoreRating)}
                />
              );
            })}
          </Flex>

          <View marginTop="size-300" UNSAFE_style={{ textAlign: 'center' }}>
            <Button
              variant="accent"
              onPress={() => {
                goToEmq(pixelId);
              }}
            >
              <Text>More Info</Text>
            </Button>
          </View>
        </>
      )}

      {error && (
        <InlineAlert variant="negative" width="size-4600" marginTop="size-200">
          <Heading>We encountered an error while loading the EMQ data.</Heading>
          <Content>{error.message}</Content>
        </InlineAlert>
      )}

      {showConnectToMetaButton && (
        <View marginTop="size-200" UNSAFE_style={{ textAlign: 'center' }}>
          <ConnectToMetaButton
            onPress={() =>
              getMbeData().then(({ suatAccessToken }) => {
                window.localStorage.setItem('emqAccessToken', suatAccessToken);
                setEmqAccessToken(suatAccessToken);
              })
            }
          />
        </View>
      )}
    </View>
  );
}
