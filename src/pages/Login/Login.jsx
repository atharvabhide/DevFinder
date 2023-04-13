import React from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import { useEffect } from 'react'

export const Login = () => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.innerBox}>
          <div className={styles.formsWrap}>
            <form action="#" className={styles.signInForm}>
              <div className={styles.logo}>
                <img src={Logo} alt="" />
                {/* <h3>DevFinder</h3> */}
              </div>

              <div className={styles.heading}>
                <h2>Welcome Back!</h2>
                <h6>Not registered yet?</h6>
                <Link to="#" className={styles.toggle}>Sign up</Link>
              </div>

              <div className={styles.actualform}>
                <div className={styles.inputWrap}>
                  <input 
                    type="text"
                    minLength={4}
                    className={styles.inputField}
                    autoComplete='off'
              
                    required 
                  />
                  <label>Name</label>
                  </div>

                  <div className={styles.inputWrap}>
                  <input 
                    type="password"
                    minLength={4}
                    className={styles.inputField}
                    autoComplete='off'
                    
                    required 
                  />
                  <label>Password</label>
                </div>

                <input type="submit" value="Sign In" className={styles.signBtn} />

                <p className={styles.text}>Forgotten your password or your login details?
                <Link to="#">Get help</Link> Signing In
                </p>
              </div>
            </form>

            <form action="#" className={styles.signUpForm}>
              <div className={styles.logo}>
                <img src={Logo} alt="" />
                {/* <h3>DevFinder</h3> */}
              </div>

              <div className={styles.heading}>
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <Link to="#" className={styles.toggle}>Log in</Link>
              </div>

              <div className={styles.actualform}>
                <div className={styles.inputWrap}>
                  <input 
                    type="text"
                    minLength={4}
                    className={styles.inputField}
                    autoComplete='off'
              
                    required 
                  />
                  <label>Name</label>
                  </div>

                  <div className={styles.inputWrap}>
                  <input 
                    type="password"
                    minLength={4}
                    className={styles.inputField}
                    autoComplete='off'
                    
                    required 
                  />
                  <label>Password</label>
                </div>

                <div className={styles.inputWrap}>
                  <input 
                    type="email"
                    minLength={4}
                    className={styles.inputField}
                    autoComplete='off'
              
                    required 
                  />
                  <label>Email</label>
                  </div>

                <input type="submit" value="Sign Up" className={styles.signBtn} />

                <p className={styles.text}>By signing up, I agree to the 
                <Link to="#">Terms and services</Link> and<Link to="#">Privacy Policy</Link>
                </p>
              </div>
            </form>
          </div>
          <div className={styles.carousel}>
            
          </div>
        </div>

      </div>
    </div>
  )
}
