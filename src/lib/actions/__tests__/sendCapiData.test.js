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

  test('does not include app_data when action source is not "app"', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    // App data fields are populated, but actionSource is "website" — the lib
    // must not emit an `app_data` block in this case.
    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'website',
      advertiserTrackingEnabled: 'true',
      applicationTrackingEnabled: 'false',
      extinfoVersion: 'i2',
      extinfoOsVersion: '16.0',
      campaignIds: 'abc123'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    return sendCapiData({ arc, utils }).then(() => {
      const [, request] = fetch.mock.calls[0];
      expect(request.body).not.toContain('"app_data"');
    });
  });

  test('includes app_data with boolean-to-int conversion when action source is "app"', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'app',
      advertiserTrackingEnabled: 'true',
      applicationTrackingEnabled: 'false',
      extinfoVersion: 'i2',
      extinfoOsVersion: '16.0',
      extinfoDeviceModelName: 'iPhone14,3'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    return sendCapiData({ arc, utils }).then(() => {
      const [, request] = fetch.mock.calls[0];
      const parsedBody = JSON.parse(request.body);
      const appData = parsedBody.data[0].app_data;

      // String "true"/"false" must convert to integers 1/0 — Meta requires
      // tracking consent fields as integers, not strings.
      expect(appData.advertiser_tracking_enabled).toBe(1);
      expect(appData.application_tracking_enabled).toBe(0);

      // extinfo must always be exactly 16 elements with empty strings for
      // unset slots — Meta expects a positional array of fixed length.
      expect(appData.extinfo).toEqual([
        'i2',
        '',
        '',
        '',
        '16.0',
        'iPhone14,3',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ]);

      // Unset optional top-level fields must be omitted from the payload
      // (not sent as null/undefined/empty string).
      expect(appData).not.toHaveProperty('campaign_ids');
      expect(appData).not.toHaveProperty('install_referrer');
      expect(appData).not.toHaveProperty('installer_package');
      expect(appData).not.toHaveProperty('url_schemes');
      expect(appData).not.toHaveProperty('vendor_id');
      expect(appData).not.toHaveProperty('windows_attribution_id');
    });
  });

  test('builds 16-element extinfo with required slots set (literal "app")', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    // Simulates the literal "app" path: both UI validation and the lib-level
    // guards above enforce the required extinfo fields (extinfoVersion at index
    // 0, extinfoOsVersion at index 4), but every optional extinfo* slot the
    // user left blank is filtered out of settings by getSettings.js, so the
    // lib destructures those keys as undefined.
    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'app',
      advertiserTrackingEnabled: 'true',
      applicationTrackingEnabled: 'false',
      extinfoVersion: 'i2',
      extinfoOsVersion: '16.0',
      extinfoCarrier: 'AT&T'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    return sendCapiData({ arc, utils }).then(() => {
      const [, request] = fetch.mock.calls[0];
      const parsedBody = JSON.parse(request.body);

      // Confirms the lib's positional array assembly converts `undefined`
      // destructured values (absent settings keys) to empty strings at every
      // slot — required indices filled, all other indices "".
      expect(parsedBody.data[0].app_data.extinfo).toEqual([
        'i2',
        '',
        '',
        '',
        '16.0',
        '',
        '',
        '',
        'AT&T',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ]);
    });
  });

  test('throws when action source is "app" and extinfoVersion is missing', async () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    // Simulates the data element path: the user set `actionSource` via a data
    // element that resolves to "app" at runtime, bypassing UI validation that
    // would normally enforce the required extinfo fields. The lib now fails
    // early rather than forwarding a malformed payload to Meta.
    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'app',
      advertiserTrackingEnabled: 'true',
      applicationTrackingEnabled: 'true'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    await expect(sendCapiData({ arc, utils })).rejects.toThrow(
      'extinfo: "extinfo version" (example: "i2") is required for app events'
    );
  });

  test('throws when action source is "app" and extinfoOsVersion is missing', async () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    // extinfoVersion is present but extinfoOsVersion is absent — the second
    // required extinfo field must also be enforced before sending to Meta.
    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'app',
      extinfoVersion: 'i2'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    await expect(sendCapiData({ arc, utils })).rejects.toThrow(
      'extinfo: "extinfo OS version" (example: 13.4.1) is required for app events'
    );
  });

  test('throws when a tracking value resolves to an unrecognized string', async () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    // By the time the delegate runs, Reactor has resolved all data elements
    // to their runtime values. If that resolved value is not exactly "true"
    // or "false", toTrackingInt throws with a personalized error identifying
    // which field received the unexpected value.
    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'app',
      advertiserTrackingEnabled: 'yes',
      applicationTrackingEnabled: 'true',
      extinfoVersion: 'i2',
      extinfoOsVersion: '16.0'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    await expect(sendCapiData({ arc, utils })).rejects.toThrow(
      'advertiserTrackingEnabled must resolve to "true" or "false". Found value was "yes"'
    );
  });

  test('throws when a tracking value is null', async () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    // A data element can resolve to null at runtime. toTrackingInt treats
    // null as an unrecognized value and throws rather than silently omitting
    // the field, making the misconfiguration explicit.
    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'app',
      advertiserTrackingEnabled: null,
      applicationTrackingEnabled: 'true',
      extinfoVersion: 'i2',
      extinfoOsVersion: '16.0'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    await expect(sendCapiData({ arc, utils })).rejects.toThrow(
      'advertiserTrackingEnabled must resolve to "true" or "false". Found value was "null"'
    );
  });

  test('throws when a tracking value is undefined', async () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    // When the user leaves a tracking combobox blank and actionSource
    // resolves to "app" via a data element, the key is absent from settings
    // and destructures as undefined. toTrackingInt throws rather than
    // silently fabricating or omitting a consent value.
    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'app',
      extinfoVersion: 'i2',
      extinfoOsVersion: '16.0'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    await expect(sendCapiData({ arc, utils })).rejects.toThrow(
      'advertiserTrackingEnabled must resolve to "true" or "false". Found value was "undefined"'
    );
  });

  test('throws when urlSchemes is invalid for app events', async () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    const {
      URL_SCHEMES_INVALID_MESSAGE
    } = require('../../../constants/urlSchemesInvalidMessage');

    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'app',
      advertiserTrackingEnabled: 'true',
      applicationTrackingEnabled: 'true',
      extinfoVersion: 'i2',
      extinfoOsVersion: '16.0',
      urlSchemes: '{}'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    await expect(sendCapiData({ arc, utils })).rejects.toThrow(
      URL_SCHEMES_INVALID_MESSAGE
    );
  });

  test('sends url_schemes as JSON array when urlSchemes is an array', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'app',
      advertiserTrackingEnabled: 'true',
      applicationTrackingEnabled: 'true',
      extinfoVersion: 'i2',
      extinfoOsVersion: '16.0',
      urlSchemes: ['myapp://', 'other://']
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    return sendCapiData({ arc, utils }).then(() => {
      const [, request] = fetch.mock.calls[0];
      const parsedBody = JSON.parse(request.body);
      expect(parsedBody.data[0].app_data.url_schemes).toEqual([
        'myapp://',
        'other://'
      ]);
    });
  });

  test('normalizes url_schemes from JSON string literal to array for app events', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'app',
      advertiserTrackingEnabled: 'true',
      applicationTrackingEnabled: 'true',
      extinfoVersion: 'i2',
      extinfoOsVersion: '16.0',
      urlSchemes: '["a://","b://"]'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    return sendCapiData({ arc, utils }).then(() => {
      const [, request] = fetch.mock.calls[0];
      const parsedBody = JSON.parse(request.body);
      expect(parsedBody.data[0].app_data.url_schemes).toEqual(['a://', 'b://']);
    });
  });

  test('includes optional top-level app data fields when present, omits when absent', () => {
    const fetch = jest.fn(() => Promise.resolve({}));

    const extensionSettings = {
      pixelId: 'ID123',
      accessToken: 'token'
    };

    const settings = {
      eventName: 'AddToCart',
      eventTime: '1234',
      actionSource: 'app',
      advertiserTrackingEnabled: 'true',
      applicationTrackingEnabled: 'true',
      extinfoVersion: 'i2',
      extinfoOsVersion: '16.0',
      campaignIds: 'abc',
      vendorId: 'v1'
    };

    const utils = {
      fetch: fetch,
      getSettings: () => settings,
      getExtensionSettings: () => extensionSettings
    };

    return sendCapiData({ arc, utils }).then(() => {
      const [, request] = fetch.mock.calls[0];
      const parsedBody = JSON.parse(request.body);
      const appData = parsedBody.data[0].app_data;

      expect(appData.campaign_ids).toBe('abc');
      expect(appData.vendor_id).toBe('v1');
      expect(appData).not.toHaveProperty('install_referrer');
      expect(appData).not.toHaveProperty('installer_package');
      expect(appData).not.toHaveProperty('url_schemes');
      expect(appData).not.toHaveProperty('windows_attribution_id');
    });
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
