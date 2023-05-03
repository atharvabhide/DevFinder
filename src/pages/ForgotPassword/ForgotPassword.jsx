import React, { useState } from 'react'
import styles from './ForgotPassword.module.css'
import {RxCross2} from 'react-icons/rx'
import { Login } from '../Login/Login';
import { Link } from 'react-router-dom';

export const ForgotPassword = (props) => {

    const [validation, setValidation] = useState(false);

    const handleClick = () => {
        setValidation(!validation);
    };

    
  return (
    <>
        <div className={styles.modal} onClick={props.onClose}>
            <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.modalTitle}>
                        Forgot Password?

                    </div>
                    <div className={styles.modalContent}>
                        <input type="email" className={styles.inputField} placeholder='Enter your registered email' />
                        {validation && <p className={styles.validation}>A link has been sent to your registered email id, check your inbox</p>}

                    </div>
                    <div className={styles.modalFooter}>
                        <div>
                        <button className={styles.modalButton} id={styles.deleteButton} onClick={handleClick}>Send</button>
                        
                        </div>
                        <div>
                        <Link to="/login"><button className={styles.modalButton} id={styles.cancelButton}>Go Back</button></Link>
                        </div>
                        
                    </div>

                    

                </div>

            </div>
        </div>
    </>
  )
}
