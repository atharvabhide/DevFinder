import React from 'react'
import styles from './Projects.module.css'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'

export const Projects = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>

        </div>
        <div className={styles.projects}>

          <ProjectCard
            projectName="Portfolio"
            projectDeveloper="wolfmartel"
            projectFeedback="78%"
            voteCount="80"
            
            tool1="React"
            tool2="MongoDB"
            tool3="Node.js"
            tool4="Express.js"
          />
          <ProjectCard
            projectName="Portfolio"
            projectDeveloper="wolfmartel"
            projectFeedback="78%"
            voteCount="80"
            
            tool1="React"
            tool2="MongoDB"
            tool3="Node.js"
            tool4="Express.js"
          />
          <ProjectCard
            projectName="Portfolio"
            projectDeveloper="wolfmartel"
            projectFeedback="78%"
            voteCount="80"
            
            tool1="React"
            tool2="MongoDB"
            tool3="Node.js"
            tool4="Express.js"
          />
        </div>
      </div>
    </>
  )
}
