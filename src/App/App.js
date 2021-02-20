import React from 'react'
import AppContext from './AppContext'
import Header from '../Header/Header'
import CourseContainer from '../CourseContainer/CourseContainer'
import './App.scss'

const App = () => {
  return (
    <AppContext.Provider>
      <Header />
      <CourseContainer />
    </AppContext.Provider>
  )
}

export default App
