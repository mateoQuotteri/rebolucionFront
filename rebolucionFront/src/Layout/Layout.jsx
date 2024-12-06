import React from 'react'
import Navbar from '../Components/Navbar'
import {Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet className="width"/>
      {/*Footer*/}
    </div>
  )
}

export default Layout
