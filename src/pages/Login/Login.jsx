import React, { useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'

import {FcGoogle} from 'react-icons/fc'

export const Login = () => {

  const [signIn, toggle] = useState(true);

  return (
    
    <>
    <main>
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.formsWraps}>
        
          <form action="#" className={styles.signUpContainer} style={signIn !== true ? { 
          transform: 'translateX(100%)',
          opacity: 1,
          zIndex: 5,
          
  } : null}>
            <h2>Create Account</h2><br />
            <div className={styles.actualForm}>
              <input className={styles.inputField} type="text"  placeholder='Name' />
              <input className={styles.inputField} type="text"  placeholder='Username' />
              <input className={styles.inputField} type="email"   placeholder='Email' />
              <input className={styles.inputField} type="password"  placeholder='Password' /><br />
              <button className={styles.button}>Sign Up</button>
            </div>
          </form>
        

        
          <form action="#" className={styles.signInContainer}  style={signIn !== true ? { 
            transform: 'translateX(100%)',
            opacity: 0,
            
  } : null}>
            <h2>Log In</h2> <br />
            
            <div className={styles.actualForm}>
              <input className={styles.inputField} type="email"   placeholder='Email' />
              <input className={styles.inputField} type="password"  placeholder='Password' />
              <Link to="#" className={styles.link}>Forgot your password?</Link><br /><br />
              <button className={styles.button}>Sign In</button>
              <div  className={styles.paragraph}>
                  OR
              </div>
              <button className={styles.googleBtn}>
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
    </>
  )
}
