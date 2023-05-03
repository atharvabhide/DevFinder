import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import {GoSearch} from 'react-icons/go'
import {HiMenuAlt3} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import {HiCode, HiOutlineHome} from 'react-icons/hi'
import {MdOutlineLogin} from 'react-icons/md'
import {MdOutlineLogout} from 'react-icons/md'
import {TbMessageCircle} from 'react-icons/tb'
import {FiUsers} from 'react-icons/fi'
import {MdClose} from 'react-icons/md'
import Logo from '../../assets/Logo.png'
import { SearchBar } from '../SearchBar/SearchBar'
import { AuthContext } from '../../context/AuthContext'
import {FiUser} from 'react-icons/fi'


export const Navbar = () => {
    const IconStyle = {color: "white"}
    const IconstyleMenu = {color: "#333"}

    const [navbarOpen, setNavbarOpen] = useState(false);
    const handleToggleClick = () => {
        setNavbarOpen((prev) => !prev)
        console.log("click ho gaya");
    }

    const {logoutUser, isLoggedIn} = useContext(AuthContext);

    const handleLogout = () => {
        alert("You have logged out!")
        logoutUser()
    }

    return (
    <>
        <header className="header">
            <div className="headerContainer">
               
                {/* <h3>DevFinder</h3> */}
                <img className="logo" src={Logo} alt="" />

                {/* SearchBar */}

                {isLoggedIn ? 
                (
                
                    <ul className="account">
                        <li class="dropdown">
                            <FiUser className="accountImage" size={40} />
                            <ul className="dropdownList">
                            <li className="option">
                                <Link to="/account" className="dropdownLink">Edit Profile</Link>
                            </li>
                            <li className="option">
                                <Link onClick={handleLogout}>Log out</Link>
                            </li>
                            </ul>
                        </li>
                    </ul>
                
                ) : (null)
                }
                
                
                {/* <img Logo idhar** /> */}

                <button className="headerToggle" onClick={handleToggleClick} >

                    {navbarOpen ? <MdClose style={IconstyleMenu} size={25} /> : <HiMenuAlt3 style={IconstyleMenu} size={25} />}
                </button>

            </div>
        </header>
        <div className="nav" >
            <nav className={`navContainer ${navbarOpen ? 'navOpen' : 'navClosed'}`}>
                <div >
                
                    <Link className="navLink navLogo"><span className="navLogoName">DevFinder</span></Link>

                    <div className="navList">
                        <div className="navItems"  >
                            <h3 className="navSubTitle">Menu</h3>

                            <Link to="/" className="navLink " >
                                <HiOutlineHome className="navIcon"/>
                                <span className="navName">Home</span>
                            </Link>

                            <Link to="/developers" className="navLink">
                                <FiUsers className="navIcon" />
                                <span className="navName">Developers</span>
                            </Link>

                            <Link to="/projects" className="navLink">
                                <HiCode className="navIcon"/>
                                <span className="navName">Projects</span>
                            </Link>

                            <Link to="/inbox" className="navLink">
                                <TbMessageCircle className="navIcon" />
                                <span className="navName">Inbox</span>
                            </Link>

                            <Link to="/login" className="navLink">
                                <MdOutlineLogin className="navIcon" />
                                <span className="navName">Login/Signup</span>
                            </Link> 

                            {/* <Link to="/logout" className="navLink" onClick={handleLogout}>
                                <MdOutlineLogout className="navIcon" />
                                <span className="navName">Logout</span>
                            </Link>  */}
                            {isLoggedIn &&
                                <Link to="" className="navLink" onClick={handleLogout}>
                                    <MdOutlineLogout className="navIcon" />
                                    <span className="navName">Logout</span>
                                </Link> 
                            }

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </>
  )
}

