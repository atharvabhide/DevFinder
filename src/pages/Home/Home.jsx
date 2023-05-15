import React, { useState } from "react";
import styles from "./Home.module.css";
import Hero from "../../assets/coding.gif";
import { FiChevronDown } from "react-icons/fi";
import Background from "../../assets/bg-img.png";
import { Link } from "react-router-dom";
import Atharva from "../../assets/nalla.jpg";
import Ak from "../../assets/ak.jpg";
import Dhanya from "../../assets/dhanya2.jpg";
import Typed from "react-typed";
import { FaFolder } from "react-icons/fa";
import { VscCircleLargeFilled } from "react-icons/vsc";

// import TerminalComponent from '../../components/Terminal/Terminal'

import { SpecialCard } from "../../components/SpecialCard/SpecialCard";
import { Layout } from "../../components/Layout/Layout";
import { Footer } from "../../components/Footer/Footer";

export const Home = () => {
  const [value, setValue] = useState("~/hello/welcome-to-devFinder/home ");
  const [value2, setValue2] = useState("main*");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Backspace" && value === "") {
      setValue(defaultText);
      setValue2(defaultText);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.heroPage}>
          <div className={styles.hero}>
            <div className={styles.header}>
              <h1>
                Empowering developers to <br />
                <Typed
                  className={styles.typed}
                  strings={["Network", "Connect", "Grow"]}
                  typeSpeed={120}
                  backSpeed={140}
                  loop
                />
                <br /> with our developer-focused social platform
              </h1>
              <br />
              <br />
              <Link to="/login">
                <button className={styles.heroButton}>Get Started</button>
              </Link>
            </div>
            {/* <img src={Hero} alt="" className={styles.heroGIF} /> */}
            <div className={styles.terminalContainer}>
              <div className={styles.terminalHeader}>
                <div className={styles.dots}>
                  <VscCircleLargeFilled style={{ color: "#fe5e61" }} />
                  <VscCircleLargeFilled
                    style={{ color: "#fdba33", marginLeft: "4px" }}
                  />
                  <VscCircleLargeFilled
                    style={{ color: "#23cc45", marginLeft: "4px" }}
                  />
                </div>

                <FaFolder
                  className={styles.folderIcon}
                  style={{ color: "blue" }}
                />
                <p className={styles.folderName}>
                  ~/hello/welcome-to-devFinder/home
                </p>
              </div>

              <div
                spellCheck="false"
                contentEditable
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className={styles.terminal}
              >
                <label style={{ color: "#eb7724" }}>{value}</label>
                <label>{value2}</label>
              </div>
            </div>
          </div>
          <div className={styles.scroll}>
            <a href="#about">
              <FiChevronDown size="2rem" className={styles.scrollButton} />
            </a>
          </div>
        </div>

        <div className={styles.about} id="about">
          {/* <img className={styles.aboutBackground} src={Background} alt="" /> */}

          <h1 className={styles.aboutHeader}>About DevFinder</h1>
          <p className={styles.aboutInfo}>
            Welcome to DevFinder, the social media app for developers! Our
            platform is designed to help developers connect, collaborate, and
            network with others in the industry. We understand that in today's
            world, success in software development is not just about coding
            skills but also about building a strong network of like-minded
            professionals. That's why we created DevFinder to provide a
            dedicated space where developers can connect with each other,
            showcase their skills, and find new opportunities to learn and grow.
            <br />
            <br />
            At DevFinder, we believe in the power of community. Our platform is
            open to developers of all levels, from beginners to seasoned
            professionals. Whether you're looking for your first job, searching
            for a mentor, or just want to connect with others who share your
            passion for technology, DevFinder has everything you need to take
            your career to the next level.
            <br />
            <br />
            Join our community today and start connecting with developers from
            around the world. With DevFinder, you're never alone on your journey
            towards success.
          </p>
        </div>

        <h1 className={styles.contributers}>Project Maintainers</h1>
        <div className={styles.devProfiles}>
          <SpecialCard
            image={Atharva}
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
            bio="As a third-year computer engineering student, I have a strong interest in frontend development. Working on DevFinder has been an absolute blast, filled with thrilling learning experiences. Collaborating with such a talented team has been a delight, and I thoroughly enjoyed contributing my skills to the project. Fun and enthusiasm permeate every step of our journey with DevFinder."
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
  );
};
