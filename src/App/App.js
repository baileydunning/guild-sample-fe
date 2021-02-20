import React from 'react'
import AppContext from './AppContext'
import Header from '../Header/Header'
import './App.scss'

const App = () => {
  return (
    <AppContext.Provider>
      <Header />
    </AppContext.Provider>
  )
}

export default App
