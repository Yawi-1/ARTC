import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
const PublicRoute = ({ children }) => {
    const { user, authLoading } = useAuth()
    if (authLoading) {
        return <h1>Loading....</h1>
    }
    if (user) {
        return <Navigate to='/' replace />
    }
    return children
}

export default PublicRoute