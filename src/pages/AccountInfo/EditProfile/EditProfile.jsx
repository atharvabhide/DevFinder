import React from 'react'
import styles from './EditProfile.module.css'

export const EditProfile = () => {
  return (
    <div className={styles.wrapper}>
        <form className={styles.form} action="#" method=''>
            <p className={styles.formTitle}>Edit Profile</p>
            <input type="text" className={styles.inputField} placeholder='Name' />
            <input type="email" className={styles.inputField} placeholder='Email' />
            <input type="text" className={styles.inputField} placeholder='Username' />
            <input type="text" className={styles.inputField} placeholder='Location' />
            <textarea className={styles.bio} name="Bio" id="" cols="30" rows="10" placeholder='Bio'></textarea>
            <input type="text" className={styles.inputField} placeholder='Short Intro'  />
            <input type="url" className={styles.inputField} placeholder='Github Profile'  />
            <input type="url" className={styles.inputField} placeholder='LinkedIn Profile'  />
            <input type="url" className={styles.inputField} placeholder='Twitter Profile'  />
            <input type="url" className={styles.inputField} placeholder='Youtube Page'  />
            <input type="url" className={styles.inputField} placeholder='Portfolio'  /><br />
            <input type="submit" className={styles.submitButton} />


        </form>
    </div>
  )
}
