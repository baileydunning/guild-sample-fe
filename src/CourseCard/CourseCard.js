import { Fragment } from 'react'

const CourseCard = ({ id, name, days, time, students }) => {
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

  return (
    <Fragment>
      <h2>{ name }</h2>
      <p> {formatTime(time[0])} - {formatTime(time[1])} </p>
      <p> {formatDays()} </p>
    </Fragment>
  )
}

export default CourseCard
