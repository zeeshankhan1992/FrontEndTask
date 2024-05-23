import React from 'react';
import { Outlet } from 'react-router-dom';
import * as C from "../components/index"

const RootLayout = () => {
  return (
    <>
      <C.Header />
      <div className='w-full min-h-screen'>
        <Outlet />
      </div>
      <C.Footer />
    </>
  )
}

export default RootLayout