import React from 'react'
import styles from './ResetPassword.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const ResetPassword = (props) => {
    const navigate = useNavigate();
  return (
    <>
        <div className={styles.modal} onClick={props.onClose}>
            <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.modalTitle}>
                        Reset Your Password

                    </div>
                    <div className={styles.modalContent}>
                        <input type="password" className={styles.inputField} placeholder='New Password' />
                        <input type="password" className={styles.inputField} placeholder='Confirm Password' />
                        

                    </div>
                    <div className={styles.modalFooter}>
                        
                        <button className={styles.modalButton} id={styles.deleteButton} onClick={() => navigate("/login")}>Submit</button>
                        
                       
                        
                        
                    </div>

                    

                </div>

            </div>
        </div>
    </>
  )
}
