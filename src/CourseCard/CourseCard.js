import { Fragment, useContext } from 'react'
import AppContext from '../App/AppContext'
import { registerStudent } from '../apiCalls'

const CourseCard = ({ id, name, days, time, students }) => {
  const selectedStudent = useContext(AppContext)

  const formatTime = (num) => {
    if (num === 12) { return '12 PM' }
    return num <= 12 ? `${num} AM` : `${num - 12} PM`
  }

  const formatDays = () => {
    return days.reduce((summary, day) => {
      summary += `${day} `
      return summary
    }, '')
  }

  const handleRegistration = () => {
    if (!selectedStudent) {
      alert('Please select a student from the dropdown to register for this course')
    } else {
      let student = { id: selectedStudent }
      registerStudent(id, student)
    }
  }

  return (
    <Fragment>
      <h2>{ name }</h2>
      <p> {formatTime(time[0])} - {formatTime(time[1])} </p>
      <p> {formatDays()} </p>
      <button onClick={() => handleRegistration()}>Register</button>
    </Fragment>
  )
}

export default CourseCard
