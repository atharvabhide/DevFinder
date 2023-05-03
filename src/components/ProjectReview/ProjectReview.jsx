import React from 'react'
import styles from './ProjectReview.module.css'
import Profile from '../../assets/dhanya2.jpg'
import {ImQuotesLeft} from 'react-icons/im'
import {ImQuotesRight} from 'react-icons/im'
import { FiUser } from 'react-icons/fi'

export const ProjectReview = (props) => {
  return (
    <>
            <div className={styles.review}>
                
                <img src={props.image} className={styles.userImage} alt="" />
                
               
                <div>
                    <p><i>{props.username}</i></p>
                    <ImQuotesLeft />
                    <p className={styles.comment}>{props.comment}</p>

                    <ImQuotesRight className={styles.rightQuotes} />

                </div>
            </div>
        <hr />
    </>
  )
}
