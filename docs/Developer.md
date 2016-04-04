# Form DV1 API developer guide

This guide is for developers want to verify or change the functionality of the app.
If you want to use this form without changes then follow the guide in [README](../README.md).

## Build environment

- node v4+ and npm v3.7+
- run `npm install` to install all local dependencies

### Quality assurance

Tests can be run in the local dev environment.
Checks are also performed on every push to github.

#### Test framework

Tests are written with protractor (it's not just for angular) which relies on webdriver.

#### Continuous integration (CI)

CI checks are done by Travis with tests handled by saucelabs.

#### Code analysis

Bithound provides analysis services including checking dependencies for known issues.


### Grunt tasks

Grunt is setup to watch files for changes and check them.
ESLint is used for javascript quality control, and protractor tests for acceptance tests.

Run `grunt dev` to watch files while you work.
