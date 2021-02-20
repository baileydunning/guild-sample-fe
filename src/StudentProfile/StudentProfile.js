import { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../App/AppContext'
import CourseContainer from '../CourseContainer/CourseContainer'

const StudentProfile = ({ courses }) => {
  const student = useContext(AppContext)

  return (
    <Fragment>
      { student && 
      <>
      <h2>Schedule for {student.name}</h2>
      <h3>Contact: {student.email}</h3>
      <CourseContainer courses={courses} />
      <Link to='/'>Back to course catalog</Link>
      </>
      }
    </Fragment>
  )
}

export default StudentProfile