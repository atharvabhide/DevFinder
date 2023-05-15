import React, { useEffect } from 'react'
import styles from './Recommendations.module.css'
import { DevCard } from '../../components/DevCard/DevCard'
import { useAxios } from '../../utils/useAxios';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react';
import { baseURL } from '../../utils/config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Recommendations = () => {
    const {currentUUID} = useContext(AuthContext);

    const api = useAxios();

    const navigate = useNavigate();

    const [users, setUsers] = useState([])

    const fetchReccommended = async () => {
        const response = await api.get(`user-api/similar/`);
        console.log(response);
        setUsers(response.data);
    }

    useEffect(() => {
        fetchReccommended();
    }, [])

  return (
    <>
        <div className={styles.header}>
            Recommended Developers
            
        </div>  

    <div className={styles.developers}>
        

        {users && users.length > 0 ? (
        users.map((user) => (
            <Link to="/developers/developer" key={user.url} state={{ url: user.url }}>
            <DevCard
                name={user.username}
                position={user.shortIntro}
                bio={user.bio}
                image={user.profileImage}
            />
            </Link>
        ))
        ) : (
        <div className={styles.noRecommendations} style={{ width: '85vw', textAlign: 'left', color: '#fff' }}>
            {users && users.length === 0 ? (
            <>
                <p>You currently have no recommendations. Please add/update your profile</p>
                <button onClick={() => navigate('/account')} className={styles.updateProfile}>Update Profile</button>
            </>
            ) : (
            <p>Loading...</p>
            )}
        </div>
        )}
        

        
        
        
        
    </div>
    </>

  )
}
