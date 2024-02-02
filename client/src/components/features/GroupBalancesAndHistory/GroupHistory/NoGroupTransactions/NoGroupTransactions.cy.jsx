import React from 'react'
import NoGroupTransactions from './NoGroupTransactions'

describe('<NoGroupTransactions />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NoGroupTransactions />)
  })
})