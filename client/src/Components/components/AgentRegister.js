import React,{useState,useEffect} from 'react'
import background from '../../background.png'
import axios from 'axios'
import { useHistory } from 'react-router-dom';


const AgentRegister = () => {
    const history = useHistory();

const [fullname, setName] = useState('')
const [phone, setPhone] = useState('')
const [dob, setDob] = useState('')
const [idType, setIdType] = useState('')
const [idNumber, setIdNumber] = useState('')
const [gender, setGender] = useState('')
const [device, setDevice] = useState('')
const [area, setArea] = useState('')

const register = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'))

    const data = {
        phone,
        fullname,
        dob,
        idType,
        idNumber,
        gender,
        device,
        area
      }

      const options = {
        headers:{
          'x-auth-token':token
        }
      }

    axios.post('', data,options)
    .then((res) => {
        console.log(res.data)
    })

}

    return (
        <div className="container">
          <div className="row justify-content-center align-middle py-5">

            <div className="col-md-9">

            <div className="card">
                <div className="card-body p-0">

                <div className="row">

                    <div className="col-md-6">
                        <img src={background} className="bg img-fluid" alt="background image"/>
                    </div>

                    <div className="col-md-6">

                    <div className="row d-flex justify-content-center p-3">
                        <h5 className="my-3">
                        <strong>Collection Agent Registration</strong>
                        </h5>

                    
                    <div className="mb-3">
                        <input type="text" id="name" value={fullname} placeholder="Full Name" className="form-control border-0 border-bottom"
                         onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="date" id="dob" name="dob" value={dob} className="form-control border-0 border-bottom"  
                        onChange={e => setDob(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="tel" id="phone" name="phone" value={phone} placeholder="+233" className="form-control border-0 border-bottom"
                          onChange={e => setPhone(e.target.value)}/>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                        <select className="form-select form-select-sm" value={idType}  onChange={e => setIdType(e.target.value)}>
                            <option value="">ID Type</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control border-0 border-bottom" value={idNumber} placeholder="ID Number" 
                         onChange={e => setIdNumber(e.target.value)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={gender}  onChange={e => setGender(e.target.value)}>
                        <option selected>Gender</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control border-0 border-bottom" placeholder="Assigned Device" value={device} 
                          onChange={e => setDevice(e.target.value)}/>
                    </div>
                    </div>
                    <div className="mb-3">
                        <input type="text" id="assign-area" placeholder="Assigned Area" className="form-control border-0 border-bottom" value={area}
                         onChange={e => setArea(e.target.value)}/>
                    </div>

                    <div className="d-grid text-center">
                        <button className="btn btn-classic btn-sm my-4" onClick={register}>Create Account</button>
                    </div>

                    </div>
                  </div>
                </div>

                </div>
            </div>

            </div>

            </div>
        </div>
    )
}

export default AgentRegister
