import React from 'react';
import { useState, useEffect } from 'react';
import PayeeUI from './PayeeUI';
import '../Styles/FormMain.css';
import DailyPaymentsUI from './DailyPaymentsUI';
import MonthlyPaymentsUI from './MonthlyPaymentsUI';
import YearlyPaymentsUI from './YearlyPaymentsUI';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Jumbotron, Button } from 'reactstrap';


const Dashboard = () => {
    const {user} = useAuth0();
    const history = useHistory(); 
    const { isAuthenticated } = useAuth0();
    const [agentName, setAgentName] = useState('')
    const [payeeInfo, setPayeeInfo] = useState({});
    const [paymentsInfo, setPaymentInfo] = useState({});

    const payeeLoadout = () =>{
        console.log(agentName)
    }

    const transactionsLoadout = () =>{

    }


    useEffect(() => {
        payeeLoadout();
    }, [])


    return (
        <div className="dash_container">
            

            <div className="row components">
                    <Jumbotron>
                        <h1 className="display-3">Hello, Isaac</h1>
                        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                        
                    </Jumbotron>

                        <div className="col-md-3">
                            <PayeeUI />
                        </div>


                        <div className="col-md-3">
                            <DailyPaymentsUI />
                        </div>

                        <div className="col-md-3">
                            <MonthlyPaymentsUI />
                        </div>

                        <div className="col-md-3">
                            <YearlyPaymentsUI />
                        </div>
                        
            </div>
            
            
        </div>
    )
}

export default Dashboard
