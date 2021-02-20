import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor, act } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import { getCourses, getStudents } from '../apiCalls'
import { students, courses } from '../testData'
import App from './App'
jest.mock('../apiCalls')

describe('App', () => {
  const history = createMemoryHistory()
  beforeEach(async() => {
    await act(async() => {
      getCourses.mockResolvedValue(courses)
      getStudents.mockResolvedValue(students)
      render(<Router history={history}><App /></Router>)
    })
  })
  
  it('should render the app', () => {
    const appHeader = screen.getByText('Course Catalog')
    expect(appHeader).toBeInTheDocument()
    expect(history.location.pathname).toBe('/')
  })
  
  it('should display courses from fetch', () => {
    screen.debug()
  })
})
