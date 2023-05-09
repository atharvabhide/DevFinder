import React from 'react'
import styles from './ProjectLongCard.module.css'
import Image from "../../assets/banner2.jpg"
import {CgWebsite} from 'react-icons/cg'
import {GoMarkGithub} from 'react-icons/go'
import {MdEdit, MdDelete} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export const ProjectLongCard = (props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.projectCard}>
      <div className={styles.image}>
        <img src={props.image} className={styles.projectImage} alt="" />
      </div>
      <div className={styles.projectInfo}>
        <label>{props.title}</label><br />
        <label><i>by {props.owner}</i></label><br />
       <div className={styles.about}>{props.about}</div>


      </div>
      <div className={styles.links}>
        <Link to={props.demoLink}><CgWebsite className={styles.icon} size={20}  style={{margin: '4px'}} /></Link>
        <Link to={props.sourceLink}><GoMarkGithub className={styles.icon} size={20} style={{margin: '4px'}} /></Link>


      </div>
      <button className={styles.editButton} onClick={ () => navigate('/update-project', {state: {url: props.projectUrl}}) }><MdEdit size={16} /></button>
      <button className={styles.editButton2} onClick={() => props.deleteProject(props.projectUrl)} ><MdDelete size={16} /></button>

    </div>
  )
}

