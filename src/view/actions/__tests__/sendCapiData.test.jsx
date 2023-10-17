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

import { screen } from '@testing-library/react';
import renderView from '../../__tests_helpers__/renderView';

import SendCapiData from '../sendCapiData';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

import {
  changeInputValue,
  click,
  changeComboboxValue
} from '../../__tests_helpers__/jsDomHelpers';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getFormFields = async () => ({
  actionSourceInput: await screen.findByLabelText(/action source/i, {
    selector: '[name="actionSource"]'
  }),
  eventNameInput: await screen.findByLabelText(/event name/i, {
    selector: '[name="eventName"]'
  }),
  eventTimeInput: await screen.findByLabelText(/event time/i, {
    selector: '[name="eventTime"]'
  }),
  eventSourceUrlInput: await screen.findByLabelText(/event source url/i, {
    selector: '[name="eventSourceUrl"]'
  }),
  eventIdInput: await screen.findByLabelText(/event id/i, {
    selector: '[name="eventId"]'
  }),
  optOutInput: await screen.findByLabelText(/opt out/i, {
    selector: '[name="optOut"]'
  }),
  limitedDataUseCheckbox: await screen.findByLabelText(
    /enable limited data use/i
  ),
  clientIpAddressInput: await screen.findByLabelText(/client ip address/i, {
    selector: '[name="clientIpAddress"]'
  }),
  clientUserAgentInput: await screen.findByLabelText(/client user agent/i, {
    selector: '[name="clientUserAgent"]'
  }),
  emailInput: await screen.findByLabelText(/email/i, {
    selector: '[name="email"]'
  }),
  phoneInput: await screen.findByLabelText(/phone/i, {
    selector: '[name="phone"]'
  }),
  genderInput: await screen.findByLabelText(/gender/i, {
    selector: '[name="gender"]'
  }),
  dobInput: await screen.findByLabelText(/date of birth/i, {
    selector: '[name="dob"]'
  }),
  lastNameInput: await screen.findByLabelText(/last name/i, {
    selector: '[name="lastName"]'
  }),
  firstNameInput: await screen.findByLabelText(/first name/i, {
    selector: '[name="firstName"]'
  }),
  cityInput: await screen.findByLabelText(/city/i, {
    selector: '[name="city"]'
  }),
  stateInput: await screen.findByLabelText(/state/i, {
    selector: '[name="state"]'
  }),
  zipInput: await screen.findByLabelText(/zip/i, {
    selector: '[name="zip"]'
  }),
  countryInput: await screen.findByLabelText(/country/i, {
    selector: '[name="country"]'
  }),
  externalIdInput: await screen.findByLabelText(/external id/i, {
    selector: '[name="externalId"]'
  }),
  clickIdInput: await screen.findByLabelText(/click id/i, {
    selector: '[name="fbc"]'
  }),
  browserIdInput: await screen.findByLabelText(/browser id/i, {
    selector: '[name="fbp"]'
  }),
  subscriptionIdInput: await screen.findByLabelText(/subscription id/i, {
    selector: '[name="subscriptionId"]'
  }),
  metaLoginIdInput: await screen.findByLabelText(/meta login id/i, {
    selector: '[name="fbLoginId"]'
  }),
  leadIdInput: await screen.findByLabelText(/lead id/i, {
    selector: '[name="leadId"]'
  }),
  customDataRawTextarea: await screen.findByLabelText(/custom data raw/i),
  testEventCheckbox: await screen.findByLabelText(/send as test event/i),
  testEventCodeInput: screen.queryByLabelText(/test event code/i, {
    selector: '[name="testEventCode"]'
  }),
  pixelIdInput: await screen.findByLabelText(/pixel id/i, {
    selector: '[name="pixelId"]'
  }),
  accessTokenInput: await screen.findByLabelText(/access token/i, {
    selector: '[name="accessToken"]'
  })
});

