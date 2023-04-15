import React from 'react'
import styles from './Projects.module.css'
import ProjectImage from '../../assets/banner2.jpg'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'

export const Projects = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
            Idhar kuch toh header dalte searchbar ke sath
            <SearchBar />
        </div>
        <div className={styles.projects}>

          <ProjectCard
            image={ProjectImage}
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
            image={ProjectImage}

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
            image={ProjectImage}
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
