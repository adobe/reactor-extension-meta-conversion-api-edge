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

import Configuration from '../configuration';
import createExtensionBridge from '../../__tests_helpers__/createExtensionBridge';

import { changeInputValue } from '../../__tests_helpers__/jsDomHelpers';

let extensionBridge;

beforeEach(() => {
  extensionBridge = createExtensionBridge();
  window.extensionBridge = extensionBridge;
});

afterEach(() => {
  delete window.extensionBridge;
});

const getFromFields = async () => ({
  pixelIdInput: await screen.findByLabelText(/pixel id/i, {
    selector: '[name="pixelId"]'
  }),
  accessTokenInput: await screen.findByLabelText(/access token/i, {
    selector: '[name="accessToken"]'
  })
});

describe('Configuration view', () => {
  test('sets form values from settings', async () => {
    renderView(Configuration);

    await extensionBridge.init({
      settings: {
        pixelId: '12345',
        accessToken: '54321'
      }
    });

    const { pixelIdInput, accessTokenInput } = await getFromFields();

    expect(pixelIdInput.value).toBe('12345');
    expect(accessTokenInput.value).toBe('54321');
  });

  test('sets settings from form values', async () => {
    renderView(Configuration);

    await extensionBridge.init({
      settings: {
        pixelId: '12345',
        accessToken: '54321'
      }
    });

    const { pixelIdInput, accessTokenInput } = await getFromFields();

    await changeInputValue(pixelIdInput, '123456');
    await changeInputValue(accessTokenInput, '111111');

    expect(extensionBridge.getSettings()).toEqual({
      pixelId: '123456',
      accessToken: '111111'
    });
  });

  test('handles form validation correctly', async () => {
    renderView(Configuration);

    await extensionBridge.init({
      settings: {
        pixelId: '12345',
        accessToken: '5555'
      }
    });

    const { pixelIdInput, accessTokenInput } = await getFromFields();

    expect(pixelIdInput).not.toHaveAttribute('aria-invalid');
    expect(accessTokenInput).not.toHaveAttribute('aria-invalid');

    await changeInputValue(pixelIdInput, '');
    await changeInputValue(accessTokenInput, '');
    await extensionBridge.validate();

    expect(pixelIdInput).toHaveAttribute('aria-invalid', 'true');
    expect(accessTokenInput).toHaveAttribute('aria-invalid');
  });
});