describe('SendCapiData view', () => {
  test('sets form values from settings', async () => {
    renderView(SendCapiData);

    await extensionBridge.init({
      settings: {
        actionSource: 'Web',
        eventName: 'CompleteRegistration',
        eventTime: '123456',
        eventSourceUrl: 'http://localhost',
        eventId: 'ID123',
        optOut: true,
        lduEnabled: true,
        clientIpAddress: '123',
        email: 'email',
        phone: 'phone',
        firstName: 'fname',
        lastName: 'lname',
        dob: '19811229',
        gender: 'm',
        city: 'city',
        state: 'state',
        zip: 'zip',
        country: 'US',
        externalId: 'A123',
        clientUserAgent: 'agent',
        fbc: '123',
        fbp: '456',
        subscriptionId: '789',
        fbLoginId: '101',
        leadId: '112',
        customData: {
          a: 'b'
        },
        isTestEvent: true,
        testEventCode: '1111',
        pixelId: '111',
        accessToken: 'token'
      }
    });

    const {
      actionSourceInput,
      eventNameInput,
      eventTimeInput,
      eventSourceUrlInput,
      eventIdInput,
      optOutInput,
      limitedDataUseCheckbox,
      clientIpAddressInput,
      clientUserAgentInput,
      emailInput,
      phoneInput,
      genderInput,
      dobInput,
      lastNameInput,
      firstNameInput,
      cityInput,
      stateInput,
      zipInput,
      countryInput,
      externalIdInput,
      clickIdInput,
      browserIdInput,
      subscriptionIdInput,
      metaLoginIdInput,
      leadIdInput,
      customDataRawTextarea,
      testEventCheckbox,
      testEventCodeInput,
      pixelIdInput,
      accessTokenInput
    } = await getFormFields();

    expect(actionSourceInput.value).toBe('Web');
    expect(eventNameInput.value).toBe('CompleteRegistration');
    expect(eventTimeInput.value).toBe('123456');
    expect(eventSourceUrlInput.value).toBe('http://localhost');
    expect(eventIdInput.value).toBe('ID123');
    expect(optOutInput.value).toBe('true');
    expect(limitedDataUseCheckbox).toBeChecked();
    expect(optOutInput.value).toBe('true');
    expect(clientIpAddressInput.value).toBe('123');
    expect(clientUserAgentInput.value).toBe('agent');
    expect(emailInput.value).toBe('email');
    expect(phoneInput.value).toBe('phone');
    expect(genderInput.value).toBe('m');
    expect(dobInput.value).toBe('19811229');
    expect(lastNameInput.value).toBe('lname');
    expect(firstNameInput.value).toBe('fname');
    expect(cityInput.value).toBe('city');
    expect(stateInput.value).toBe('state');
    expect(zipInput.value).toBe('zip');
    expect(countryInput.value).toBe('US');
    expect(externalIdInput.value).toBe('A123');
    expect(clickIdInput.value).toBe('123');
    expect(browserIdInput.value).toBe('456');
    expect(subscriptionIdInput.value).toBe('789');
    expect(metaLoginIdInput.value).toBe('101');
    expect(leadIdInput.value).toBe('112');
    expect(customDataRawTextarea.value).toBe('{\n  "a": "b"\n}');
    expect(testEventCheckbox).toBeChecked();
    expect(testEventCodeInput.value).toBe('1111');
    expect(pixelIdInput.value).toBe('111');
    expect(accessTokenInput.value).toBe('token');
  });

  test('sets settings from form values', async () => {
    renderView(SendCapiData);

    await extensionBridge.init({ isTestEvent: true });

    const {
      actionSourceInput,
      eventNameInput,
      eventTimeInput,
      eventSourceUrlInput,
      eventIdInput,
      optOutInput,
      limitedDataUseCheckbox,
      clientIpAddressInput,
      clientUserAgentInput,
      emailInput,
      phoneInput,
      genderInput,
      dobInput,
      lastNameInput,
      firstNameInput,
      cityInput,
      stateInput,
      zipInput,
      countryInput,
      externalIdInput,
      clickIdInput,
      browserIdInput,
      subscriptionIdInput,
      metaLoginIdInput,
      leadIdInput,
      customDataRawTextarea,
      testEventCheckbox,
      pixelIdInput,
      accessTokenInput
    } = await getFormFields();

    await changeComboboxValue(actionSourceInput, 'Web');
    await changeComboboxValue(eventNameInput, 'CompleteRegistration');
    await changeInputValue(eventTimeInput, '123456');
    await changeInputValue(eventSourceUrlInput, 'http://localhost');
    await changeInputValue(eventIdInput, 'ID123');
    await changeInputValue(optOutInput, 'true');
    await click(limitedDataUseCheckbox);
    await changeInputValue(clientIpAddressInput, '123');
    await changeInputValue(clientUserAgentInput, 'agent');
    await changeInputValue(emailInput, 'email');
    await changeInputValue(phoneInput, 'phone');
    await changeInputValue(genderInput, 'm');
    await changeInputValue(dobInput, '19811229');
    await changeInputValue(lastNameInput, 'lname');
    await changeInputValue(firstNameInput, 'fname');
    await changeInputValue(cityInput, 'city');
    await changeInputValue(stateInput, 'state');
    await changeInputValue(zipInput, 'zip');
    await changeInputValue(countryInput, 'US');
    await changeInputValue(externalIdInput, 'A123');
    await changeInputValue(clickIdInput, '123');
    await changeInputValue(browserIdInput, '456');
    await changeInputValue(subscriptionIdInput, '789');
    await changeInputValue(metaLoginIdInput, '101');
    await changeInputValue(leadIdInput, '112');
    await changeInputValue(customDataRawTextarea, '{{"a":"b"}');
    await click(testEventCheckbox);
    await changeInputValue(pixelIdInput, '112');
    await changeInputValue(accessTokenInput, '112');

    const { testEventCodeInput } = await getFormFields();
    await changeInputValue(testEventCodeInput, '1111');

    expect(extensionBridge.getSettings()).toEqual({
      actionSource: 'Web',
      eventName: 'CompleteRegistration',
      eventTime: '123456',
      eventSourceUrl: 'http://localhost',
      eventId: 'ID123',
      optOut: true,
      lduEnabled: true,
      clientIpAddress: '123',
      email: 'email',
      phone: 'phone',
      firstName: 'fname',
      lastName: 'lname',
      dob: '19811229',
      gender: 'm',
      city: 'city',
      state: 'state',
      zip: 'zip',
      country: 'US',
      externalId: 'A123',
      clientUserAgent: 'agent',
      fbc: '123',
      fbp: '456',
      subscriptionId: '789',
      fbLoginId: '101',
      leadId: '112',
      customData: {
        a: 'b'
      },
      isTestEvent: true,
      testEventCode: '1111',
      pixelId: '112',
      accessToken: '112'
    });
  });

  test('handles form validation correctly', async () => {
    renderView(SendCapiData);

    await extensionBridge.init({
      settings: { lduEnabled: true }
    });

    const {
      actionSourceInput,
      eventNameInput,
      eventTimeInput,
      clientIpAddressInput
    } = await getFormFields();

    await extensionBridge.validate();

    expect(actionSourceInput).toHaveAttribute('aria-invalid', 'true');
    expect(eventNameInput).toHaveAttribute('aria-invalid', 'true');
    expect(eventTimeInput).toHaveAttribute('aria-invalid', 'true');
    expect(clientIpAddressInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('handles form validation correctly when action source is website', async () => {
    renderView(SendCapiData);

    await extensionBridge.init({
      settings: { actionSource: 'website' }
    });

    const { eventSourceUrlInput, clientUserAgentInput } = await getFormFields();

    await extensionBridge.validate();

    expect(eventSourceUrlInput).toHaveAttribute('aria-invalid', 'true');
    expect(clientUserAgentInput).toHaveAttribute('aria-invalid', 'true');
  });
});
