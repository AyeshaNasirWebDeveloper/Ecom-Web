import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'

export const HomePage = () => {

  // creating state
  const[auth, setAuth] = useAuth()
  return (
    <Layout title={'E-Commerce Store'}>
        <h1>HomePage</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}
