import React from 'react'
import styles from './Layout.module.css'
import {Navbar}  from '../Navbar/Navbar'

export const Layout = ({children}) => {
  return (
    <>
    <Navbar />
    <main className={styles.layout}>
      {children}
    </main>
    </>
  )
}
