/// <reference types="cypress" />
// trying to run component test from non "src" folder
import React from 'react'
import App from '../../src/App'
import {mount} from 'cypress-react-unit-test'

describe('cypress/component App', () => {
  it('renders learn react link', () => {
    mount(<App />)
    cy.contains(/Learn React/)
  })
})
