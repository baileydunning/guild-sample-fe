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
  const [error, setError] = useState(null)

  useEffect(() => {
    getCourses()
    .then(data => setCourses(data.allCourses))
    .catch(err => setError(err))
  }, [])

  useEffect(() => {
    getStudents()
      .then(data => setStudents(data.allStudents))
      .catch(err => setError(err))
  }, [])

  return (
    <AppContext.Provider value={courses}>
      <Header students={students}/>
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
