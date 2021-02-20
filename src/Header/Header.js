import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ students }) => {
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

  return (
    <header>
      <Link to='/'><h1>Course Catalog</h1></Link>
      <select>
        <option value={''}>Select a student</option>
        { createStudentDropdown() }
      </select>
    </header>
  )
}

export default Header