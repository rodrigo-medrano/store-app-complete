import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { PublicRoute } from './PublicRoute'
import LoginPage from '../pages/auth/LoginPage'
import { ProductPage } from '../pages/product/ProductPage'
import { PrivateRoute } from './PrivateRoute'
import { useAuthStore } from '../hooks'

function AppRouter() {
  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
    console.log(status)
  }, [])

  if (status === 'checking') {
    return (
      <div className="loading-screen">
        <h1>Cargando...</h1>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={status === 'authenticated'}>
              <ProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={status === 'authenticated'}>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
