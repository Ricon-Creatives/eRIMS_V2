import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Styles/Home.css';



const TransactionFormButton = () => {
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const history = useHistory();

    const fire = () =>{
        history.push("/payment-table");
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) setIsAuthenticated(true)
    }, []);


    return (
        !isAuthenticated && (
            <button className="sleek" onClick = {fire}>
                Initiate Payment
            </button>
        )
    )
}

export default TransactionFormButton