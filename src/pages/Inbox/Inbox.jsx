import React from 'react'
import styles from './Inbox.module.css'
import { InboxCard } from '../../components/InboxCard/InboxCard'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const Inbox = () => {

  const [myData, setMyData] = useState([]);

  useEffect(() => {
    axios
    .get("")
    .then(response => {
      const data = response.data;
      const projects = data.results;
      setMyData(projects);
    })
    .catch((error) => setIsError(error.message))
  }, [])
  console.log(myData)

  const [selectedFile, setSelectedFile] = useState();

  const checkNSFW = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log(formData);
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    for (const value of formData.values()) {
      console.log("value ", value);
    }
    try {
      const response = await axios.post("http://localhost:8000/project-api/image/mod/", formData);
      console.log(response);
    } catch (err) {
        // console.log("error: ", err);
    }
  }

  return (
    <>
    <div className={styles.wrapper}>
      
      <div className={styles.title}>
        New Messages
      </div><br />
      <div className={styles.messageList}>
      <InboxCard
        
      />


      

      </div>

    </div>
    <input type="file" onChange={(e) => {console.log(e.target.files[0]); setSelectedFile(e.target.files[0])}}/>
    <button onClick={checkNSFW}>
      Upload!
    </button>
    </>
  )
}
