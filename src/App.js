import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './components/Home'

import View from './components/student/View'
import Edit from './components/student/Edit'





export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/view/:id" element={<View />} />
          <Route exact path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
