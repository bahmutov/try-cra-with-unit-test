/// <reference types="cypress" />
// without global "cy" the bundler throws an error
// Module Error (from ./node_modules/eslint-loader/dist/cjs.js):
// Line 8:5:  'cy' is not defined  no-undef
// probably need to clean up webpack options more

// compare to App.test.js
import React from 'react'
import App from './App'

describe('App', () => {
  it('renders learn react link', () => {
    cy.mount(<App />)
    cy.contains(/Learn React/)
  })
})
