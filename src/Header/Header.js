import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

const Header = ({ students, fetchStudentInfo }) => {
  const [student, setStudent] = useState(null)

  const createStudentDropdown = () => {
    return students.map(student => {
      return (
        <option
          key={ student.id }
          value={ student.id }
          className='dropdown-option'>
          { student.name }
        </option>
      )
    })
  }

  const handleStudentSelection = (id) => {
    id = !id ? '' : +id
    fetchStudentInfo(id)
    setStudent(id)
  }

  return (
    <header className='header'>
      <Link to='/' className='title'>
        <h1>Course Catalog</h1>
      </Link>
      <form>
        <select
          className='select-form' 
          data-testid='select-form' 
          onChange={(e) => handleStudentSelection(e.target.value)}
        >
          <option 
            value={''} 
            className='dropdown-option'
          >
            Select a student
          </option>
          { createStudentDropdown() }
        </select>
      </form>
      {student &&
        <Link to={`/student/${student}`}>See Schedule</Link>
      }
    </header>
  )
}

export default Header