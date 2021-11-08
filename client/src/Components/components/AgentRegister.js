import React,{useState,useEffect} from 'react'
import background from '../../background.png'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import moment from 'moment';

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
const [userMessage, setUserMessage] = useState('');


const clearFields = () =>{
    setName('');
    setPhone('');
    setDob('');
    setIdType('');
    setIdNumber('');
    setGender('');
    setDevice('');
    setArea('');
}





const register = (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem('token'))
    const agent = JSON.parse(localStorage.getItem('agent'))
    const superagent = agent.name;
    console.log(superagent);
    const data = {
        tel_no:phone,
        fullname,
        dob,
        idType,
        idNumber,
        gender,
        device,
        area,
        superagent
      }

      const options = {
        headers:{
          'x-auth-token':token
        }
      }

    const time = moment()
    const SMS = `Congratulations ${fullname}! Your account has been successfully created at ${time}`
    const number = '233'+parseInt(phone, 10)
    console.log(number)
    console.log(SMS)

    axios.post('api/user/register', data,options)
    .then((res) => {
        console.log(res.data);
        const response = res.data;

        if(response.success === false){
          swal("Something went wrong", "please try again later", "warning");
        }else{
          clearFields();
          swal(`${fullname} `, "has been registered successfully", "success");
          axios.post(`http://sms.apavone.com:8080/bulksms/bulksms?username=tsg-teksup&password=Mirlin12&type=0&dlr=0&destination=${number}&source=eRIMS&message=${SMS}`)
           
          history.push('/agent-table')
        }

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
                        <input type="text" id="name" value={fullname} placeholder="Full Name" className="myInput form-control border-bottom"
                         onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="date" id="dob" name="dob" value={dob} className="myInput form-control border-bottom"  
                        onChange={e => setDob(e.target.value)} placeholder="Date of Birth"/>
                    </div>
                    <div className="mb-3">
                        <input type="tel" id="phone" name="phone" value={phone} placeholder="Number" className="myInput form-control border-bottom"
                          onChange={e => setPhone(e.target.value)}/>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                        <select className="form-select form-select-sm" value={idType}  onChange={e => setIdType(e.target.value)}>
                            <option value="" disabled>ID Type</option>
                            <option value="passport">Passport</option>
                            <option value="ghana_card">Ghana Card</option>
                            <option value="voters_id">Voter's ID Card</option>
                            <option value="drivers_license">Driver's License</option>
                        </select>
                    </div>
                    <div className="col">
                        <input type="text" className="myInput form-control border-bottom" value={idNumber} placeholder="ID Number" 
                         onChange={e => setIdNumber(e.target.value)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={gender}  onChange={e => setGender(e.target.value)}>
                        <option selected>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="col">
                        <input type="text" className="myInput form-contro border-bottom" placeholder="Assigned Device" value={device} 
                          onChange={e => setDevice(e.target.value)}/>
                    </div>
                    </div>
                    <div className="mb-3">
                      <select className="myInput select form-control border-bottom" value={area} onChange={e => setArea(e.target.value)} >
                      <option value="" disabled>Assigned Area</option>
                        <option value="biakoye">Biakoye</option>
                        <option value="jasikan">Jasikan</option>
                        <option value="kajebi">Kadjebi</option>
                        <option value="krachi_nchumuru">Krachi Nchumuru</option>
                        <option value="kete_krachi">Kete Krachi</option>
                        <option value="kpassa">Kpassa</option>
                        <option value="chinderi">Chinderi</option>
                        <option value="nkonya_ahenkro">Nkonya Ahenkro</option>
                        <option value="dambai">Dambai</option>
                        <option value="nkwanta">Nkwanta</option>
                      </select>
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
