import React, { useEffect, useState } from 'react'
import styles from './EditProfile.module.css'
import { useAxios } from '../../../utils/useAxios';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { baseURL } from '../../../utils/config';

export const EditProfile = () => { 

  const location = useLocation();
  console.log(location);

  const api = useAxios();

  const [selectedFile, setSelectedFile] = useState(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [bio, setBio] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [socialGithub, setSocialGithub] = useState("");
  const [socialLinkedIn, setSocialLinkedIn] = useState("");
  const [socialTwitter, setSocialTwitter] = useState("");
  const [socialYoutube, setSocialYoutube] = useState("");
  const [socialWebsite, setSocialWebsite] = useState("");

  const updateProfile = async () => {
    const formData = new FormData();
    // formData.append("profileImage", selectedFile);
    // formData.append("name", "Testing");
    // formData.append("email", "testingbro@gmail.com");
    // formData.append("username", "Testerbro");
    // formData.append("location", "Your mom's house");
    // formData.append("bio", "I dont really like biology");
    // formData.append("shortIntro", "I am a rizz developer");
    // formData.append("socialGithub", "https://github.com/Aryan-Sawale");
    // formData.append("socialLinkedIn", "https://github.com/Aryan-Sawale");
    // formData.append("socialTwitter", "https://github.com/Aryan-Sawale");
    // formData.append("socialYoutube", "https://github.com/Aryan-Sawale");
    // formData.append("socialWebsite", "https://github.com/Aryan-Sawale");
    
    formData.append("profileImage", selectedFile);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("location", userLocation);
    formData.append("bio", bio);
    formData.append("shortIntro", shortIntro);
    formData.append("socialGithub", socialGithub);
    formData.append("socialLinkedIn", socialLinkedIn);
    formData.append("socialTwitter", socialTwitter);
    formData.append("socialYoutube", socialYoutube);
    formData.append("socialWebsite", socialWebsite);

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
    const responseNSFW = await api.post(`${baseURL}project-api/image/mod/`, imageData);
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
            <input type="text" className={styles.inputField} placeholder='Name' onChange={(e) => {setName(e.target.value)}} />
            <input type="email" className={styles.inputField} placeholder='Email' onChange={(e) => {setEmail(e.target.value)}} />
            <input type="text" className={styles.inputField} placeholder='Username' onChange={(e) => {setUsername(e.target.value)}} />
            <input type="text" className={styles.inputField} placeholder='Location' onChange={(e) => {setUserLocation(e.target.value)}} />
            <textarea className={styles.bio} name="Bio" id="" cols="30" rows="10" placeholder='Bio' onChange={(e) => {setBio(e.target.value)}} ></textarea>
            <input type="text" className={styles.inputField} placeholder='Short Intro' onChange={(e) => {setShortIntro(e.target.value)}} />
            <div className={styles.upload_container}>
              <label>Profile Image</label>
              <input type="file" onChange={(e) => {console.log(e.target.files[0]); setSelectedFile(e.target.files[0]);} }/> 
            </div>
            <input type="url" className={styles.inputField} placeholder='Github Profile' onChange={(e) => {setSocialGithub(e.target.value)}} />
            <input type="url" className={styles.inputField} placeholder='LinkedIn Profile' onChange={(e) => {setSocialLinkedIn(e.target.value)}} />
            <input type="url" className={styles.inputField} placeholder='Twitter Profile' onChange={(e) => {setSocialTwitter(e.target.value)}} />
            <input type="url" className={styles.inputField} placeholder='Youtube Page' onChange={(e) => {setSocialYoutube(e.target.value)}} />
            <input type="url" className={styles.inputField} placeholder='Portfolio Website' onChange={(e) => {setSocialWebsite(e.target.value)}} /><br />
            <input type="submit" className={styles.submitButton} onClick={updateProfile} />


        </form>
    </div>
  )
}
