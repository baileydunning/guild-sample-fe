export const getCourses = () => {
  return fetch('http://localhost:4000/courses')
  .then(res => res.json())
}

export const getStudents = () => {
  return fetch('http://localhost:4000/students')
    .then(res => res.json())
}

export const registerStudent = (courseId, studentId) => {
  console.log(studentId)
  return fetch(`http://localhost:4000/courses/${courseId}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentId)
  })
    .then(response => response.json())
}