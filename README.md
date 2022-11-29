# Meta's Conversions API extension for Event Forwarding

[![Build Status](https://img.shields.io/github/workflow/status/adobe/reactor-extension-meta-conversion-api/ci?style=flat)](https://github.com/adobe/reactor-extension-meta-conversion-api/actions)

The Conversions API allows advertisers to send web events from their servers directly to Meta. Server events are linked to a pixel and are processed like browser pixel events. This means that server events are used in measurement, reporting, and optimization in the same way as browser pixel events. [Learn More](https://developers.facebook.com/docs/marketing-api/conversions-api).

This repository contains the extension/plug-in that advertisers can install on their property and send signals to Meta's Conversions API.

## Get started

To get started:

1. Install [node.js](https://nodejs.org/).
2. Clone the repository.
3. After navigating into the project directory, install project dependencies by running `npm install`.

### Scripts

To run tests a single time, run the following command:

`npm run test`

To run tests continually while developing, run the following command:

`npm run test:watch`

To ensure your code meets our linting standards, run the following command:

`npm run lint`

To run the extension inside reactor-sandbox:

`npm run sandbox`

To create a build, run the following command:

`npm run build`

To create the extension package, run the following command:

`npm run package`

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
