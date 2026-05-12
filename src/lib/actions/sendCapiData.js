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

/* eslint-disable camelcase */

const shaHashingHelper = require('./helpers/shaHashingHelper');
const {
  emailNormalizer,
  phoneNumberNormalizer,
  nameNormalizer,
  cityNormalizer,
  stateNormalizer,
  zipNormalizer,
  countryNormalizer
} = require('./helpers/normalizers');
const version = require('./helpers/apiVersion');
const { isString, isObject } = require('./helpers/validators');
const parseCustomData = require('./helpers/parseCustomData');
const lduValue = 'LDU';
const agentValue = 'adobe_launch';

// Meta's Conversions API requires advertiser_tracking_enabled and
// application_tracking_enabled as integers (1 = enabled, 0 = disabled).
// When the user selects from the combobox, the value is stored as the
// string "true" or "false". We convert those known strings to their
// integer equivalents here. Any other value — including null, undefined,
// or an unrecognized resolved string — throws with a personalized error
// identifying the field, so misconfigured events fail early and visibly.
const toTrackingInt = (key, value) => {
  let resolvedBoolean = undefined;
  if (value === 'true') {
    resolvedBoolean = 1;
  }
  if (value === 'false') {
    resolvedBoolean = 0;
  }

  if (resolvedBoolean === undefined) {
    throw new Error(
      `${key} must be resolve to "true" or "false". Found value was "${value}"`
    );
  }
  return resolvedBoolean;
};

const buildEventBody = async (settings) => {
  const {
    actionSource,
    clientIpAddress,
    clientUserAgent,
    country,
    city,
    customData,
    dob,
    email,
    eventId,
    eventName,
    eventSourceUrl,
    eventTime,
    externalId,
    fbc,
    fbLoginId,
    fbp,
    firstName,
    gender,
    isTestEvent,
    lduEnabled,
    leadId,
    lastName,
    optOut,
    phone,
    state,
    subscriptionId,
    testEventCode,
    zip,
    partnerId,
    partnerName,
    advertiserTrackingEnabled,
    applicationTrackingEnabled,
    campaignIds,
    installReferrer,
    installerPackage,
    urlSchemes,
    vendorId,
    windowsAttributionId,
    extinfoVersion,
    extinfoAppPackageName,
    extinfoShortVersion,
    extinfoLongVersion,
    extinfoOsVersion,
    extinfoDeviceModelName,
    extinfoLocale,
    extinfoTimezoneAbbreviation,
    extinfoCarrier,
    extinfoScreenWidth,
    extinfoScreenHeight,
    extinfoScreenDensity,
    extinfoCpuCores,
    extinfoExternalStorageSizeGb,
    extinfoFreeSpaceExternalStorageGb,
    extinfoDeviceTimezone
  } = settings;

  const body = {
    test_event_code: isTestEvent ? testEventCode : undefined,
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        event_id: eventId ? eventId : undefined,
        event_source_url: eventSourceUrl ? eventSourceUrl : undefined,
        action_source: actionSource,
        opt_out: optOut ? optOut : undefined,
        data_processing_options: lduEnabled ? [lduValue] : [],
        data_processing_options_country: lduEnabled ? 0 : undefined,
        data_processing_options_state: lduEnabled ? 0 : undefined,
        user_data: {
          client_ip_address: clientIpAddress,
          client_user_agent: clientUserAgent,
          country: country ? await countryNormalizer(country) : undefined,
          ct: city ? await cityNormalizer(city) : undefined,
          db: dob
            ? await shaHashingHelper('Date of birth (db)', dob)
            : undefined,
          em: email ? await emailNormalizer(email) : undefined,
          external_id: externalId
            ? await shaHashingHelper('External ID (external_id)', externalId)
            : undefined,
          fb_login_id: fbLoginId ? fbLoginId : undefined,
          fbc: fbc ? fbc : undefined,
          fbp: fbp ? fbp : undefined,
          fn: firstName
            ? await nameNormalizer('First Name (fn)', firstName)
            : undefined,
          ge: gender
            ? await shaHashingHelper('Gender (ge)', gender)
            : undefined,
          lead_id: leadId ? leadId : undefined,
          ln: lastName
            ? await nameNormalizer('Last Name (ln)', lastName)
            : undefined,
          ph: phone ? await phoneNumberNormalizer(phone) : undefined,
          st: state ? await stateNormalizer(state) : undefined,
          subscription_id: subscriptionId ? subscriptionId : undefined,
          zp: zip ? await zipNormalizer(zip) : undefined,
          partner_name: partnerName ? partnerName : undefined,
          partner_id: partnerId ? partnerId : undefined
        }
      }
    ],
    partner_agent: agentValue
  };

  if (customData) {
    let c = customData;

    // Previous versions of the extension were saving custom data as a string.
    if (isString(customData)) {
      c = parseCustomData(c);
    }

    if (isObject(c)) {
      body.data[0].custom_data = c;
    }
  }

  if ('app' === actionSource?.toLowerCase()?.trim()) {
    if (!extinfoVersion?.length) {
      throw new Error(
        'extinfo: "extinfo version" (example: "i2") is required for app events'
      );
    }
    if (!extinfoOsVersion?.length) {
      throw new Error(
        'extinfo: "extinfo OS version" (example: 13.4.1) is required for app events'
      );
    }
    body.data[0].app_data = {
      advertiser_tracking_enabled: toTrackingInt(
        'advertiserTrackingEnabled',
        advertiserTrackingEnabled
      ),
      application_tracking_enabled: toTrackingInt(
        'applicationTrackingEnabled',
        applicationTrackingEnabled
      ),
      // empty strings are set for missing extinfo pieces to
      // ensure the array remains 16 elements long.
      extinfo: [
        extinfoVersion, // required. guarded by the throw above.
        extinfoAppPackageName,
        extinfoShortVersion,
        extinfoLongVersion,
        extinfoOsVersion, // required. guarded by the throw above.
        extinfoDeviceModelName,
        extinfoLocale,
        extinfoTimezoneAbbreviation,
        extinfoCarrier,
        extinfoScreenWidth,
        extinfoScreenHeight,
        extinfoScreenDensity,
        extinfoCpuCores,
        extinfoExternalStorageSizeGb,
        extinfoFreeSpaceExternalStorageGb,
        extinfoDeviceTimezone
      ].map((v) => (v != null ? String(v) : '')),
      campaign_ids: campaignIds ?? undefined,
      install_referrer: installReferrer ?? undefined,
      installer_package: installerPackage ?? undefined,
      url_schemes: urlSchemes ?? undefined,
      vendor_id: vendorId ?? undefined,
      windows_attribution_id: windowsAttributionId ?? undefined
    };
  }

  return {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  };
};

module.exports = async ({ utils }) => {
  const { getExtensionSettings, getSettings, fetch } = utils;
  let { pixelId, accessToken } = getExtensionSettings();

  const settings = getSettings();
  if (settings.pixelId) {
    pixelId = settings.pixelId;
    delete settings.pixelId;
  }

  if (settings.accessToken) {
    accessToken = settings.accessToken;
    delete settings.accessToken;
  }

  const url = `https://graph.facebook.com/${version}/${pixelId}/events/?access_token=${accessToken}`;

  return fetch(url, await buildEventBody(settings));
};
