import './App.css'
import { Layout } from './components/Layout/Layout'
import Navbar from './components/Navbar/Navbar'
import { ManageRoutes } from './components/ManageRoutes'

function App() {
  return (
    <>
    <Navbar />
    <Layout>
      <ManageRoutes />
    </Layout>
    </>
  )
}

export default App
