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

const isSha256String = require('./isSha256String');
const shaHashingHelper = require('./shaHashingHelper');

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

const trim = (v) => (typeof v === 'string' ? v.trim() : v);

const noSpaces = (v) => {
  if (isSha256String(v)) {
    return v;
  }

  return typeof v === 'string' ? v.replaceAll(' ', '') : v;
};

const noDash = (v) => {
  if (isSha256String(v)) {
    return v;
  }

  return typeof v === 'string' ? v.replaceAll('-', '') : v;
};

const lowerCase = (v) => {
  if (isSha256String(v)) {
    return v;
  }

  return typeof v === 'string' ? v.toLowerCase() : v;
};

const isNumber = (v) =>
  typeof v === 'number' && isFinite(v); /* isFinite weeds out NaNs.*/

const toString = (v) => {
  if (isSha256String(v)) {
    return v;
  }

  return isNumber(v) ? String(v) : v;
};

const onlyNumbers = (v) =>
  isSha256String(v) ? v : toString(v).replace(/\D/g, '');

const withoutLeading0 = (v) =>
  isSha256String(v) ? v : String(parseInt(toString(v), 10));

//Based on requests from this page: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters
const normalizers = {
  emailNormalizer: pipe(lowerCase, trim, shaHashingHelper),
  phoneNumberNormalizer: pipe(onlyNumbers, withoutLeading0, shaHashingHelper),
  nameNormalizer: pipe(lowerCase, shaHashingHelper),
  cityNormalizer: pipe(lowerCase, shaHashingHelper),
  stateNormalizer: pipe(lowerCase, shaHashingHelper),
  zipNormalizer: pipe(noDash, noSpaces, shaHashingHelper),
  countryNormalizer: pipe(lowerCase, shaHashingHelper)
};

module.exports = normalizers;
