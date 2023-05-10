import React, { useEffect } from 'react'
import styles from './AccountInfo.module.css'
import ProfileImage from '../../assets/nalla.jpg'
import { TiLocation } from 'react-icons/ti'
import { ShortProjectCard } from '../Developers/IndividualDeveloper/IndividualDeveloper'
import ProjectImage from '../../assets/banner2.jpg'
import { useState, useContext } from 'react'
import { useAxios } from '../../utils/useAxios';
import { ProjectLongCard } from '../../components/ProjectLongCard/ProjectLongCard'
import { Link, useNavigate } from 'react-router-dom'
import Image from '../../assets/banner2.jpg'
import { AuthContext } from '../../context/AuthContext';
import {BsPlus} from 'react-icons/bs'
import { AddSkillModal } from '../../components/AddSkillModal/AddSkillModal'
import defaultImage from '../../assets/default-image.svg'
import {RxCrossCircled} from 'react-icons/rx'
import toast, { Toaster } from 'react-hot-toast';


export const AccountInfo = (props) => {
    
    const { currentUUID } = useContext(AuthContext);
    // console.log(currentUUID);

    const [profile, setProfile] = useState([]); 
    const [project, setProject] = useState([]);
    const [show, setShow] = useState(false);
    const [operatedSkill, setOperatedSkill] = useState(false);
    const [operatedProject, setOperatedProject] = useState(false);

    const api = useAxios();
    const navigate = useNavigate();

    const notifySuccess = () => {
      toast.success('Skill added successfully');
    }
    const notifyDeletion = () => {
      toast.error('Your project has been removed')
    }

    const fetchProfile = async () => {
      // const response = await api.get("/user-api/current-user/");
      // console.log(response);
      // const userPK = response.data.uuid;
      const profileResponse = await api.get(`/user-api/profiles/${currentUUID}/`)
      // console.log(profileResponse);
      console.log("profile data", profileResponse.data);
      setProfile(profileResponse.data);

      // projects
      const projectsResponse = await api.get(`/user-api/profiles/${currentUUID}/projects/`)
      console.log("projects", projectsResponse);
      setProject(projectsResponse.data)
    }

    // const fetchProjects = async() => {
    //   const projectResponse = await api.get("/project-api/projects/");
    //   setProject(projectResponse.data);
    // }

    useEffect(() => {
      fetchProfile();
      setOperatedProject(false);
    }, [operatedProject])

    const deleteProject = async (url) => {
      const response = await api.delete(`${url}delete/`);
      console.log(response);
      if (response.status === 204)
      {
        setOperatedProject(true);
      }
      toast.error('Your project has been removed')

    }

    const [skills, setSkills] = useState(props.skills);
    
    const fetchSkills = async () => {
      const response = await api.get(`/user-api/profiles/${currentUUID}/skills/`);
      console.log("skills", response);
      setSkills(response.data);
    }

    useEffect(() => {
      fetchSkills();
      setOperatedSkill(false);

    }, [operatedSkill])

    const [newSkill, setNewSkill] = useState("Test");

    const dummySkill = {
      name: newSkill,
    }

    const addSkill = async () => {
      const response = await api.post(`/user-api/profiles/${currentUUID}/skills/create/`, dummySkill);
      console.log(response);
      if (response.status === 201)
      {
        setOperatedSkill(true);
      }
    }

    const handleNavigate = () => {
      navigate('/account');
    }

    const deleteSkill = async (skillId) => {
      const response = await api.delete(`/user-api/profiles/${currentUUID}/skills/${skillId}/delete/`)
      console.log(response);
      if (response.status === 204)
      {
        setOperatedSkill(true);
      }
    }

  return (
    <>
    <div className={styles.wrapper}>
          <div className={styles.developer}>
            <div className={styles.developerProfile}>
              <div className={styles.developerCard}>
                <div>
                <img src={profile.profileImage || defaultImage} className={styles.developerImage} alt="" />
                </div>
                <div>
                <p className={styles.developerName}><b>{profile.username}</b></p>
                <p className={styles.developerPosition}>{profile.shortIntro}</p>
                
                <p className={styles.developerLocation}><TiLocation size={22} />: {profile.location}</p>

                <Link to={"/account/edit"} state={{url: profile.url}}>
                  <button className={styles.editBtn}>Edit Profile</button>
                </Link>
                </div>

              </div>

            </div>
            <div className={styles.developerInfo}>
              <div className={styles.about}>
                <h2><b>ABOUT ME</b></h2><br />
                {profile.bio}
                
                
              </div><hr />
              <div className={styles.skillSection}>
                <div style={{marginBottom: '1em'}} className={styles.skillHeader}>
                <h2 >SKILLS</h2>
                <button onClick={() =>  setShow(true)} className={styles.addSkill}><BsPlus size={22} /></button>
                <AddSkillModal onClose={()=> setShow(false)} onAdd={() => {addSkill(); setShow(false); notifySuccess();}} setNewSkill={setNewSkill} show={show} />
                
                </div>
                <div style={{display: 'flex', justifyContent: 'start', gap: '0.75em'}}>
                {skills?.map((skill) => (
                  <>
                    <button className={styles.skillsBtn}>{skill.name}</button>

                    <div className={styles.removeSkill} onClick={() => deleteSkill(skill.id)}><RxCrossCircled /></div>
                    <br />
                  </>
                ))} 
                </div> 

                



              </div><hr />
              
                <div className={styles.skillHeader}>
                <h2>PROJECTS</h2>
                <button onClick={()=>navigate('/add-project')} className={styles.addSkill}><BsPlus size={22} /></button>
                
                </div>
                <br />
                
              <div className={styles.projectSection}>
                  {/* <ProjectLongCard
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
                  /> */}

                {project?.map((proj) => (
                  <>
                    {/* <div>{proj.title}</div>
                    <div>{proj.owner}</div>
                    <div onClick={() => deleteProject(proj.url)}>Delete</div>
                    <Link to={`/update-project`} state={{url: proj.url}}><div>Update</div></Link>
                    <br /> */}
                    <ProjectLongCard
                      owner={proj.owner} 
                      title={proj.title}
                      image={proj.featuredImage}
                      projectUrl={proj.url}
                      deleteProject={deleteProject}
                      sourceLink={proj.sourceLink}
                      demoLink={proj.demoLink}
                    />
                  </>
                ))}
                
              </div>


              </div>

            </div>

          </div>
          <Toaster />
    </>
  )
}



