import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/Home.css';


const LogoutButton = () => {
    const history = useHistory(); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) setIsAuthenticated(true)
    }, []);

    const logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('agent');
        localStorage.removeItem('admin');
        history.push("/")
        window.location.reload(false);
    }

    
    return (
        !isAuthenticated && (
            <button className="sleek" onClick = {()=> logout()}>
                Log Out
            </button>
        )
    )
}

export default LogoutButton