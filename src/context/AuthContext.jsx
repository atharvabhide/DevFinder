import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { createContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google'; 
import { baseURL } from '../utils/config';
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast'


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
    );

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const [currentUUID, setCurrentUUID] = useState(() => {
      const storedUUID = localStorage.getItem("user");
      return storedUUID ? JSON.parse(storedUUID) : null;
    });

    useEffect(() => {
      if(authTokens === null)
      {
        setIsLoggedIn(false);
      }
      else
      {
        setIsLoggedIn(true);
      }
    }, [authTokens])

    // console.log("Token state ", authTokens);
  
    const loginUser = async (username, password) => {
      const response = await axios.post(`${baseURL}api/token/`, {username: username, password: password});
      console.log(response);
      // console.log(jwtDecode(response.data.access));
      if (response.status === 200)
      {
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data);
        getUser(response.data.access);
      }
      else {
        toast.error('Cannot log in. Please try again');
        
      }
    }

    const logoutUser = () => {
        setAuthTokens(null);
        setCurrentUUID(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("user");
        toast.success('You are logged out');
        
    }

    
    const registerUser = async (first_name, username, email, password) => {
        const response = await axios.post(`${baseURL}user-api/profiles/create/`, {first_name, username, email, password});
        console.log(response);
        return response;
    }

    const googleLogin = useGoogleLogin({
      onSuccess: (codeResponse) => {console.log(codeResponse); handleGoogleLogin(codeResponse.access_token)},
      // flow: 'auth-code',
      onError: (error) => console.log('Login Failed:', error),
    });

    const handleGoogleLogin = async (access_token) => {
      console.log(access_token);
      const response = await axios.post(`${baseURL}user-api/register-by-access-token/social/google-oauth2/`, {"access_token": access_token});
      console.log(response);
      if (response.status === 200)
      {
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data);
        getUser(response.data.access);
      }
      else (
        alert("oopsie daisy")
      )
    }

    const getUser = async (access_token) => {
      const response = await axios.get(`${baseURL}/user-api/current-user/`, {
        headers: {
          "Authorization": `Bearer ${access_token}`,
        }
      });
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data.uuid));
      setCurrentUUID(response.data.uuid);
      toast.success('Welcome to DevFinder!');
      navigate(`/account`);
    }

    const contextData = {
        authTokens,
        setAuthTokens,
        loginUser,
        logoutUser,
        registerUser,
        googleLogin,
        handleGoogleLogin,
        isLoggedIn,
        getUser,
        currentUUID,
    }

    return (
      <>
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
        <Toaster />
      </>
    )
}