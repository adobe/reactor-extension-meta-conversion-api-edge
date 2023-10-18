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

import API_VERSION from '../../utils/apiVersion';
import fetch from '../../utils/fetch';

export default (pixelId, accessToken, controller) => {
  const base = `https://graph.facebook.com/${API_VERSION}`;
  const params =
    `?fields=event_match_quality,event_name&agent_name=adobe_launch` +
    `&access_token=${accessToken}`;
  const url = `${base}/${pixelId}/setup_quality${params}`;

  return fetch(url, { signal: controller.signal }).catch((e) => {
    if (e instanceof TypeError) {
      throw new Error(`${e.message} when loading ${url}`);
    } else {
      throw e;
    }
  });
};
