import React from 'react'
import styles from './ProjectCard.module.css'
import Banner from '../../assets/banner2.jpg'

export const ProjectCard = (props) => {
  return (
    <>
        <div className={styles.card}>
            <div className={styles.banner}>
                <img className={styles.projectImage} src={props.image} alt="" />
            </div>
            <ul>
                <li className={styles.projectTitle}><b>{props.projectName}</b></li>
                <li className={styles.projectDeveloper}>by <i>{props.projectDeveloper}</i></li>
                {/* <li className={styles.projectFeedback}>{props.projectFeedback}% Positive Feedback({props.voteCount} votes)</li> */}
            </ul>
            <div className={styles.bottom}>
            <div className={styles.toolSection}>
                <button className={styles.toolBtn} style={props.tool1 ? {backgroundColor: '#5670d7'} : {display: 'none'}}>{props.tool1}</button>
                <button className={styles.toolBtn} style={props.tool2 ? {backgroundColor: '#5670d7'} : {display: 'none'}}>{props.tool2}</button>
                <button className={styles.toolBtn} style={props.tool3 ? {backgroundColor: '#5670d7'} : {display: 'none'}}>{props.tool3}</button>
                <button className={styles.toolBtn} style={props.tool4 ? {backgroundColor: '#5670d7'} : {display: 'none'}}>{props.tool4}</button>
            </div>
            </div>
        </div>
    </>
  )
}
