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
import { Content, Link, ContextualHelp, Heading } from '@adobe/react-spectrum';

export default ({ actionSource } = {}) => {
  const parameters = {
    customerInformation: [
      ['clientIpAddress', 'Client IP Address'],
      ['clientUserAgent', 'Client User Agent'],
      ['email', 'Email'],
      ['phone', 'Phone'],
      ['gender', 'Gender'],
      ['dob', 'Date of Birth'],
      ['lastName', 'Last Name'],
      ['firstName', 'First Name'],
      ['city', 'City'],
      ['state', 'State'],
      ['zip', 'Zip'],
      ['country', 'Country'],
      ['externalId', 'External ID'],
      ['fbc', 'Click ID'],
      ['fbp', 'Browser ID'],
      ['subscriptionId', 'Subscription ID'],
      ['fbLoginId', 'Meta Login ID'],
      ['leadId', 'Lead ID']
    ],
    serverEvents: [
      [
        'eventName',
        'Event Name',
        'A standard event or custom event name. This field is used to' +
          ' deduplicate events sent to the Conversions API.',
        true,
        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              For the same customer action, the{' '}
              <strong>
                <code>event</code>
              </strong>{' '}
              property from the browser or app event matches the{' '}
              <strong>
                <code>event_name</code>
              </strong>{' '}
              property from the server event. If a match is found between events
              sent within 48 hours of each other, only the first one will be
              considered. If a server and browser or app event arrive at
              approximately the same time (within 5 minutes of each other), the
              browser or app event is favoured.
            </p>
            <Link>
              <a
                href="https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events"
                rel="noreferrer"
                target="_blank"
              >
                Learn more about Deduplicate Pixel and Server Events.
              </a>
            </Link>
          </Content>
        </ContextualHelp>
      ],
      [
        'eventTime',
        'Event Time',
        'A Unix timestamp in seconds indicating when the actual event occurred.',
        true,
        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              The specified time may be earlier than the time you send the event
              to Facebook. This is to enable batch processing and server
              performance optimization. You must send this date in GMT time
              zone.
            </p>
            <p>
              The{' '}
              <strong>
                <code>event_time</code>
              </strong>{' '}
              can be up to 7 days before you send an event to Facebook. If any{' '}
              <strong>
                <code>event_time</code>
              </strong>{' '}
              in{' '}
              <strong>
                <code>data</code>
              </strong>{' '}
              is greater than 7 days in the past, an error is returned for the
              entire request and process no events.
            </p>
          </Content>
        </ContextualHelp>
      ],
      [
        'eventSourceUrl',
        'Event Source URL',
        'The browser URL where the event happened. The URL must begin with http:// or https:// and should match the verified domain.',
        actionSource === 'Website'
      ],
      [
        'eventId',
        'Event ID',
        'An order number or transaction ID are two potential' +
          ' identifiers that can be used for "event_id."',
        false,
        <ContextualHelp>
          <Heading>Need help?</Heading>
          <Content>
            <p>
              This ID can be any unique string chosen by the advertiser. The{' '}
              <strong>
                <code>event_id</code>
              </strong>{' '}
              and{' '}
              <strong>
                <code>event_name</code>
              </strong>{' '}
              parameters are used to deduplicate events sent by web (via the
              Meta Pixel), app (via SDK or App Events API) or server events sent
              to the Conversions API. Note that while{' '}
              <strong>
                <code>event_id</code>
              </strong>{' '}
              is marked optional, it is recommended for event deduplication.
            </p>

            <p>
              For deduplication, the{' '}
              <strong>
                <code>eventID</code>
              </strong>{' '}
              from a browser or app event must match the{' '}
              <strong>
                <code>event_id</code>
              </strong>{' '}
              in the corresponding server event.
            </p>

            <p>
              An order number or transaction ID are two potential identifiers
              that can be used for{' '}
              <strong>
                <code>event_id</code>
              </strong>
              . For example, if a customer makes two purchases on your website
              with order numbers 123 and 456, each Conversions API call would
              need to include its respective order number for{' '}
              <strong>
                <code>event_id</code>
              </strong>
              . This allows us to properly distinguish these two purchase events
              as distinct orders. The two corresponding browser Pixel purchase
              events would need to also send the same order numbers in the{' '}
              <strong>
                <code>eventID</code>
              </strong>{' '}
              parameter for us to understand that there were only two events
              that took place, not four unique purchases.
            </p>

            <p>
              For other events without an intrinsic ID number, a random number
              (so long as the same random number is sent between browser and
              server events) can be used.
            </p>
          </Content>
        </ContextualHelp>
      ],
      [
        'optOut',
        'Opt Out',
        'A flag that indicates to not use this event for ads delivery optimization.'
      ]
    ],
    customData: [
      ['value', 'Value'],
      ['currency', 'Currency (Required for purchase events)'],
      ['contentName', 'Content Name'],
      ['contentCategory', 'Content Category'],
      ['contentIds', 'Content IDs'],
      ['contents', 'Contents'],
      ['contentType', 'Content Type'],
      ['orderId', 'Order ID'],
      ['predictedLtv', 'Predicted Lifetime'],
      ['numItems', 'Number of Items (Use only for InitiateCheckout events)'],
      ['searchString', 'Search String (Use only for search events)'],
      ['status', 'Status (Use only with CompleteRegistration events)'],
      ['deliveryCategory', 'Delivery Category']
    ]
  };

  return parameters;
};
