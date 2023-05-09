import React, { useContext, useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {FcGoogle} from 'react-icons/fc'
import jwtDecode from 'jwt-decode';

import { AuthContext } from '../../context/AuthContext';

import { useAxios } from "../../utils/useAxios"
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';
import { baseURL } from '../../utils/config';
import dayjs from 'dayjs';
import toast, { Toaster } from 'react-hot-toast';

export const Login = () => {

  const [signIn, toggle] = useState(true);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  
  const {authTokens, loginUser, logoutUser, registerUser, googleLogin} = useContext(AuthContext);

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = () => {
    loginUser(signInUsername, signInPassword);
    toast.promise(
      saveSettings(settings),
       {
         loading: 'Saving...',
         success: <b>Welcome to DevFinder!</b>,
         error: <b>Cannot log in. Please try again</b>,
       }
     );
    
  }

  console.log("Tokens", authTokens);

  const handleRegister = async () => {
    const response = await registerUser(registerFirstName, registerUsername, registerEmail, registerPassword);
    console.log(response);
    toggle(true);
    navigate('/account/edit');
  }

  const api = useAxios();

  const comment = {"comment" : "Your is so nice"}

  const testAuth = async () => {
    // const response = await axios.post(`${baseURL}/api/token/refresh/`, {refresh : authTokens?.refresh});
    // console.log(response);
    // const user = jwtDecode(authTokens?.access);
    // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    // console.log(user);
    // console.log(isExpired);
    const response = await api.delete(`http://127.0.0.1:8000/user-api/profiles/e10cd488-c8a6-4954-80d1-7677c2df5218/delete/`)
    console.log(response);
  }

  // const sendMessage = aync () => {
  //   const 
  // }

  return (
    <>
  
    <main>
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.formsWraps}>
        
          <form action="#" onSubmit={(e) => {e.preventDefault();}} className={styles.signUpContainer} style={signIn !== true ? { 
          transform: 'translateX(100%)',
          opacity: 1,
          zIndex: 5,
          
  } : null}>
            <h2>Create Account</h2><br />
            <div className={styles.actualForm}>
              <input className={styles.inputField} type="text"  placeholder='Name' onChange={(e) => {setRegisterFirstName(e.target.value);}}/>
              <input className={styles.inputField} type="text"  placeholder='Username' onChange={(e) => {setRegisterUsername(e.target.value);}}/>
              <input className={styles.inputField} type="email"   placeholder='Email' onChange={(e) => {setRegisterEmail(e.target.value);}}/>
              <input className={styles.inputField} type="password"  placeholder='Password' onChange={(e) => {setRegisterPassword(e.target.value);}}/><br />
              <button className={styles.button} onClick={handleRegister}>Sign Up</button>
            </div>
          </form>
        

        
          <form action="#" onSubmit={(e) => {e.preventDefault();}} className={styles.signInContainer}  style={signIn !== true ? { 
            transform: 'translateX(100%)',
            opacity: 0,
            
  } : null}>
            <h2 style={{color:'#fff'}} onClick={testAuth}>Log In</h2> <br />
            
            <div className={styles.actualForm}>
              <input className={styles.inputField} type="text"   placeholder='Username' onChange={(e) => {setSignInUsername(e.target.value);}}/>
              <input className={styles.inputField} type="password"  placeholder='Password' onChange={(e) => {setSignInPassword(e.target.value);}}/>
              <p className={styles.link} onClick={() => {navigate('/forgot-password')}} >Forgot your password?</p><br />
              {/* <ForgotPassword onClose={() => setShow(true)} show={show} /> */}
              <button className={styles.button} onClick={()=>handleLogin()}>Sign In</button>
              <div  className={styles.paragraph}>
                  OR
              </div>
              <button className={styles.googleBtn} onClick={googleLogin}>
                <FcGoogle size={22} style={{margin: '0 10px 0 0'}} />
                <p>Continue with Google</p>
              </button>
            </div>
          </form>
        </div>
        

        <div className={styles.overlayContainer} style={signIn !== true ? { 
    transform: 'translateX(-100%)'
  } : null}>
          <div className={styles.overlay} style={signIn !== true ? { 
    transform: 'translateX(50%)'
  } : null}>
            <div className={styles.leftOverlayPanel}  style={signIn !== true ? { 
    transform: 'translateX(0)'
  } : null}>
              <div className={styles.title}>
                Welcome Back!
              </div>
              <div className={styles.paragraph}>To keep connected with us please login  </div>
              <div className={styles.ghostButton} onClick={() => toggle(true)}>Sign In</div>
            </div>

            <div className={styles.rightOverlayPanel}  style={signIn !== true ? { 
    transform: 'translateX(20%)'
  } : null}>
              <div className={styles.title}>
                Hello, Developer!
              </div>
              <div className={styles.paragraph}>Enter your details and start your journey with us</div>
              <div className={styles.ghostButton} onClick={() => toggle(false)}>Sign Up</div>
            </div>

            


          </div>
        </div>


      </div>
      </div>
      </main>
      <Toaster />
    </>
  )
}