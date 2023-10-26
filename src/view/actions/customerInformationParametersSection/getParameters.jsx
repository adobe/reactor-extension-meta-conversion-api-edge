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
  Content,
  Link,
  ContextualHelp,
  Heading,
  Text
} from '@adobe/react-spectrum';
import CONSTANTS from '../../utils/constants';

export default ({ actionSource, lduEnabled } = {}) => [
  [
    'clientIpAddress',
    'Client IP Address',
    'The IP address of the browser corresponding to the event must' +
      ' be a valid IPV4 or IPV6 address.',
    lduEnabled,
    <ContextualHelp>
      <Heading>Need help?</Heading>
      <Content>
        <p>IPV6 is preferable over IPV4 for IPV6-enabled users.</p>
        <p>
          The{' '}
          <strong>
            <code>client_ip_address</code>
          </strong>{' '}
          user data parameter must never be hashed. No spaces should be
          included. Always provide the real IP address to ensure accurate event
          reporting.
        </p>
        <p>
          The client IP address is required when &quot;Limited Data Use&quot;
          option is enabled.
        </p>
      </Content>
    </ContextualHelp>
  ],
  [
    'clientUserAgent',
    'Client User Agent',
    'The user agent for the browser corresponding to the event.',
    actionSource.toLowerCase() === CONSTANTS.WEBSITE,
    <ContextualHelp>
      <Heading>Need help?</Heading>
      <Content>
        <p>
          Sending both the{' '}
          <strong>
            <code>client_ip_address</code>
          </strong>{' '}
          and{' '}
          <strong>
            <code>client_user_agent</code>
          </strong>{' '}
          parameters for all of the events you&rsquo;re sending through the
          Conversions API may help improve event matching and could also help
          improve ad delivery for any ad campaigns optimizing on the events you
          send through the Conversions API.
        </p>
      </Content>
    </ContextualHelp>
  ],
  ['email', 'Email'],
  [
    'phone',
    'Phone',
    'Phone numbers must include a country code to be used for matching (e.g., ' +
      'the number 1 must precede a phone number in the United States).',
    false,
    <ContextualHelp>
      <Heading>Tip</Heading>
      <Content>
        <p>
          Always include the country code as part of your customers&rsquo; phone
          numbers, even if all of your data is from the same country.
        </p>
      </Content>
    </ContextualHelp>
  ],
  [
    'gender',
    'Gender',
    'Gender must be the form of an initial in lowercase: "f" for female and "m" for male.'
  ],
  ['dob', 'Date of Birth', 'The date must be in the YYYYMMDD format.'],
  ['lastName', 'Last Name'],
  ['firstName', 'First Name'],
  ['city', 'City'],
  [
    'state',
    'State',
    null,
    false,
    <ContextualHelp>
      <Heading>Tip</Heading>
      <Content>
        <p>
          For US, use the{' '}
          <Link>
            <a
              href="https://en.wikipedia.org/wiki/Federal_Information_Processing_Standard_state_code?fbclid=IwAR35inWzIWMT4cm9wGGKOxGWjyTyDA7pn1sYViqFr7ApbjfurLB5R-2_l0s"
              rel="noreferrer"
              target="_blank"
            >
              2-character ANSI abbreviation code
            </a>
          </Link>
          .
        </p>
      </Content>
    </ContextualHelp>
  ],
  [
    'zip',
    'Zip',
    null,
    false,
    <ContextualHelp>
      <Heading>Tip</Heading>
      <Content>
        <p>Use only the first 5 digits for U.S. zip codes. </p>
        <p>Use the area, district, and sector format for the UK. .</p>
      </Content>
    </ContextualHelp>
  ],
  [
    'country',
    'Country',
    <Text>
      Use the lowercase, 2-letter country codes in{' '}
      <Link>
        <a
          href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"
          rel="noreferrer"
          target="_blank"
        >
          ISO 3166-1 alpha-2
        </a>
      </Link>
      .
    </Text>,
    false,
    <ContextualHelp>
      <Heading>Tip</Heading>
      <Content>
        <p>
          Always include your customers&rsquo; countries’ even if all of your
          country codes are from the same country.
        </p>
      </Content>
    </ContextualHelp>
  ],
  [
    'externalId',
    'External ID',
    'Any unique ID from the advertiser, such as loyalty membership IDs,' +
      ' user IDs, and external cookie IDs.',
    false,
    <ContextualHelp>
      <Heading>Need help?</Heading>
      <Content>
        <p>You can send one or more external IDs for a given event.</p>
        <p>
          If an External ID is being sent via other channels, it should be in
          the same format as when sent via the{' '}
          <Link>
            <a
              href="https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/external-id"
              rel="noreferrer"
              target="_blank"
            >
              Conversions API
            </a>
          </Link>
          .
        </p>
      </Content>
    </ContextualHelp>
  ],
  [
    'fbc',
    'Click ID',
    'The Facebook click ID value is stored in the _fbc browser cookie under your domain.',
    false,
    <ContextualHelp>
      <Heading>Need help?</Heading>
      <Content>
        <p>
          See{' '}
          <Link>
            <a
              href="https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc"
              rel="noreferrer"
              target="_blank"
            >
              Managing fbc and fbp Parameters
            </a>
          </Link>{' '}
          for how to get this value.
        </p>
        <p>
          The format is{' '}
          <strong>
            <code>
              fb.$&#123;subdomain_index&#125;.
              <br />
              $&#123;creation_time&#125;.$&#123;fbclid&#125;
            </code>
          </strong>
          .
        </p>
      </Content>
    </ContextualHelp>
  ],
  [
    'fbp',
    'Browser ID',
    'The Facebook browser ID value is stored in the _fbp browser cookie under your domain.',
    false,
    <ContextualHelp>
      <Heading>Need help?</Heading>
      <Content>
        <p>
          See{' '}
          <Link>
            <a
              href="https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc"
              rel="noreferrer"
              target="_blank"
            >
              Managing fbc and fbp Parameters
            </a>
          </Link>{' '}
          for how to get this value.
        </p>
        <p>
          The format is{' '}
          <strong>
            <code>
              fb.$&#123;subdomain_index&#125;.
              <br />
              $&#123;creation_time&#125;.$&#123;random_number&#125;
            </code>
          </strong>
          .
        </p>
      </Content>
    </ContextualHelp>
  ],
  [
    'subscriptionId',
    'Subscription ID',
    'The subscription ID for the user in this transaction; ' +
      'it is similar to the order ID for an individual product.'
  ],
  [
    'fbLoginId',
    'Meta Login ID',
    'The ID issued by Facebook when a person first logs into an ' +
      'instance of an app. This is also known as App-Scoped ID.'
  ],
  [
    'leadId',
    'Lead ID',
    <Text>
      The ID associated with a lead generated by{' '}
      <Link>
        <a
          href="https://developers.facebook.com/docs/marketing-api/guides/lead-ads"
          rel="noreferrer"
          target="_blank"
        >
          Facebook&rsquo;s Lead Ads
        </a>
      </Link>
      .
    </Text>
  ],
  [
    'partnerName',
    'Partner Name (alpha)',
    null,
    false,
    <ContextualHelp>
      <Heading>Tip</Heading>
      <Content>
        <p>
          RampID inclusion may enhance the integration quality by increasing the
          user match rate, because of LiveRamp&rsquo;s strong identity graph.
        </p>
        <p>
          To leverage this feature you must be a LiveRamp customer and have
          their Authenticated Traffic Solution (ATS) deployed on your site.
        </p>
        <p>
          Please work with your Meta account team for join the Alpha program for
          this feature.
        </p>
      </Content>
    </ContextualHelp>
  ],
  [
    'partnerId',
    'Partner ID (alpha)',
    null,
    false,
    <ContextualHelp>
      <Heading>Tip</Heading>
      <Content>
        <p>
          RampID inclusion may enhance the integration quality by increasing the
          user match rate, because of LiveRamp&rsquo;s strong identity graph.
        </p>
        <p>
          To leverage this feature you must be a LiveRamp customer and have
          their Authenticated Traffic Solution (ATS) deployed on your site.
        </p>
        <p>
          Please work with your Meta account team for join the Alpha program for
          this feature.
        </p>
      </Content>
    </ContextualHelp>
  ]
];
