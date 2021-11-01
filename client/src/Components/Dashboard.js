import React from 'react';
import { useState, useEffect } from 'react';
import PayeeUI from './PayeeUI';
import '../Styles/FormMain.css';
import DailyPaymentsUI from './DailyPaymentsUI';
import MonthlyPaymentsUI from './MonthlyPaymentsUI';
import YearlyPaymentsUI from './YearlyPaymentsUI';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Jumbotron } from 'reactstrap';
import moment from 'moment';


const Dashboard = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const history = useHistory();
    const[isAuthenticated, setIsAuthenticated] = useState(false)

    const agent = JSON.parse(localStorage.getItem('agent'));
    const {id, name, phone, level, see} = agent;
    console.log(`${id}, ${name}, ${phone}, ${level}, ${see}`);
    const [agentName, setAgentName] = useState('');
    const [agentPhone, setAgentPhone] = useState('');
    const [agentLevel, setAgentLevel] = useState('');
    const [agentSee, setAgentSee] = useState('');
    const [payees, setPayees] = useState([]); //state for storing taxpayees for the current agent
    const [payeeCount, setPayeeCount] = useState(''); //state for storing the numbers of said payees
    const [apt, setApt] = useState([]); // state for storing all transaction collented by the current agent today
    const [aptCount, setAptCount] = useState(''); //state for storing the number of said transactions
    const [apm, setApm] = useState([]); // state for storing all transaction collected by the current agent this month
    const [apmCount, setApmCount] = useState('');// state for storing the number of said transactions
    const [apy, setApy] = useState([]); // state for storing all transactions collected by current agent this year
    const [apyCount, setApyCount] = useState('');// state for storing the number of said transactions


    const agentLoadout = () =>{
        setAgentName(name);
        setAgentPhone(phone)
        setAgentLevel(level)
        setAgentSee(see)
    }


    const payeeLoadout = () =>{
        console.log(id);
        const agent_id = Number(id);
        console.log(agent_id);

        const options={ 
            
            params:{
                agent_id
            },

            headers:{
                'x-auth-token':token
              }
        }


        axios.get('api/payee/for', options)
        .then(res =>{
            if(!res){
                alert('there was a problem with your request')
            }else{
                const clients = res.data;
                console.log(clients);
                const count = clients.length;
                console.log(count);
                setPayeeCount(count);
                setPayees(clients);
            }
        })
    }





    const amountTodayLoadout = () =>{
        const date = moment().format("YYYY-MM-DD");
        console.log(date);
        const options={
            params:{
                id,
                date
            },

            headers:{
                'x-auth-token':token
              }
        }
        axios.get('api/payments/daily', options)
        .then(res =>{
            
            if(!res){
                alert('there was a problem with your request')
            }else{
                const dailytrans = res.data;
                console.log(dailytrans);
                const count = dailytrans.length;
                console.log(count);
                setAptCount(count);
                setApt(dailytrans)
            }
        })

    }




    const amountToMonthLoadout = () =>{
        const options={
            headers:{
                'x-auth-token':token
              },
            params:{
                id
            }
        }
        axios.get('api/payments', options)
        .then(res => {
            const auth = res.auth;
            const msg = res.message;
            const mtrevenue = res.data;
            if(!auth){
                alert('there was a problem with your request')
            }else{
                console.log(mtrevenue)
            }
        })

    }




    const amountToYearLoadout = () =>{
        const options={
            headers:{
                'x-auth-token':token
              },
            params:{
                id
            }
        }
        axios.get('api/payments', options)
        .then(res =>{
            const auth = res.auth;
            const msg = res.message;
            const ytrevenue = res.data;
            if(!auth){
                alert('there was a problem with your request')
            }else{
                console.log(ytrevenue)
            }
        })
        
    }


    useEffect(() => {
        agentLoadout();
        payeeLoadout();
        amountTodayLoadout();
    }, [])


    return (

        !isAuthenticated && (

            <div className="dash_container">
                

                <div className="row components">
                        <Jumbotron>
                            <h1 className="display-3">{`Hello, ${agentName}`}</h1>
                            <p className="lead">{agentName}</p>
                            
                        </Jumbotron>

                            <div className="col-md-3">
                                <PayeeUI payeeCount= {payeeCount} payees= {payees} />
                            </div>


                            <div className="col-md-3">
                                <DailyPaymentsUI aptCount = {aptCount} apt ={apt} />
                            </div>

                            <div className="col-md-3">
                                <MonthlyPaymentsUI apm= {apm} apmCount= {apmCount}/>
                            </div>

                            <div className="col-md-3">
                                <YearlyPaymentsUI apy= {apy} apyCount= {apyCount}/>
                            </div>
                            
                </div>
                
                
            </div>

        )
    )
}

export default Dashboard
