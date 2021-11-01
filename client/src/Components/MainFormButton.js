import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Styles/Home.css';



const MainFormButton = () => {
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) setIsAuthenticated(true)
    }, []);
    
    const fire = () =>{
        history.push("/payee-table");
    }    


    return (
        !isAuthenticated && (
            <button className="sleek" onClick = {fire}>
                Register A Payee
            </button>
        )
    )
}

export default MainFormButton