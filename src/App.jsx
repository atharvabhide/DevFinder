import './App.css'
import { Layout } from './components/Layout/Layout'


import { ManageRoutes } from './components/ManageRoutes'
import { Navbar } from './components/Navbar/Navbar'

import { AuthProvider } from './context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  return (
    <>
    <GoogleOAuthProvider clientId='706084958611-1tgh59e7l7cakff8v76lbldqppqohni6.apps.googleusercontent.com'>
      <AuthProvider>
          <Layout>
          <ManageRoutes />
          </Layout>
      </AuthProvider>
    </GoogleOAuthProvider>
    </>
  )
}


