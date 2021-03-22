import CourseCard from '../CourseCard/CourseCard'
import './CourseContainer.scss'

const CourseContainer = ({ courses }) => {

  const createCourseCards = () => {
    return courses.map(course => {
      return (
        <CourseCard 
          key={course.id}
          id={course.id}
          name={course.name}
          days={course.days}
          time={course.time}
          students={course.students}
        />
      )
    })
  }

  return (
    <section className='course-container'>
      { createCourseCards() }
    </section>
  )
}

export default CourseContainer