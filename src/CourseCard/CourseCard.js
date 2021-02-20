import { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
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

  const checkRegistrationStatus = () => {
    const truthyRegistration = students.find(student => {
      return student.id === selectedStudent
    })
    return truthyRegistration ? true : false
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
      {
        !checkRegistrationStatus() ?
        <button onClick={() => handleRegistration()}>Register</button> :
        <button>Remove Course</button>
      }
    </Fragment>
  )
}

export default CourseCard
