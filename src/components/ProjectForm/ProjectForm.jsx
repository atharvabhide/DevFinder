import React from 'react'
import styles from './ProjectForm.module.css'

export const ProjectForm = () => {
  return (
    <>
        <div className={styles.wrapper}>
            <form action="" className={styles.formContainer}>
                <input className={styles.inputField} type="text"  placeholder='Title' /><br />
                <input className={styles.inputField} type="text"  placeholder='Username' /><br />
                <input className={styles.inputField} type="file" placeholder='Hello' multiple /><br />
                <input className={styles.inputField} type="url" placeholder='Demo Link' /><br />
                <input className={styles.inputField} type="url"  placeholder='Source Code' />

                <div className={styles.tagSection}>

                

                </div>


                <input type="submit" value="Submit"></input>
                
                
            </form>
        </div>
    </>
  )
}
