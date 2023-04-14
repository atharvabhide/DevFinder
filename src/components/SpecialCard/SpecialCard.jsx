import React from 'react'
import styles from './SpecialCard.module.css';


export const SpecialCard = (props) => {
  return (
    <>
        <div className={styles.profile}>
          <div className={styles.profileHeader}>
            <img src={props.image} className={styles.profileImg} alt="" />
            <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>
                  {props.name}
                </h2>
                <div className={styles.profileShortBio}>
                  {props.position}
                </div>
            </div>

          </div>
          <div className={styles.profileBio}>
            {props.bio}
          </div>
          <div className={styles.profileSkills}>
            <button id={styles.buttonSkills}>{props.skill1} </button>
            <button id={styles.buttonSkills}>{props.skill2}</button>
            <button id={styles.buttonSkills}>{props.skill3}</button>
            <button id={styles.buttonSkills}>{props.skill4}</button>
            <button id={styles.buttonSkills}>{props.skill5}</button>
          </div>

        </div>
    </>
  )
}
