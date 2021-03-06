# Form DV1 - Application for a Protection Order (Queensland)

[![Build Status](https://travis-ci.org/bboyle/dva-f-1.svg?branch=master)](https://travis-ci.org/bboyle/dva-f-1)
[![bitHound Overall Score](https://www.bithound.io/github/bboyle/dva-f-1/badges/score.svg)](https://www.bithound.io/github/bboyle/dva-f-1)

[![Build Status](https://saucelabs.com/open_sauce/build_matrix/bboyle-dvaf1.svg)](https://saucelabs.com/beta/builds/246cefa37f9e486397927baa9c5bee71)

In Queensland, applications for domestic violence protection orders must be made through the magistrates court on the approved form.
Forms are available from the [Queensland Courts website](http://www.courts.qld.gov.au/about/forms).

An API is under development to return a PDF document with supplied information to assist in the application process.

This repo is a template implementation of an online form that guides an applicant through the process.
The form in this repo and integrates with that API to deliver a PDF application package containing the relevant forms and instructions.

Learn more about [DV Protection orders in Queensland](https://www.qld.gov.au/law/crime-and-police/abuse-family-matters-and-protection-orders/domestic-violence-orders/).

## Licence

This code is available under the [BSD-3-Clause licence](LICENSE).

You may publish variations of this form to assist applicants with the protection order application process.

## Documentation

- [Usage](docs/Usage.md) - how to use their form on your own website
- [API](docs/API.md) - HTTP backend for generating a PDF application pack
- [Developer notes](docs/Developer.md) - notes on working with the source code
