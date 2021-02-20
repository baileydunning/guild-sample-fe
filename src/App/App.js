import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import AppContext from './AppContext'
import Header from '../Header/Header'
import CourseContainer from '../CourseContainer/CourseContainer'
import StudentProfile from '../StudentProfile/StudentProfile'
import Error from '../Error/Error'
import { getCourses, getStudents, getStudent } from '../apiCalls'
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

  const fetchStudentInfo = (id) => {
    return (
      getStudent(id)
        .then(data => setStudentSelection(data))
        .catch(err => setError(err))
    )
  }

  const filterClassesByStudent = (id) => {
    return courses.reduce((studentCourses, course) => {
      if (course.students.length > 0) {
        const registeredStudent = course.students.find(student => student.id === id)
        if (registeredStudent && !studentCourses.includes(course)) { 
          studentCourses.push(course) 
        }
      }
      return studentCourses
    }, [])
  }
  
  return (
    <AppContext.Provider value={ studentSelection }>
      { error && <Error /> }
      <Header 
        students={ students }
        fetchStudentInfo={ fetchStudentInfo }
      />
      <Switch>
        <Route
          exact
          path='/student/:id'
          render={({ match }) => {
            const studentId = parseInt(match.params.id)
            fetchStudentInfo(studentId)
            return (
              <StudentProfile 
                id={ studentId }
                courses={ filterClassesByStudent(studentId) }
              />
            )
          }}
        />
        <Route 
          exact
          path='/'
          render={() =>
            <CourseContainer courses={ courses }/>
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
