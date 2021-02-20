export const getCourses = () => {
  return fetch('http://localhost:4000/courses')
  .then(res => res.json())
}