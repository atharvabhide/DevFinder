import React, { useContext } from 'react'
import styles from './IndividualDeveloper.module.css'
import {ProjectCard} from '../../../components/ProjectCard/ProjectCard'
// import {ShortProjectCard} from '../IndividualDeveloper/ShortProjectCard'
import ProjectImage from '../../../assets/banner5.jpg'
import ProfileImage from '../../../assets/nalla.jpg'
import {TiLocation} from 'react-icons/ti'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAxios } from '../../../utils/useAxios'
import { useLocation } from 'react-router-dom'

export const IndividualDeveloper = () => {

  const [profile, setProfile] = useState();
  const api = useAxios();

  const location = useLocation();

  const fetchProfile = async () => {
    console.log(location);
    const profileUrl = location.state.url;
    const response = await api.get(profileUrl);
    console.log(response.data);
    setProfile(response.data)

    // console.log(`${profileUrl}messages/`);
    // const messageData = await api.get(`${profileUrl}messages/`);
    // console.log(messageData);
  }
  
  useEffect(() => {
    fetchProfile();
  }, [])
  
  const messageTest = {
    "bruh": "okay"
  }
  const sendMessage = async () => {
    console.log("TODO");
    const profileUrl = location.state.url;
    const messageData = await api.get(`${profileUrl}messages/`);
    console.log("message data ", messageData);
  }

  useEffect(() => {
    sendMessage();
  }, [])

  return (
    <>
        <div className={styles.wrapper}>
          <div className={styles.developer}>
            <div className={styles.developerProfile}>
              <div className={styles.developerCard}>
                <div>
                <img src={ProfileImage} className={styles.developerImage} alt="" />
                </div>
                <div>
                <p className={styles.developerName}><b>{profile?.username}</b></p>
                <p className={styles.developerPosition}>Backend engineer</p>
                
                <p className={styles.developerLocation}><TiLocation size={22} />: Pune</p>

                <button className={styles.sendBtn}>Send Message</button>
                </div>

              </div>

            </div>
            <div className={styles.developerInfo}>
              <div className={styles.about}>
                <h2><b>ABOUT ME</b></h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque totam cumque eum quod doloribus obcaecati corporis illo excepturi a rerum, accusantium temporibus. Mollitia, sequi. Expedita, veniam dolorem voluptatum iusto repellendus voluptatem recusandae ab quidem ipsum eaque provident consequuntur consequatur officiis laborum a minima facilis alias sunt quasi commodi dignissimos voluptatibus eos sapiente fugiat. Error, ea iste quo animi, laborum saepe quod consectetur et odio totam eos ducimus incidunt commodi id!</p>
              </div><hr />
              <div className={styles.skillSection}>
                <h2>SKILLS</h2>
                <div className={styles.skill}>
                  <p className={styles.skillName}>Django</p>
                  <p className={styles.skillInfo}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit maxime magni numquam enim aut dolorum ducimus, mollitia, molestias impedit obcaecati totam veritatis aliquid ut illo amet fuga pariatur, quidem harum!</p>

                </div>
                <div className={styles.skill}>
                  <p className={styles.skillName}>Django</p>
                  <p className={styles.skillInfo}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit maxime magni numquam enim aut dolorum ducimus, mollitia, molestias impedit obcaecati totam veritatis aliquid ut illo amet fuga pariatur, quidem harum!</p>

                </div>
                <div className={styles.skill}>
                  <p className={styles.skillName}>Django</p>
                  <p className={styles.skillInfo}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit maxime magni numquam enim aut dolorum ducimus, mollitia, molestias impedit obcaecati totam veritatis aliquid ut illo amet fuga pariatur, quidem harum!</p>

                </div>


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
              <ShortProjectCard
                image={ProjectImage}
                projectName="Portfolio"
                projectDeveloper="wolfmartel"
                projectFeedback="78%"
                voteCount="80" 
              />
              <ShortProjectCard
                image={ProjectImage}
                projectName="Portfolio"
                projectDeveloper="wolfmartel"
                projectFeedback="78%"
                voteCount="80" 
              />
                <ShortProjectCard
                  image={ProjectImage}
                  projectName="Portfolio"
                  projectDeveloper="wolfmartel"
                  projectFeedback="78%"
                  voteCount="80" 
                />
                
              </div>


              </div>

            </div>

          </div>

        
    </>
  )
}

export const ShortProjectCard = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.banner}>
        <img className={styles.projectImage} src={props.image} alt="" />
      </div>
      <ul className={styles.projectInfo}>
        <li className={styles.projectTitle}><b>{props.projectName}</b></li>
        <li className={styles.projectDeveloper}>by {props.projectDeveloper}</li>
        <li className={styles.projectFeedback}>{props.projectFeedback} Positive Feedback({props.voteCount} votes)</li>
      </ul>
            
    </div>
  )
}

