import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
    );

    // console.log("Token state ", authTokens);
  
    const loginUser = async (username, password) => {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {username: username, password: password});
      console.log(response);
      // console.log(jwtDecode(response.data.access));
      if (response.status === 200)
      {
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data);
      }
      else (
        alert("oopsie daisy")
      )
    }

    const logoutUser = () => {
        setAuthTokens(null);
        localStorage.removeItem("authTokens");
    }

    
    const registerUser = async (first_name, username, email, password) => {
        const response = await axios.post("http://127.0.0.1:8000/user-api/profiles/create/", {first_name, username, email, password});
        console.log(response);
        return response;
    }

    const contextData = {
        authTokens,
        setAuthTokens,
        loginUser,
        logoutUser,
        registerUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}