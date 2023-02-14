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

import { changeInputValue, click } from '../../__tests_helpers__/jsDomHelpers';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getFormFields = () => ({
  actionSourceInput: screen.getByLabelText(/action source/i, {
    selector: '[name="actionSource"]'
  }),
  eventNameInput: screen.getByLabelText(/event name/i, {
    selector: '[name="eventName"]'
  }),
  eventTimeInput: screen.getByLabelText(/event time/i, {
    selector: '[name="eventTime"]'
  }),
  eventSourceUrlInput: screen.getByLabelText(/event source url/i, {
    selector: '[name="eventSourceUrl"]'
  }),
  eventIdInput: screen.getByLabelText(/event id/i, {
    selector: '[name="eventId"]'
  }),
  optOutInput: screen.getByLabelText(/opt out/i, {
    selector: '[name="optOut"]'
  }),
  limitedDataUseCheckbox: screen.getByLabelText(/enable limited data use/i),
  clientIpAddressInput: screen.getByLabelText(/client ip address/i, {
    selector: '[name="clientIpAddress"]'
  }),
  clientUserAgentInput: screen.getByLabelText(/client user agent/i, {
    selector: '[name="clientUserAgent"]'
  }),
  emailInput: screen.getByLabelText(/email/i, {
    selector: '[name="email"]'
  }),
  phoneInput: screen.getByLabelText(/phone/i, {
    selector: '[name="phone"]'
  }),
  genderInput: screen.getByLabelText(/gender/i, {
    selector: '[name="gender"]'
  }),
  dobInput: screen.getByLabelText(/date of birth/i, {
    selector: '[name="dob"]'
  }),
  lastNameInput: screen.getByLabelText(/last name/i, {
    selector: '[name="lastName"]'
  }),
  firstNameInput: screen.getByLabelText(/first name/i, {
    selector: '[name="firstName"]'
  }),
  cityInput: screen.getByLabelText(/city/i, {
    selector: '[name="city"]'
  }),
  stateInput: screen.getByLabelText(/state/i, {
    selector: '[name="state"]'
  }),
  zipInput: screen.getByLabelText(/zip/i, {
    selector: '[name="zip"]'
  }),
  countryInput: screen.getByLabelText(/country/i, {
    selector: '[name="country"]'
  }),
  externalIdInput: screen.getByLabelText(/external id/i, {
    selector: '[name="externalId"]'
  }),
  clickIdInput: screen.getByLabelText(/click id/i, {
    selector: '[name="fbc"]'
  }),
  browserIdInput: screen.getByLabelText(/browser id/i, {
    selector: '[name="fbp"]'
  }),
  subscriptionIdInput: screen.getByLabelText(/subscription id/i, {
    selector: '[name="subscriptionId"]'
  }),
  metaLoginIdInput: screen.getByLabelText(/meta login id/i, {
    selector: '[name="fbLoginId"]'
  }),
  leadIdInput: screen.getByLabelText(/lead id/i, {
    selector: '[name="leadId"]'
  }),
  customDataRawTextarea: screen.getByLabelText(/custom data raw/i),
  testEventCheckbox: screen.getByLabelText(/send as test event/i),
  testEventCodeInput: screen.queryByLabelText(/test event code/i, {
    selector: '[name="testEventCode"]'
  })
});

describe('SendCapiData view', () => {
  test('sets form values from settings', async () => {
    renderView(SendCapiData);

    extensionBridge.init({
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
        testEventCode: '1111'
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
      testEventCodeInput
    } = getFormFields();

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
  });

  test('sets settings from form values', async () => {
    renderView(SendCapiData);

    extensionBridge.init({ isTestEvent: true });

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
      testEventCheckbox
    } = getFormFields();

    await changeInputValue(actionSourceInput, 'Web');
    await changeInputValue(eventNameInput, 'CompleteRegistration');
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

    const { testEventCodeInput } = getFormFields();
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
      testEventCode: '1111'
    });
  });

  test('handles form validation correctly', async () => {
    renderView(SendCapiData);

    extensionBridge.init({
      settings: { lduEnabled: true }
    });

    const {
      actionSourceInput,
      eventNameInput,
      eventTimeInput,
      clientIpAddressInput
    } = getFormFields();

    await extensionBridge.validate();

    expect(actionSourceInput).toHaveAttribute('aria-invalid', 'true');
    expect(eventNameInput).toHaveAttribute('aria-invalid', 'true');
    expect(eventTimeInput).toHaveAttribute('aria-invalid', 'true');
    expect(clientIpAddressInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('handles form validation correctly when action source is website', async () => {
    renderView(SendCapiData);

    extensionBridge.init({
      settings: { actionSource: 'website' }
    });

    const { eventSourceUrlInput, clientUserAgentInput } = getFormFields();

    await extensionBridge.validate();

    expect(eventSourceUrlInput).toHaveAttribute('aria-invalid', 'true');
    expect(clientUserAgentInput).toHaveAttribute('aria-invalid', 'true');
  });
});
