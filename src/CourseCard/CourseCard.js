import { useContext } from 'react'
import AppContext from '../App/AppContext'
import { registerStudent } from '../apiCalls'
import './CourseCard.scss'

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
    if (selectedStudent) {
      const truthyRegistration = students.find(student => {
        return student.id === selectedStudent.id
      })
      return truthyRegistration ? true : false
    }
  }

  const handleRegistration = (enrollmentStatus) => {
    if (!selectedStudent) {
      alert('Please select a student from the dropdown to register for this course')
    } else {
      let student = { id: selectedStudent.id, enrolled: enrollmentStatus }
      registerStudent(id, student)
    }
  }

  return (
    <div className='card'>
      <h2>{ name }</h2>
      <p> { formatTime(time[0]) } - { formatTime(time[1]) } </p>
      <p> { formatDays() } </p>
      {
        !checkRegistrationStatus() ?
        <button onClick={() => handleRegistration(true)}>Register</button> :
        <button onClick={() => handleRegistration(false)}>Remove Course</button>
      }
    </div>
  )
}

export default CourseCard
