import React from 'react'
import styles from './IndividualProject.module.css'
import { Link } from 'react-router-dom'
import ProjectImage from '../../../assets/banner5.jpg'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const IndividualProject = (props) => {

    const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  // Using Promises

  useEffect(() => {
    axios
    .get("http://127.0.0.1:8000/project-api/projects/e8074607-6a91-42c6-8e1a-c509333ab4ac/")
    .then(response => {
      const data = response.data;
    //   const project = data.results;
      setMyData(data);
    })
    .catch((error) => setIsError(error.message))
  }, [])
  console.log(myData);

  return (
    <>
        <div className={styles.wrapper}>
            <div className={styles.project}>
                <div className={styles.projectTools}>
                    <h1>Tools And Stacks</h1><br />
                    <div className={styles.toolSection}>
                        <button className={styles.toolBtn}>React</button>
                        <button className={styles.toolBtn}>React</button>
                        <button className={styles.toolBtn}>React</button>
                        <button className={styles.toolBtn}>React</button>
                    </div>
                    <div className={styles.projectLinks}>
                        <Link to="#">Demo Link</Link><br /><br />
                        <Link to="#">Source Code</Link>
                    </div>
                </div>
                <div className={styles.projectInfo}>
                    <img src={myData.featuredImage} className={styles.projectImage} alt="" />
                    <hr />
                    <p className={styles.projectTitle}><b>{myData.title}</b></p>
                    <p className={styles.projectDeveloper}><i>By wolfmartel</i></p><br />
                    <p className={styles.aboutProject}><b>ABOUT THE PROJECT</b></p>
                    <p className={styles.aboutInfo}>{myData.description}</p>
                    
                    <hr />
                    <p className={styles.feedback}><b>Feedback</b></p>
                    <p className={styles.feedbackInfo}>{props.feedbackCount} Positive Feedback (80 votes)</p>

                    <textarea className={styles.commentSection} id=""></textarea>

                    <button className={styles.commentBtn}>Comment</button>

                </div>

            </div>

        </div>
    </>
  )
}
