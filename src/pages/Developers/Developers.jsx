import React from 'react'
import styles from './Developers.module.css'
import { DevCard } from '../../components/DevCard/DevCard'
import Atharva from '../../assets/nalla.jpg'
import Ak from '../../assets/ak.jpg'
import Dhanya from '../../assets/dhanya2.jpg'
import {Footer} from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
import { SearchBar } from '../../components/SearchBar/SearchBar'


export const Developers = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
            Idhar kuch toh header dalte searchbar ke sath
            <SearchBar />
        </div>  

        <div className={styles.developers}>
          <Link to="/developers/developer">
          <DevCard
          image={Atharva}
            name="Atharva Bhide"
            position="ML/Backend Developer"
            bio="The air was crisp and cool, with a hint of the upcoming autumn season. In the distance, a small stream meandered its way through the fields, glistening like a ribbon of silver in the morning light. It was a peaceful and idyllic scene, one that seemed to invite contemplation and reflection."
            skill1="Python" 
            skill2="MongoDB" 
            skill3="Tensorflow" 
            skill4="React" 
            skill5="Data Science" 
          />
          </Link>
          <Link to="/developers/developer">
          <DevCard
          image={Ak}
            name="Aakash Kasabekar"
            position="Frontend Developer"
            bio="The air was crisp and cool, with a hint of the upcoming autumn season. In the distance, a small stream meandered its way through the fields, glistening like a ribbon of silver in the morning light. It was a peaceful and idyllic scene, one that seemed to invite contemplation and reflection." 
          />
          </Link>
          <Link to="/developers/developer">
          <DevCard
          image={Dhanya}
            name="Dhananjay Deshmukh"
            position="ML/Backend Developer"
            bio="The air was crisp and cool, with a hint of the upcoming autumn season. In the distance, a small stream meandered its way through the fields, glistening like a ribbon of silver in the morning light. It was a peaceful and idyllic scene, one that seemed to invi
            te contemplation and reflection." 
          />
          </Link>
          <Link to="/developers/developer">
          <DevCard
          
            name="Atharva Bhide"
            position="ML/Backend Developer"
            bio="The air was crisp and cool, with a hint of the upcoming autumn season. In the distance, a small stream meandered its way through the fields, glistening like a ribbon of silver in the morning light. It was a peaceful and idyllic scene, one that seemed to invite contemplation and reflection." 
          />
          </Link>
        </div>
    </div>
    
    <Footer />

    </>
  )
}