import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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
            <div>
                <h3>Welcome Back</h3>
                <h4>{name}</h4>
                
            </div>
        )
    )
}

export default ProfileBadge
