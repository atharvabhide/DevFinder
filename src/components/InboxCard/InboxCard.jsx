import React from "react";
import styles from "./InboxCard.module.css";
import Atharva from "../../assets/nalla.jpg";
import defaultImage from "../../assets/default-image.svg";
import formatDate from "../../utils/formatDate";

export const InboxCard = (props) => {
  return (
    <>
      {/* <div className={styles.message}>
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
          <div className={styles.messageTime}>{props.time}</div>
        </div>
      </div> */}
      <div className={styles.messageContainer}>
        <div className={styles.imageContainer}>
          <img
            src={props.imageURL || defaultImage}
            className={styles.profileImg}
            alt=""
          />
          <div className={styles.usernameLine}>{props.username}</div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.subject}>
            <div className={styles.subjectLine}>{props.subject}</div>
            <div className={styles.timestamp}>{formatDate(props.time)}</div>
          </div>
          <div className={styles.body}>
            <div className={styles.bodyLine}>{props.content}</div>
          </div>
        </div>
      </div>
    </>
  );
};
