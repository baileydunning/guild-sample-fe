export const getCourses = () => {
  return fetch('http://localhost:4000/courses')
  .then(res => res.json())
}

export const getStudents = () => {
  return fetch('http://localhost:4000/students')
    .then(res => res.json())
}