import React, { useState } from 'react'
import styles from './ProjectForm.module.css'
import { useAxios } from "../../utils/useAxios"
import { baseURL } from '../../utils/config'

export const ProjectForm = () => {

  const api = useAxios();

  const dummyData = {
    title: "Title of my asdasdlife",
    description: "This is some descriptionnnnnn",
    demoLink: "https://github.com/atharvabhide/DevFinder/tree/dev/backend",
    sourceLink: "https://github.com/atharvabhide/DevFinder/tree/dev/backend",
  }

  const [selectedFile, setSelectedFile] = useState(null); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [sourceLink, setSourceLink] = useState("");

  const addProject = async () => {
    const formData = new FormData();

    formData.append("title", dummyData.title);
    formData.append("description", dummyData.description);
    formData.append("demoLink", dummyData.demoLink);
    formData.append("sourceLink", dummyData.sourceLink);
    formData.append("featuredImage", selectedFile);

    const response = await api.post(`${baseURL}project-api/projects/create/`, formData);
    console.log(response);
  }

  return (
    <>
        <div className={styles.wrapper}>
        <form className={styles.form} action="" onSubmit={(e) => {e.preventDefault();}}>
            <p className={styles.formTitle}>Add Project</p>
            <input type="text" className={styles.inputField} placeholder='Title' onChange={(e) => {setTitle(e.target.value)}} />
            <textarea className={styles.bio} name="Bio" id="" cols="30" rows="10" placeholder='About' onChange={(e) => {setDescription(e.target.value)}} ></textarea>
            
            <div className={styles.uploadContainer}>
              <label>Project Image</label>
              <input type="file" onChange={(e) => {console.log(e.target.files[0]); setSelectedFile(e.target.files[0]);}}/> 
            </div>
            <input type="url" className={styles.inputField} placeholder='Demo Link' onChange={(e) => {setDemoLink(e.target.value)}} />
            <input type="url" className={styles.inputField} placeholder='Source Code' onChange={(e) => {setSourceLink(e.target.value)}}  /><br />
            <input type="submit" className={styles.submitButton} value="Submit" onClick={addProject}   />
            


        </form>
    </div>
    </>
  )
}
