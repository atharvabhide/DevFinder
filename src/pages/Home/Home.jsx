import React from 'react'
import styles from './Home.module.css'
import Hero from '../../assets/Home_Animation.gif'
import ProfileImg from '../../assets/nalla.jpg'

export const Home = () => {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.header}>
          <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, adipisci.</h1><br /><br />
          <button className={styles.heroButton}>
            Get Started
          </button>
        </div>
        <img src={Hero} alt="" className={styles.heroGIF} />

      </div>
      <div className={styles.devProfiles}>
        <div className={styles.profile}>
          <div className={styles.profileHeader}>
            <img src={ProfileImg} className={styles.profileImg} alt="" />
            <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>
                  Atharva Bhide
                </h2>
                <div className={styles.profileShortBio}>
                  Backend developer
                </div>
            </div>

          </div>
          <div className={styles.profileBio}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quaerat obcaecati ad. Nulla voluptas maxime sapiente voluptatem animi officia velit ea pariatur error! Inventore cum esse nobis alias nihil debitis.
          </div>
          <div className={styles.profileSkills}>
            <button id={styles.buttonSkills}>Python </button>
            <button id={styles.buttonSkills}>Python</button>
            <button id={styles.buttonSkills}>Python</button>
            <button id={styles.buttonSkills}>Python</button>
            <button id={styles.buttonSkills}>Python</button>
          </div>

        </div>

        <div className={styles.profile}>
          <div className={styles.profileHeader}>
            <img src={ProfileImg} className={styles.profileImg} alt="" />
            <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>
                  Atharva Bhide
                </h2>
                <div className={styles.profileShortBio}>
                  Backend developer
                </div>
            </div>

          </div>
          <div className={styles.profileBio}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quaerat obcaecati ad. Nulla voluptas maxime sapiente voluptatem animi officia velit ea pariatur error! Inventore cum esse nobis alias nihil debitis.
          </div>
          <div className={styles.profileSkills}>
            <button id={styles.buttonSkills}>Python </button>
            <button id={styles.buttonSkills}>Python</button>
            <button id={styles.buttonSkills}>Python</button>
            <button id={styles.buttonSkills}>Python</button>
            <button id={styles.buttonSkills}>Python</button>
          </div>

        </div>

        <div className={styles.profile}>
          <div className={styles.profileHeader}>
            <img src={ProfileImg} className={styles.profileImg} alt="" />
            <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>
                  Atharva Bhide
                </h2>
                <div className={styles.profileShortBio}>
                  Backend developer
                </div>
            </div>

          </div>
          <div className={styles.profileBio}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quaerat obcaecati ad. Nulla voluptas maxime sapiente voluptatem animi officia velit ea pariatur error! Inventore cum esse nobis alias nihil debitis.
          </div>
          <div className={styles.profileSkills}>
            <button id={styles.buttonSkills}>Python </button>
            <button id={styles.buttonSkills}>Python</button>
            <button id={styles.buttonSkills}>Python</button>
            <button id={styles.buttonSkills}>Python</button>
            <button id={styles.buttonSkills}>Python</button>
          </div>

        </div>
         
      </div>


   
    </>
  )
}
