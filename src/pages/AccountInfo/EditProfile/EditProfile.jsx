import React, { useEffect, useState } from "react";
import styles from "./EditProfile.module.css";
import { useAxios } from "../../../utils/useAxios";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseURL } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

export const EditProfile = () => {
  const location = useLocation();
  const api = useAxios();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState();
  const [userImage, setUserImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    const response = await api.get(`${location.state.url}`);
    console.log(response);
    setProfileData(response.data);

    const url = response.data.profileImage;
    const fileName = url.split("/").pop();

    const imageFile = await fetchImageAsFile(url, fileName);
    console.log("user's image ", imageFile);
    setUserImage(imageFile);
  };

  const fetchImageAsFile = async (url, fileName) => {
    const response = await api.get(url, { responseType: `blob` });
    const responseBlob = response.data;
    return new File([responseBlob], fileName, { type: responseBlob.type });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [bio, setBio] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [socialGithub, setSocialGithub] = useState("");
  const [SocialHashnode, setSocialHashnode] = useState("");
  const [socialTwitter, setSocialTwitter] = useState("");
  const [socialYoutube, setSocialYoutube] = useState("");
  const [socialWebsite, setSocialWebsite] = useState("");

  const updateProfile = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("name", profileData.name);
    formData.append("email", profileData.email);
    formData.append("username", profileData.username);
    formData.append("location", profileData.location);
    formData.append("bio", profileData.bio);
    formData.append("shortIntro", profileData.shortIntro);
    formData.append("socialGithub", profileData.socialGithub);
    formData.append("SocialHashnode", profileData.SocialHashnode);
    formData.append("socialTwitter", profileData.socialTwitter);
    formData.append("socialYoutube", profileData.socialYoutube);
    formData.append("socialWebsite", profileData.socialWebsite);

    const imageData = new FormData();
    imageData.append("image", selectedFile);

    if (selectedFile == null) {
      formData.append("profileImage", userImage);
      imageData.append("image", userImage);
    } else {
      formData.append("profileImage", selectedFile);
      imageData.append("image", selectedFile);
    }

    console.log(formData);
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    for (const value of formData.values()) {
      console.log("value ", value);
    }

    for (const value of imageData.values()) {
      console.log("value ", value);
    }
    const responseNSFW = await api.post(
      `${baseURL}project-api/image/mod/`,
      imageData
    );
    console.log(responseNSFW);

    if (responseNSFW.data.prediction != "image is nsfw") {
      const profileUrl = location.state.url;
      const response = await api.post(`${profileUrl}update/`, formData);
      console.log(response);
      navigate(`/account/`);
    } else {
      // alert("No NSFW images allowed")
      setLoading(false);
      toast.error("No NSFW images allowed");
    }

    // const profileUrl = location.state.url;
    // const response = await api.post(`${profileUrl}update/`, formData);
    // console.log(response);
    // navigate(`/account/`);
  };

  // if (!loading){
  //   return(
  //     <BounceLoader loading={loading} color='#eb7724' size={70} style={{zIndex: '100000000000', position: 'absolute', top: '50%', left: '50%' }} />
  //   )
  // }

  return (
    <>
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          action="#"
          method=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <p className={styles.formTitle}>Edit Profile</p>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Name"
            onChange={(e) => {
              setProfileData({ ...profileData, name: e.target.value });
            }}
            value={profileData?.name === "null" ? null : profileData?.name}
          />
          <input
            type="email"
            className={styles.inputField}
            placeholder="Email"
            onChange={(e) => {
              setProfileData({ ...profileData, email: e.target.value });
            }}
            value={profileData?.email === "null" ? null : profileData?.email}
          />
          <input
            type="text"
            className={styles.inputField}
            placeholder="Username"
            onChange={(e) => {
              setProfileData({ ...profileData, username: e.target.value });
            }}
            value={
              profileData?.username === "null" ? null : profileData?.username
            }
          />
          <input
            type="text"
            className={styles.inputField}
            placeholder="Location"
            onChange={(e) => {
              setProfileData({ ...profileData, location: e.target.value });
            }}
            value={
              profileData?.location === "null" ? null : profileData?.location
            }
          />
          <textarea
            className={styles.bio}
            name="Bio"
            id=""
            cols="30"
            rows="10"
            placeholder="Bio"
            onChange={(e) => {
              setProfileData({ ...profileData, bio: e.target.value });
            }}
            value={profileData?.bio === "null" ? null : profileData?.bio}
          ></textarea>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Short Intro"
            onChange={(e) => {
              setProfileData({ ...profileData, shortIntro: e.target.value });
            }}
            value={
              profileData?.shortIntro === "null"
                ? null
                : profileData?.shortIntro
            }
          />
          <div className={styles.upload_container}>
            <label>Profile Image</label>
            <input
              type="file"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setSelectedFile(e.target.files[0]);
              }}
            />
          </div>
          <input
            type="url"
            className={styles.inputField}
            placeholder="Github Profile"
            onChange={(e) => {
              setProfileData({ ...profileData, socialGithub: e.target.value });
            }}
            value={
              profileData?.socialGithub === "null"
                ? null
                : profileData?.socialGithub
            }
          />
          <input
            type="url"
            className={styles.inputField}
            placeholder="Hashnode Profile"
            onChange={(e) => {
              setProfileData({
                ...profileData,
                SocialHashnode: e.target.value,
              });
            }}
            value={
              profileData?.SocialHashnode === "null"
                ? null
                : profileData?.SocialHashnode
            }
          />
          <input
            type="url"
            className={styles.inputField}
            placeholder="Twitter Profile"
            onChange={(e) => {
              setProfileData({ ...profileData, socialTwitter: e.target.value });
            }}
            value={
              profileData?.socialTwitter === "null" ? null : profileData?.social
            }
          />
          <input
            type="url"
            className={styles.inputField}
            placeholder="Youtube Page"
            onChange={(e) => {
              setProfileData({ ...profileData, socialYoutube: e.target.value });
            }}
            value={
              profileData?.socialYoutube === "null"
                ? null
                : profileData?.socialYoutube
            }
          />
          <input
            type="text"
            className={styles.inputField}
            placeholder="Portfolio Website"
            onChange={(e) => {
              setProfileData({ ...profileData, socialWebsite: e.target.value });
            }}
            value={
              profileData?.socialWebsite === "null"
                ? null
                : profileData?.socialWebsite
            }
          />
          <br />
          <input
            type="submit"
            className={styles.submitButton}
            onClick={updateProfile}
          />
        </form>
      </div>
      <Toaster />
    </>
  );
};
