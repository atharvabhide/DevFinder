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

export const AccountInfo = (props) => {
    
    const [profile, setProfile] = useState([]);
    const api = useAxios();

    const fetchProfile = async () => {
      const response = await api.get("/user-api/current-user/");
      // console.log(response);
      const userPK = response.data.uuid;
      const profileResponse = await api.get(`/user-api/profiles/${userPK}/`)
      // console.log(profileResponse);
      console.log(profileResponse.data);
      setProfile(profileResponse.data);
    }

    useEffect(() => {
      fetchProfile();
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

                <button className={styles.editBtn}>Edit Profile</button>
                </div>

              </div>

            </div>
            <div className={styles.developerInfo}>
              <div className={styles.about}>
                <h2><b>ABOUT ME</b></h2>
                {isEditing ? (
                <div>
                    <textarea value={about} onChange={handleAboutChange} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
                ) : (
                <div>
                <p>{about}</p>
                <button onClick={handleEdit}>Edit</button>
                </div>
                )}
                
              </div><hr />
              <div className={styles.skillSection}>
                <h2>SKILLS</h2>
                {skills && skills.length > 0 ? (
                    <ul>
                    {skills.map(skill => (
                        <li key={skill.name}>
                        <h3>{skill.name}</h3>
                        <p>{skill.description}</p>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p>No skills to display</p>
                )}

                {isAddingSkill ? (
                    <div>
                    <label>Name:</label>
                    <input type="text" value={newSkill.name} onChange={handleNewSkillNameChange} />
                    <label>Description:</label>
                    <textarea value={newSkill.description} onChange={handleNewSkillDescriptionChange} />
                    <button onClick={handleSaveSkill}>Save</button>
                    <button onClick={handleCancelSkill}>Cancel</button>
                    </div>
                ) : (
                    <div>
                    <p></p>
                    <button onClick={handleAddSkill}>Add Skill</button>
                    </div>
                )}



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
                  <ProjectLongCard />
                
              </div>


              </div>

            </div>

          </div>
  )
}
