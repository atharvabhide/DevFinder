import React from 'react'
import styles from './IndividualProject.module.css'
import { Link } from 'react-router-dom'
import ProjectImage from '../../../assets/banner5.jpg'

export const IndividualProject = (props) => {
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
                    <img src={ProjectImage} className={styles.projectImage} alt="" />
                    <hr />
                    <p className={styles.projectTitle}><b>PortFolio Project</b></p>
                    <p className={styles.projectDeveloper}><i>By wolfmartel</i></p><br />
                    <p className={styles.aboutProject}><b>ABOUT THE PROJECT</b></p>
                    <p className={styles.aboutInfo}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium esse iure ullam omnis beatae quaerat itaque eaque architecto, cupiditate consequatur voluptatibus animi nemo eligendi pariatur, inventore quo reiciendis tempora cumque laboriosam. Deleniti ad iusto impedit ullam doloremque numquam voluptatem et nesciunt? Voluptatum provident perspiciatis fuga maiores autem ullam cupiditate aliquam odio exercitationem? Cumque delectus qui ipsam quod numquam ipsum minus provident natus? Consequatur commodi veritatis quisquam excepturi maxime architecto eveniet officia tempore officiis, dolores doloremque ea. Animi id enim, nisi accusamus incidunt natus saepe harum doloribus, ut aut molestias? Repellat, harum! Recusandae fugit tempore praesentium qui at, iusto officiis debitis?</p>

                    <hr />
                    <p className={styles.feedback}><b>Feedback</b></p>
                    <p className={styles.feedbackInfo}>78% Positive Feedback (80 votes)</p>

                    <textarea className={styles.commentSection} id=""></textarea>

                    <button className={styles.commentBtn}>Comment</button>

                </div>

            </div>

        </div>
    </>
  )
}
