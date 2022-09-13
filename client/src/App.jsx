import React from 'react'
import RouteModule from './routes'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
     <div className='App'>
      <Routes>
        {RouteModule.map((route,idx) => (
          <Route path={route.path} element={route.element} key={idx}></Route>
        ))}
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
