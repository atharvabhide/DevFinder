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
    
    </>
  )
}
