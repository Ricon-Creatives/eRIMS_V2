import React from 'react';
import { useState, useEffect } from 'react';
import PayeeUI from './PayeeUI';
import '../Styles/FormMain.css';
import AgentsUI from './AgentsUI';
import DailyPaymentsUI from './DailyPaymentsUI';
import MonthlyPaymentsUI from './MonthlyPaymentsUI';
import YearlyPaymentsUI from './YearlyPaymentsUI';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Jumbotron } from 'reactstrap';
import moment from 'moment';
import AgentPerfromanceChart from './AgentPerfromanceChart';
import RevenueTracker from './RevenueTracker';
import GrowthTracker from './GrowthTracker'


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
    const [aptAmount, setAptAmount] = useState('');// state for storing the total amount received of said transactions
    const [apm, setApm] = useState([]); // state for storing all transaction collected by the current agent this month
    const [apmCount, setApmCount] = useState('');// state for storing the number of said transactions
    const [apmAmount, setApmAmount] = useState('');// state for storing the total amount received of said transactions
    const [apy, setApy] = useState([]); // state for storing all transactions collected by current agent this year
    const [apyCount, setApyCount] = useState('');// state for storing the number of said transactions
    const [apyAmount, setApyAmount] = useState('');// state for storing the total amount received of said transactions
    const [collectors, setCollectors] = useState([]);
    const [collectorNumber, setCollectorNumber] = useState(0)


    const agentLoadout = () =>{
        setAgentName(name);
        setAgentPhone(phone)
        setAgentLevel(level)
        setAgentSee(see)
    }



    const collectorLoadout = () =>{
        const rank = level;
        if(rank === 'SuperUser'){
            const options={ 
            
                params:{
                    id
                },
    
                headers:{
                    'x-auth-token':token
                  }
            }
            axios.get('api/agents',options)
            .then((res)=>{
                const collectors = res.data;
                const count = collectors.length;
                console.log(collectors)
                setCollectors(collectors)
                setCollectorNumber(count)
            })

        }else{
            console.log('You are just a regular agent')
        }
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

        if(level === 'SuperUser'){
            axios.get('api/payee/', options)
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
        }else{
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
                const amountList = dailytrans.map(a => Number(a.amount));
                const amountRaw = amountList.reduce((a, b) => a + b, 0);
                const amount = amountRaw.toFixed(2)
                console.log(amount);
                console.log(count);
                setAptCount(count);
                setApt(dailytrans);
                setAptAmount(amount)

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
        axios.get('api/payments/monthly', options)
        .then(res => {
            const mtrevenue = res.data;
            if(!res){
                alert('there was a problem with your request')
            }else{
                console.log(mtrevenue);
                const count = mtrevenue.length;
                const amountList = mtrevenue.map(a => Number(a.amount))
                const amountRaw = amountList.reduce((a, b) => a + b, 0);
                const amount = amountRaw.toFixed(2);
                console.log(amount);
                console.log(count);
                setApmCount(count);
                setApm(mtrevenue);
                setApmAmount(amount)

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
        axios.get('api/payments/yearly', options)
        .then(res =>{
            const auth = res.auth;
            const msg = res.message;
            const ytrevenue = res.data;
            if(!res){
                alert('there was a problem with your request')
            }else{
                console.log(ytrevenue)
                const count = ytrevenue.length;
                const amountList = ytrevenue.map(a => Number(a.amount))
                const amountRaw = amountList.reduce((a, b) => a + b, 0);
                const amount = amountRaw.toFixed(2);
                console.log(amount);
                console.log(count);
                setApyCount(count);
                setApy(ytrevenue);
                setApyAmount(amount);
            }
        })
        
    }





    useEffect(() => {
        agentLoadout();
        collectorLoadout();
        payeeLoadout();
        amountTodayLoadout();
        amountToMonthLoadout();
        amountToYearLoadout();
    }, [])


    return (

        !isAuthenticated && (

            <div className="dash_container">
                

                <div className="row components">
                        <Jumbotron className="profile-badge">
                            <h1>{`Hello, ${agentName}`}</h1>
                            {/*<p className="">{agentName}</p>*/}
                            
                        </Jumbotron>

                            <div className="row">
                                <div className="col-md-3">
                                    <AgentsUI collectors = {collectors} collectorNumber={collectorNumber}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3">
                                    <PayeeUI payeeCount= {payeeCount} payees= {payees} />
                                </div>

                                <div className="col-md-3">
                                    <DailyPaymentsUI aptCount = {aptCount} apt = {apt} aptAmount = {aptAmount} />
                                </div>

                                <div className="col-md-3">
                                    <MonthlyPaymentsUI apm= {apm} apmCount= {apmCount} apmAmount = {apmAmount}/>
                                </div>

                                <div className="col-md-3">
                                    <YearlyPaymentsUI apy= {apy} apyCount= {apyCount} apyAmount = {apyAmount}/>
                                </div>
                            </div>



                            <div className="row gap">

                            </div>



                            <div className="row">
                                <h3>Data Visualization</h3>
                                <div className="col-md-4">
                                    <AgentPerfromanceChart payees={payees} payeeCount={payeeCount} apt={apt} aptCount={aptCount} 
                                    aptAmount={aptAmount} apm={apm} apmCount={apmCount} apmAmount={apmAmount} apy={apy} 
                                    apyCount={apyCount} apyAmount={apyAmount} collectors = {collectors} collectorNumber={collectorNumber}/>
                                    <h4>Registered Tax Payers Per Agent</h4>
                                </div>
                         
                                <div className="col-md-4">

                                    <div className="row gap"></div>
                                    
                                    <RevenueTracker payees={payees} payeeCount={payeeCount} apt={apt} aptCount={aptCount} 
                                    aptAmount={aptAmount} apm={apm} apmCount={apmCount} apmAmount={apmAmount} apy={apy} 
                                    apyCount={apyCount} apyAmount={apyAmount} collectors = {collectors} collectorNumber={collectorNumber}/>
                                    <h4>Revenue Per Month</h4>
                                </div>

                           
                                <div className="col-md-4">

                                    <div className="row gap"></div>

                                    <GrowthTracker payees={payees} payeeCount={payeeCount} apt={apt} aptCount={aptCount} 
                                    aptAmount={aptAmount} apm={apm} apmCount={apmCount} apmAmount={apmAmount} apy={apy} 
                                    apyCount={apyCount} apyAmount={apyAmount} collectors = {collectors} collectorNumber={collectorNumber}/>
                                    <h4>Tax Payer Increase (Monthly)</h4>
                                </div>
                            </div>
                            
                </div> 
            </div>

        )
    )
}

export default Dashboard
