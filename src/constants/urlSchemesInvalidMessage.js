/*
Copyright 2026 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * Single user-facing copy for urlSchemes validation (view) and normalization errors (lib).
 * Imported from both `src/view` and `src/lib`; keep under `src/constants` so neither
 * layer owns the string exclusively.
 */
module.exports = {
  URL_SCHEMES_INVALID_MESSAGE:
    'Provide a JSON array of URL schemes, or a single data element token.'
};
