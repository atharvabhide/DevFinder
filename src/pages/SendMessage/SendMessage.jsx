import React from 'react'
import styles from './SendMessage.module.css'
import {RxCross2} from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

export const SendMessage = () => {

    const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
        <div className={styles.msgContainer}>
            <div className={styles.header}>
              <h1>To <i>@username</i>,</h1>
              <h3 htmlFor="" style={{marginTop: '1em'}}>Subject</h3>
              <input type="text" className={styles.inputField} placeholder='Enter the subject'  />
              <h3 htmlFor="" style={{marginTop: '1em'}}>Message</h3>
              <textarea name="" id={styles.message} className={styles.inputField} ></textarea>

              <button className={styles.sendButton}>Send</button>
              <RxCross2 onClick={()=>navigate('/developers')} size={22} className={styles.closeButton} />

            </div>

        </div>
    </div>
  )
}
