import React, { useState } from 'react'
import styles from './Home.module.css'
import Hero from '../../assets/coding.gif'
import {FiChevronDown} from 'react-icons/fi'
import Background from '../../assets/bg-img.png' 
import { Link } from 'react-router-dom'
import Atharva from '../../assets/nalla.jpg'
import Ak from '../../assets/ak.jpg'
import Dhanya from '../../assets/dhanya2.jpg'
import Typed from 'react-typed'
import {FaFolder} from 'react-icons/fa'
import {VscCircleLargeFilled} from 'react-icons/vsc'

// import TerminalComponent from '../../components/Terminal/Terminal'


import { SpecialCard } from '../../components/SpecialCard/SpecialCard'
import { Layout } from '../../components/Layout/Layout'
import { Footer } from '../../components/Footer/Footer'

export const Home = () => {

  
  
  const [value, setValue] = useState("~/hello/welcome-to-devFinder/home ");
  const [value2, setValue2] = useState("main*")

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && value === '') {
      setValue(defaultText);
      setValue2(defaultText);
    }
  }
  
  return (
    <>
    
    <div className={styles.wrapper}>
      
      <div className={styles.heroPage}>
        <div className={styles.hero}>
          <div className={styles.header}>
            <h1>Empowering developers to {' '} <br />
                <Typed className={styles.typed} strings={['Network', 'Connect', 'Grow']} typeSpeed={120} backSpeed={140} loop /><br /> with our developer-focused social platform</h1>
            <br /><br />  
            <Link to='/login'><button className={styles.heroButton}>
            Get Started
            </button></Link>
          </div>
          {/* <img src={Hero} alt="" className={styles.heroGIF} /> */}
          <div className={styles.terminalContainer}>
              <div className={styles.terminalHeader}>
                <div className={styles.dots}>
                <VscCircleLargeFilled style={{color: '#fe5e61'}} />
                <VscCircleLargeFilled style={{color: '#fdba33', marginLeft: '4px'}} />
                <VscCircleLargeFilled style={{color: '#23cc45', marginLeft: '4px'}} />
                </div>
                
                <FaFolder className={styles.folderIcon} style={{color: 'blue'}} />
                <p className={styles.folderName}>~/hello/welcome-to-devFinder/home</p>
              </div>

            <div spellCheck="false" contentEditable onChange={handleChange} onKeyDown={handleKeyDown} className={styles.terminal}>
            <label style={{color: '#eb7724'}}>{value}</label>
            <label >{value2}</label>
            </div>
          </div>
          
          

        </div>
        <div className={styles.scroll}>
          <a href="#about"><FiChevronDown size='2rem' className={styles.scrollButton}  /></a>
          
          </div>
      </div>

      <div className={styles.about} id="about">
        {/* <img className={styles.aboutBackground} src={Background} alt="" /> */}
        
        <h1 className={styles.aboutHeader}>About DevFinder</h1>
        <p className={styles.aboutInfo}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae itaque consectetur, harum voluptate error inventore pariatur architecto tempore deserunt obcaecati tempora sit, nobis eum quos eligendi amet, exercitationem sint! Quam dicta ipsa exercitationem esse quas corrupti suscipit quisquam veniam assumenda aut provident maiores cupiditate iure quae possimus ab, omnis molestiae animi consequatur? Quasi quos amet facilis aliquid fuga sit quidem quam odio. Sapiente soluta possimus voluptas, impedit iusto laboriosam voluptateur, alias suscipit assumenda consectetur blanditiis voluptas quasi, ut ullam aut recusandae similique ea nisi debitis corporis asperiores. Ullam quidem suscipit quae blanditiis nostrum quaerat! Doloribus eveniet quasi animi minus neque praesentium nihil fuga ipsum, quo totam labore. Natus reiciendis autem maiores id provident recusandae ipsum animi quam illum officiis officia suscipit veniam eaque, odio aspernatur. Magni aliquid nam eos quis sapiente? Hic aspernatur ab iure consequuntur dolor iste enim, delectus debitis quas, saepe facere sint pariatur laborum ipsum magni repellat voluptatem quibusdam quos nihil deserunt facilis. Tempora corrupti deleniti quae beatae quibusdam officiis repellendus eius, itaque nostrum harum in minima illum consequuntur expedita quod accusamus cupiditate totam id enim! Dignissimos itaque debitis doloremque dolor deleniti quaerat numquam nisi asperiores, id odit quisquam iste.</p>
      </div>
        
      <h1 className={styles.contributers}>Project Maintainers</h1>
        <div className={styles.devProfiles}>
          
        <SpecialCard
          image = {Atharva}
          name="Atharva Bhide"
          position="ML/Backend Engineer"
          bio="Hello, I am Atharva Bhide and I am ML/Backend Engineer with interest in Computer Vision, NLP and time series analysis as well. My experience while developing DevFinder was full of excitement and challenges. Right from when we came up with the idea for building a social media for college developers, to building an MVP for it, the journey has been amazing! Looking forward to adding more and more features in the product and improving the user experience along with it!"
          skill1="Python"
          skill2="C++"
          skill3="Tensorflow"
          skill4="Django"
          skill5="SQL"

        />
        <SpecialCard
        image={Ak}
          name="Aakash Kasabekar"
          position="Frontend Engineer"
          bio="The sun was setting behind the mountains, casting a warm orange glow nt, letting the peace and tranquility of the moment wash over me. When I opened them again, I saw a deer grazing nearby, looking up at me curiously before bounding away into the woods. It was a moment of pure magic, one that I would never forget."
          skill1="CSS"
          skill2="JavaScript"
          skill3="React"
          skill4="Design"
          skill5="Node"

        />
        <SpecialCard
        image={Dhanya}
          name="Dhananjay Deshmukh"
          position="ML/Backend Engineer"
          bio="I'am a third year computer engineering student. I enjoy experimenting with machine learning and deep learning and still trying to grasp the vast field of backend engineering. DevFinder was an incredible learning experience and I thoroughly enjoyed working and contributing a team. We all have big dreams for DevFinder and hope to see them become reality soon"
          skill1="Python"
          skill2="C++"
          skill3="Tensorflow"
          skill4="Django"
          skill5="SQL"

        />
          
      </div>

      

    </div>

    <Footer />
    
   
    </>
  )
}
