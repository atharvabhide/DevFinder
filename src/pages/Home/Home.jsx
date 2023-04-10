import React from 'react'
import styles from './Home.module.css'
import Hero from '../../assets/Home_Animation.gif'

export const Home = () => {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.header}>
          <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, adipisci.</h1>
        </div>
        <img src={Hero} alt="" className={styles.heroGIF} />

      </div>
   
    </>
  )
}
