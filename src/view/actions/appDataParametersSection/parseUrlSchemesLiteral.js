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

import parseUrlSchemesJsonArray from '../../../constants/parseUrlSchemesJsonArray';

/**
 * Parse a non–data-element literal: must be JSON that parses to an array of strings.
 * Caller must not pass a data element token.
 *
 * @param {string} trimmedLiteral non-empty trimmed string
 * @returns {string[]|null} parsed array or null if invalid
 */
export default function parseUrlSchemesLiteral(trimmedLiteral) {
  return parseUrlSchemesJsonArray(trimmedLiteral);
}
