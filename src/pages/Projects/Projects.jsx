import React from 'react'
import styles from './Projects.module.css'
import ProjectImage from '../../assets/banner2.jpg'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { useNavigate } from 'react-router'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { Link } from 'react-router-dom'
import {Footer} from '../../components/Footer/Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'


export const Projects = () => {

  const navigate = useNavigate();
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  // Using Promises

  useEffect(() => {
    axios
    .get("http://127.0.0.1:8000/project-api/projects/?page=1")
    .then(response => {
      const data = response.data;
      const projects = data.results;
      setMyData(projects);
    })
    .catch((error) => setIsError(error.message))
  }, [])
  console.log(myData)


  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
            Idhar kuch toh header dalte searchbar ke sath
            <SearchBar />
        </div>
          <div className={styles.projects}>
          {myData.map((items) => (
            
            <Link to="/projects/project">
            <ProjectCard
              projectName={items.title}
              image={items.featuredImage}
            />
            </Link>
          ) )}
          </div>

           
          {/* <ProjectCard
            
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
          </Link>

          <Link to="/projects/project">
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
          </Link>

          <Link to="/projects/project">
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
          /> */}

          {/* <ProjectCard /> */}
          {/* </Link> */}
        
      </div>
      
      <Footer />
    </>
  )
}
