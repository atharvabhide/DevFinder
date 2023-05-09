import React from 'react'
import styles from './InboxCard.module.css'
import Atharva from '../../assets/nalla.jpg'


export const InboxCard = (props) => {
  return (
    <div className={styles.message}>
          <div className={styles.userImage}>
            <img src={props.imageURL} alt="" />
          </div>
          <div className={styles.messageInfo}>
            <div className={styles.messageSubject}>
              <b>{props.subject}</b>
            </div>
            <div className={styles.username}>
              <i>From {props.username}</i>
            </div>
            <div className={styles.messageContent}>
              <p>{props.content}</p>
            </div>
            <div className={styles.messageTime}>
                {props.time}
            </div>

        </div>

    </div>
  )
}
