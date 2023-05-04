import React, { useEffect, useState } from 'react'
import styles from './EditProfile.module.css'
import { useAxios } from '../../../utils/useAxios';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const EditProfile = () => {

  const [selectedFile, setSelectedFile] = useState(); 

  const location = useLocation();
  console.log(location);

  const api = useAxios();

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

    const imageData = new FormData();
    imageData.append("image", selectedFile);
    for (const value of imageData.values()) {
      console.log("value ", value);
    }
    const responseNSFW = await api.post("http://localhost:8000/project-api/image/mod/", imageData);
    console.log(responseNSFW);

    if (responseNSFW.data.prediction != "image is nsfw")
    {
      const profileUrl = location.state.url;
      const response = await api.post(`${profileUrl}update/`, formData);
      console.log(response);
    }
    else {
      alert("No NSFW images allowed")
    }
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
            <div className={styles.upload_container}>
              <label>Profile Image</label>
              <input type="file" onChange={(e) => {console.log(e.target.files[0]); setSelectedFile(e.target.files[0]);} }/> 
            </div>
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
