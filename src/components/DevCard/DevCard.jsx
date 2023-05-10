import React, { useState } from 'react'
import styles from './DevCard.module.css';
import { Link } from 'react-router-dom';
import {FaLinkedinIn} from 'react-icons/fa'
import {SiGmail} from 'react-icons/si'
import {GoMarkGithub} from 'react-icons/go'
import {FiUser} from 'react-icons/fi'
import Banner from '../../assets/banner4.jpg'
import Dp from '../../assets/nalla.jpg'
import defaultImage from '../../assets/default-image.svg'

export const DevCard = (props) => {
    

  return (
    <>
        <div className={styles.card}>
            <div className={styles.banner}>
                {/* <img src={Banner} className={styles.bannerImg} alt="" /> */}
            </div>
            <div className={styles.photo}>
                <img src={props.image || defaultImage} className={styles.profileImg} alt="" />
                <div className={styles.defaultImage}></div>
                
            </div>
            
            <div className={styles.profileInfo}>
                <li className={styles.profileName}><i>{props.name}</i></li>
                <li className={styles.profilePosition}>{props.position}</li>
            </div>
            <p className={styles.profileBio}>{props.bio}</p>
            {/* <button className={styles.contact} >PROFILE</button> */}

            <div className={styles.bottom}>
            <div className={styles.skillSection}>
                <button className={styles.skillBtn} style={props.skill1 ? {backgroundColor: '#5670d7'} : {display: 'none'}}>{props.skill1}</button>
                <button className={styles.skillBtn} style={props.skill2 ? {backgroundColor: '#5670d7'} : {display: 'none'}}>{props.skill2}</button>
                <button className={styles.skillBtn} style={props.skill3 ? {backgroundColor: '#5670d7'} : {display: 'none'}}>{props.skill3}</button>
                <button className={styles.skillBtn} style={props.skill4 ? {backgroundColor: '#5670d7'} : {display: 'none'}}>{props.skill4}</button>
                <button className={styles.skillBtn} style={props.skill5 ? {backgroundColor: '#5670d7'} : {display: 'none'}}>{props.skill5}</button>
            </div>
            <div className={styles.socialLinks}>
                <Link to="#" className={styles.link}><FaLinkedinIn size={23} /></Link>
                <Link to="#" className={styles.link}><SiGmail size={23} /></Link>
                <Link to="#" className={styles.link}><GoMarkGithub size={23} /></Link>
            </div>
            </div>

           
        </div>
    </>
  )
}
