import React, { useEffect } from 'react'
import styles from './AccountInfo.module.css'
import ProfileImage from '../../assets/nalla.jpg'
import { TiLocation } from 'react-icons/ti'
import { ShortProjectCard } from '../Developers/IndividualDeveloper/IndividualDeveloper'
import ProjectImage from '../../assets/banner2.jpg'
import { useState, useContext } from 'react'
import { useAxios } from '../../utils/useAxios';
import { AuthContext } from '../../context/AuthContext';
import { ProjectLongCard } from '../../components/ProjectLongCard/ProjectLongCard'
import { Link } from 'react-router-dom'
import Image from '../../assets/banner2.jpg'

export const AccountInfo = (props) => {
    
    const [profile, setProfile] = useState([]);
    const [project, setProject] = useState([]);
    const api = useAxios();

    const fetchProfile = async () => {
      const response = await api.get("/user-api/current-user/");
      // console.log(response);
      const userPK = response.data.uuid;
      const profileResponse = await api.get(`/user-api/profiles/${userPK}/`)
      console.log(profileResponse);
      console.log(profileResponse.data);
      setProfile(profileResponse.data);

      // projects
      const projectsResponse = await api.get(`/user-api/profiles/${userPK}/projects/`)
      console.log(projectsResponse);
    }

    const fetchProjects = async() => {
      const projectResponse = await api.get("/project-api/projects/");
      setProject(projectResponse.data);
    }

    useEffect(() => {
      fetchProfile();
      fetchProjects
    }, [])


    const [isEditing, setIsEditing] = useState(false);
    const [about, setAbout] = useState(props.about);
    const [skills, setSkills] = useState(props.skills);
    const [newSkill, setNewSkill] = useState({ name: '', description: '' });
    const [isAddingSkill, setIsAddingSkill] = useState(false);

    function handleEdit() {
        setIsEditing(true);
      }
    
      function handleSave() {
        // Make API call to save changes to backend

        setIsEditing(false);
      }
    
      function handleCancel() {
        setIsEditing(false);
        setAbout(props.about); // Reset to original about text
      }
    
      function handleAboutChange(event) {
        setAbout(event.target.value);
      }

      function handleAddSkill() {
        setIsAddingSkill(true);
      }
    
      function handleSaveSkill() {
        // setSkills([...skills, newSkill]);
        setIsAddingSkill(false);
        setNewSkill({ name: '', description: '' });
      }
    
      function handleCancelSkill() {
        setIsAddingSkill(false);
        setNewSkill({ name: '', description: '' });
      }

      function handleNewSkillNameChange(event) {
        setNewSkill({ ...newSkill, name: event.target.value });
      }
    
      function handleNewSkillDescriptionChange(event) {
        setNewSkill({ ...newSkill, description: event.target.value });
      }

  return (
    <div className={styles.wrapper}>
          <div className={styles.developer}>
            <div className={styles.developerProfile}>
              <div className={styles.developerCard}>
                <div>
                <img src={ProfileImage} className={styles.developerImage} alt="" />
                </div>
                <div>
                <p className={styles.developerName}><b>username</b></p>
                <p className={styles.developerPosition}>Backend engineer</p>
                
                <p className={styles.developerLocation}><TiLocation size={22} />: Pune</p>

                <Link to={"/account/edit"} state={{url: profile.url}}>
                  <button className={styles.editBtn}>Edit Profile</button>
                </Link>
                </div>

              </div>

            </div>
            <div className={styles.developerInfo}>
              <div className={styles.about}>
                <h2><b>ABOUT ME</b></h2>
                
                
              </div><hr />
              <div className={styles.skillSection}>
                <h2>SKILLS</h2>
                

                



              </div><hr />
              <h2>OTHER SKILLS</h2><br />
              <div className={styles.otherSkills}>
                <button className={styles.otherSkillsBtn}>Communication</button>
                <button className={styles.otherSkillsBtn}>Leadership</button>
                <button className={styles.otherSkillsBtn}>Communication</button>
                <button className={styles.otherSkillsBtn}>Communication</button>

              </div><hr />
                <h2>PROJECTS</h2>
              <div className={styles.projectSection}>
                  <ProjectLongCard
                    title="Project1"
                    owner="abcxyz" 
                    about="ahhhhhhhhh"
                    image={Image}
                  />
                  <ProjectLongCard
                    title="Project1"
                    owner="abcxyz" 
                    about="ahhhhhhhhh"
                    image={Image}
                  />
                  <ProjectLongCard
                    title="Project1"
                    owner="abcxyz" 
                    about="ahhhhhhhhh"
                    image={Image}
                  />
                  <ProjectLongCard
                    title="Project1"
                    owner="abcxyz" 
                    about="ahhhhhhhhh"
                    image={Image}
                  />
                
              </div>


              </div>

            </div>

          </div>
  )
}
