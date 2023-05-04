import React, { useEffect, useState } from 'react'
import styles from './EditProfile.module.css'
import { useAxios } from '../../../utils/useAxios';

export const EditProfile = () => {

  const [selectedFile, setSelectedFile] = useState();
  const [imageData, setImageData] = useState();

  const api = useAxios();

  const handlePic = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log(formData);
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    for (const value of formData.values()) {
      console.log("value ", value);
    }
    setImageData(formData);
  }

  // useEffect(() => {
  //   handlePic();
  // }, [selectedFile])
  
  const testData = {
    "name": "Testing",
    "email": "testingbro@gmail.com",
    "username": "Testerbro",
    "location": "Your mom's house",
    "bio": "I dont really like biology",
    "profileImage": imageData,
    "socialGithub": "https://github.com/Aryan-Sawale",
    "socialLinkedIn": "https://github.com/Aryan-Sawale",
    "socialTwitter": "https://github.com/Aryan-Sawale",
    "socialYoutube": "https://github.com/Aryan-Sawale",
    "socialWebsite": "https://github.com/Aryan-Sawale",
    "skills": [],
  }

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    formData.append("name", "Testing");
    formData.append("email", "testingbro@gmail.com");
    formData.append("username", "Testerbro");
    formData.append("location", "Your mom's house");
    formData.append("bio", "I dont really like biology");
    formData.append("socialGithub", "https://github.com/Aryan-Sawale");
    formData.append("socialLinkedIn", "https://github.com/Aryan-Sawale");
    formData.append("socialTwitter", "https://github.com/Aryan-Sawale");
    formData.append("socialYoutube", "https://github.com/Aryan-Sawale");
    formData.append("socialWebsite", "https://github.com/Aryan-Sawale");
    // formData.append("skills", []);

    console.log(formData);
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    for (const value of formData.values()) {
      console.log("value ", value);
    }
    // const testData = {
    //   "name": "Testing",
    //   "email": "testingbro@gmail.com",
    //   "username": "Testerbro",
    //   "location": "Your mom's house",
    //   "bio": "I dont really like biology",
    //   "profileImage": formData,
    //   "socialGithub": "https://github.com/Aryan-Sawale",
    //   "socialLinkedIn": "https://github.com/Aryan-Sawale",
    //   "socialTwitter": "https://github.com/Aryan-Sawale",
    //   "socialYoutube": "https://github.com/Aryan-Sawale",
    //   "socialWebsite": "https://github.com/Aryan-Sawale",
    //   "skills": [],
    // }
    const response = await api.post("http://127.0.0.1:8000/user-api/profiles/c48554e6-f19b-4fb5-900c-2afe6573323f/update/", formData);
    console.log(response);
  }

  return (
    <div className={styles.wrapper}>
        <form className={styles.form} action="#" method='' onSubmit={(e) => {e.preventDefault();}}>
            <p className={styles.formTitle}>Edit Profile</p>
            <input type="text" className={styles.inputField} placeholder='Name' />
            <input type="email" className={styles.inputField} placeholder='Email' />
            <input type="text" className={styles.inputField} placeholder='Username' />
            <input type="text" className={styles.inputField} placeholder='Location' />
            <textarea className={styles.bio} name="Bio" id="" cols="30" rows="10" placeholder='Bio'></textarea>
            <input type="text" className={styles.inputField} placeholder='Short Intro'  />
            <input type="file" onChange={(e) => {console.log(e.target.files[0]); setSelectedFile(e.target.files[0]);} }/> 
            <input type="url" className={styles.inputField} placeholder='Github Profile'  />
            <input type="url" className={styles.inputField} placeholder='LinkedIn Profile'  />
            <input type="url" className={styles.inputField} placeholder='Twitter Profile'  />
            <input type="url" className={styles.inputField} placeholder='Youtube Page'  />
            <input type="url" className={styles.inputField} placeholder='Portfolio'  /><br />
            <input type="submit" className={styles.submitButton} onClick={updateProfile}/>


        </form>
    </div>
  )
}
