/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const sendCapiData = require('../sendCapiData');
const apiVersion = require('../helpers/apiVersion');
const arc = {};

describe('Send Conversion API data library module', () => {
  test('makes a fetch call to the provided url', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      eventSourceUrl: 'https://localhost',
      optOut: true,
      eventId: 'EV123',
      actionSource: 'website',
      lduEnabled: true,
      email: 'some@emai.com',
      phone: '1-123-456-7899',
      customData: {
        a: 'b'
      },
      isTestEvent: true,
      testEventCode: 'TEST64687'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    return sendCapiData({ arc, utils }).then(() => {
      expect(fetch).toHaveBeenCalledWith(
        `https://graph.facebook.com/${apiVersion}/ID123/events/?access_token=token`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body:
            '{' +
            '"test_event_code":"TEST64687",' +
            '"data":[{' +
            '"event_name":"AddToCart",' +
            '"event_time":"1234",' +
            '"event_id":"EV123",' +
            '"event_source_url":"https://localhost",' +
            '"action_source":"website",' +
            '"opt_out":true,' +
            '"data_processing_options":["LDU"],' +
            '"data_processing_options_country":0,' +
            '"data_processing_options_state":0,' +
            '"user_data":{' +
            '"em":"9807c5d0506892d6e2473d24720f8ec4a23f0fd219ebe9bcb29280d95953c994",' +
            '"ph":"720ee8981cbdb529cc5f16fd3f05f7ef9f074083755e9e2bb1e060e450b6bb39"' +
            '},' +
            '"custom_data":{' +
            '"a":"b"' +
            '}' +
            '}],' +
            '"partner_agent":"adobe_launch"' +
            '}'
        }
      );
    });
  });

  test('throws an error when a hashable value is not string or a number', async () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      eventSourceUrl: 'https://localhost',
      optOut: true,
      eventId: 'EV123',
      actionSource: 'website',
      lduEnabled: true,
      email: { a: 'some@emai.com' },
      phone: '1-123-456-7899'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };
    try {
      await sendCapiData({ arc, utils });
    } catch (e) {
      expect(e.message).toBe(
        'The value of the "Email (em)" field is not a string or a number. ' +
          'Cannot generate a SHA-256 string.'
      );
    }
  });

  test('makes a fetch call with the configuration overridden', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      eventSourceUrl: 'https://localhost',
      eventId: 'EV123',
      pixelId: 'ID321',
      accessToken: 'nekot'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    return sendCapiData({ arc, utils }).then(() => {
      expect(fetch).toHaveBeenCalledWith(
        `https://graph.facebook.com/${apiVersion}/ID321/events/?access_token=nekot`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body:
            '{' +
            '"data":[{' +
            '"event_name":"AddToCart",' +
            '"event_time":"1234",' +
            '"event_id":"EV123",' +
            '"event_source_url":"https://localhost",' +
            '"data_processing_options":[],' +
            '"user_data":{}' +
            '}],' +
            '"partner_agent":"adobe_launch"' +
            '}'
        }
      );
    });
  });
});
