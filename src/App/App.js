import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import AppContext from './AppContext'
import Header from '../Header/Header'
import CourseContainer from '../CourseContainer/CourseContainer'
import Error from '../Error/Error'
import { getCourses, getStudents } from '../apiCalls'
import './App.scss'

const App = () => {
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const [studentSelection, setStudentSelection] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCourses()
    .then(data => setCourses(data.allCourses))
    .catch(err => setError(err))
  }, [courses])

  useEffect(() => {
    getStudents()
      .then(data => setStudents(data.allStudents))
      .catch(err => setError(err))
  }, [])

  const selectStudent = (id) => {
    setStudentSelection(id)
  }
  
  return (
    <AppContext.Provider value={studentSelection}>
      { error && <Error /> }
      <Header 
        students={students}
        selectStudent={selectStudent}
      />
      <Switch>
        <Route 
          exact
          path='/'
          render={() =>
            <CourseContainer courses={courses}/>
          }
        />
        <Route
          path='/'
          render={() =>
            <Error />
          }
        />
      </Switch>
    </AppContext.Provider>
  )
}

export default App
