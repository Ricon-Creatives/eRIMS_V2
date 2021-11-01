import React,{useState,useEffect} from 'react';
import logo from "../../logo-03.png";
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [queryMessage, setQueryMessage] = useState('');

const [telNo, setTelNo] = useState('')
const [pass, setPass] = useState('')

const [authenticated, setAuthenticated] = useState(false);

const refresh = () =>{  
  window.location.reload(false)
}

useEffect(() => {

}, []);



 const login = (e) =>{
   e.preventDefault();
   console.log(`${telNo},${pass}`)

   const data = {
     tel_no:telNo,
     password:pass
   }

    axios.post('api/auth', data)
    .then((res) => {

      const loggedUser = res.data
      const {token, user,message,auth}  = loggedUser
      const {id,name,phone,userlevel,last_seen} = user

     const agent = {
       id:id,
      name:name,
      phone:phone,
      level:userlevel,
      see:last_seen
    }  

      
      if(auth == true){
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('agent', JSON.stringify(agent))
  
        const checker = localStorage.getItem('agent')
        console.log(checker)

        history.push("/dashboard");
        window.location.reload(false)
      } 

      else{
          setQueryMessage(message)
      }

    })
 }

    return (
        <div className="container">
            <div className="row justify-content-center align-middle py-5">
                <div className="col-md-4 my-5">
                    <div className="card card-signup z-depth-1 p-2">
                        <div className="card-body text-center">
                        <img src={logo} className="logo img-fluid"/>
                        
                      <div className="mb-3">
                        <input type="tel" value={telNo} placeholder="Number" className="form-control border-0 border-bottom" 
                        onChange={e => setTelNo(e.target.value)} required/>
                      </div>

                      <div className="mb-3">
                        <input type="password"  value={pass} className="form-control border-0 border-bottom" placeholder="Password"
                           onChange={e => setPass(e.target.value)} required/>
                      </div>
                     
                      <div className="card-foter d-grid gap-2">
                        <button type="submit" className="btn btn-classic btn-sm my-4" onClick={login}>Login</button>
                      </div>
                        </div>
                        <h5 className="centered text">{queryMessage}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
