import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const token = JSON.parse(localStorage.getItem('Token'))
    return (
        <div> {token?.ACCESS_TOKEN ? <Outlet /> : <Navigate to='/' />}</div>
    )
}

export default PrivateRoute