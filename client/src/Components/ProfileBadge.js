import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import profilepic from '../chidispf.jpg';

const ProfileBadge = () => {
    const history = useHistory(); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null)
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [level, setLevel] = useState('');
    const [see, setSee] = useState('');

    const setup = () =>{

    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setIsAuthenticated(true)
            setToken(token)
            const agent = JSON.parse(localStorage.getItem('agent'));
            const {id, name, phone, level, see} = agent;
            //setup();
            setId(id)
            setName(name)
            setPhone(phone)
            setLevel(level)
            setSee(see)
              
        }else{
             setIsAuthenticated(false);
        }
    }, [token]);



    return (
        isAuthenticated && (
            <div className="profile-badge">
                <div className="greeting col-md-8">
                    <h5>Welcome Back</h5>
                    <h2>{name}</h2>
                </div>
                <div className="greeting col-md-4">
                    <a href="javascript:;" class="profile-pic">
                        <img className="profile-pic" alt="" src={profilepic} />
                    </a>
                </div>
            </div>
        )
    )
}

export default ProfileBadge
