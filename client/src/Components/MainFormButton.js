import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import '../Styles/Home.css';



const MainFormButton = () => {
    const { isAuthenticated } = useAuth0();
    const history = useHistory();

    const fire = () =>{
        history.push("/register");
    }
    

    return (
        isAuthenticated && (
            <button className="sleek" onClick = {fire}>
                Register A Payee
            </button>
        )
    )
}

export default MainFormButton