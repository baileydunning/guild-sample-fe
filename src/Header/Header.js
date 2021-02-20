import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ students, fetchStudentInfo }) => {
  const [student, setStudent] = useState(null)

  const createStudentDropdown = () => {
    return students.map(student => {
      return (
        <option
          key={ student.id }
          value={ student.id }>
          { student.name }
        </option>
      )
    })
  }

  const handleStudentSelection = (id) => {
    id = !id ? '' : parseInt(id)
    fetchStudentInfo(id)
    setStudent(id)
  }

  return (
    <header>
      <Link to='/'>
        <h1>Course Catalog</h1>
      </Link>
      <select onChange={(e) => handleStudentSelection(e.target.value)}>
        <option value={''}>Select a student</option>
        { createStudentDropdown() }
      </select>
      {student &&
        <Link to={`/student/${student}`}>See Schedule</Link>
      }
    </header>
  )
}

export default Header