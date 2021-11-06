import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Styles/Home.css';



const AgentButton = () => {
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const agent = JSON.parse(localStorage.getItem('agent'));
        const {id, full_name, tel_no, level, see} = agent;
        const rank = level;
        console.log(rank)
        if(rank !=='SuperAgent') setIsAuthenticated(true)
    }, []);
    
    const fire = () =>{
        history.push("/agent-table");
    }    


    return (
        !isAuthenticated && (
            <button className="sleek" onClick = {fire}>
               Agents Records
            </button>
        )
    )
}

export default AgentButton