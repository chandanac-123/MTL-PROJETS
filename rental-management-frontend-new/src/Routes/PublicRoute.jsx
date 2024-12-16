import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getInitialPath } from '../Utils/utils'

const PublicRoute = () => {
  const token = JSON.parse(localStorage.getItem('Token'))
      return (
    <div>
        {!token?.ACCESS_TOKEN?<Outlet/> :<Navigate to={`/${getInitialPath()}`} />}
    </div>
  )
}

export default PublicRoute