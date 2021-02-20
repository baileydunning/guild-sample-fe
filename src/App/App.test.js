import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, waitFor, act } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import { getCourses, getStudents, getStudent } from '../apiCalls'
import { students, courses } from '../testData'
import App from './App'
jest.mock('../apiCalls')

describe('App', () => {
  let sampleStudent
  let selectForm
  const history = createMemoryHistory()
  beforeEach(async() => {
    await act(async() => {
      getCourses.mockResolvedValue(courses)
      getStudents.mockResolvedValue(students)
      getStudent.mockResolvedValue(students.allStudents[0])
      render(<Router history={history}><App /></Router>)
    })
    sampleStudent = screen.getByText('Array Romano')
    selectForm = screen.getByTestId('select-form')
  })
  
  it('should render the app', () => {
    const appHeader = screen.getByText('Course Catalog')
    expect(appHeader).toBeInTheDocument()
    expect(history.location.pathname).toBe('/')
  })
  
  it('should display courses from fetch', () => {
    const courseTitle = screen.getByText('Graphic Design')
    expect(courseTitle).toBeInTheDocument()
  })

  it('should display students in dropdown', () => {
    expect(sampleStudent).toBeInTheDocument()
  })

  it('should allow a user to select a student and display link to schedule', async() => {
    await act(async() => {
      userEvent.selectOptions(selectForm, [sampleStudent])
    })
    const scheduleLink = screen.getByText('See Schedule')
    expect(scheduleLink.toBeInTheDocument)
  })

  it('should redirect to student schedule on click', async() => {
    await act(async () => {
      userEvent.selectOptions(selectForm, [sampleStudent])
    })

    const scheduleLink = screen.getByText('See Schedule')

    await act(async () => {
      userEvent.click(scheduleLink)
    })

    const studentEmail = await waitFor(() => screen.getByText('Contact: rayromano@hotmail.com'))
    expect(history.location.pathname).toBe('/student/1')
    expect(studentEmail).toBeInTheDocument()
  })
})
