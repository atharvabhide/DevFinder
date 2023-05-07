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
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
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
            <form action="" className={styles.formContainer} onSubmit={(e) => {e.preventDefault();}}>
                <input className={styles.inputField} type="text"  placeholder='Title' /><br />
                {/* <textarea className={styles.bio} name="description" id="" cols="30" rows="10" placeholder='Description'></textarea> */}
                <input className={styles.inputField} type="text"  placeholder='Username' /><br />
                <input className={styles.inputField} type="file" placeholder='Hello' onChange={(e) => {console.log(e.target.files[0]); setSelectedFile(e.target.files[0]);}} /><br />
                <input className={styles.inputField} type="url" placeholder='Demo Link' /><br />
                <input className={styles.inputField} type="url"  placeholder='Source Code' />

                <div className={styles.tagSection}>

                

                </div>


                <input type="submit" value="Submit" onClick={addProject}></input>
                
                
            </form>
        </div>
    </>
  )
}
