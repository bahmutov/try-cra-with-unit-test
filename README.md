# try-cra-with-unit-test ![Cypress version](https://img.shields.io/badge/cypress-4.5.0-brightgreen)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and can be tested using [Cypress](https://www.cypress.io) and [cypress-react-unit-test](https://github.com/bahmutov/cypress-react-unit-test)

```shell
$ yarn
$ yarn cypress open
```

Select `App.cy-spec.js` to run component test [src/App.cy-spec.js](src/App.cy-spec.js)

![Running test](img/demo.gif)

Dynamically created resources like that SVG are not served by Cypress yet.

Check [cypress.json](cypress.json)

Read [My Vision for Component Tests in Cypress](https://glebbahmutov.com/blog/my-vision-for-component-tests/)
