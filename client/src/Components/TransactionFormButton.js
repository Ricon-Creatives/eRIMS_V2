import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import '../Styles/Home.css';



const TransactionFormButton = () => {
    const { isAuthenticated } = useAuth0();
    const history = useHistory();

    const fire = () =>{
        history.push("/transactions");
    }


    return (
        isAuthenticated && (
            <button className="sleek" onClick = {fire}>
                Initiate Tax-Payment Transaction
            </button>
        )
    )
}

export default TransactionFormButton