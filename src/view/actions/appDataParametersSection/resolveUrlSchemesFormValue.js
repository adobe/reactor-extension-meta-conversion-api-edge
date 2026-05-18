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

import coerceUrlSchemesStringArray from '../../../constants/coerceUrlSchemesStringArray';
import { isDataElementToken } from '../../utils/validators';
import parseUrlSchemesLiteral from './parseUrlSchemesLiteral';

/**
 * Classify form `urlSchemes` for validate vs getSettings (same rules, different handling).
 *
 * @param {unknown} raw
 * @returns
 *   | { kind: 'omit' }
 *   | { kind: 'invalid' }
 *   | { kind: 'dataElementToken', value: string }
 *   | { kind: 'array', value: string[] }
 */
export default function resolveUrlSchemesFormValue(raw) {
  if (raw == null || raw === '') {
    return { kind: 'omit' };
  }

  if (Array.isArray(raw)) {
    const coerced = coerceUrlSchemesStringArray(raw);
    if (coerced == null) {
      return { kind: 'invalid' };
    }
    return { kind: 'array', value: coerced };
  }

  if (typeof raw !== 'string') {
    return { kind: 'invalid' };
  }

  const trimmed = raw.trim();
  if (!trimmed) {
    return { kind: 'omit' };
  }

  if (isDataElementToken(trimmed)) {
    return { kind: 'dataElementToken', value: trimmed };
  }

  const parsed = parseUrlSchemesLiteral(trimmed);
  if (parsed == null) {
    return { kind: 'invalid' };
  }
  return { kind: 'array', value: parsed };
}
