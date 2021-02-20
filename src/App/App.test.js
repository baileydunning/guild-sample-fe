import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from './App'

describe('App', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(<Router history={history}><App /></Router>)
  })

  it('should render the app', () => {
    const appHeader = screen.getByText('Course Catalog')
    expect(appHeader).toBeInTheDocument()
  })
})
