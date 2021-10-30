import React,{useState,useEffect} from 'react'
import background from '../../background.png'
import axios from 'axios'
import { useHistory } from 'react-router-dom';


const PayeeRegister = () => {
  const history = useHistory();

  const [surname, setSurname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [phone1, setPhone1] = useState('')
  const [phone2, setPhone2] = useState('')
  const [dob, setDob] = useState('')
  const [idType, setIdType] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [gender, setGender] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [education, setEducation] = useState('')
  const [taxId, setTaxId] = useState('')
  const [customerType, setCustomerType] = useState('')
  const [payeeType, setPayeeType] = useState('')
  const [sector, setSector] = useState('')
  const [segment, setSegment] = useState('')

  const register = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'))

    const data = {
      tel1:phone1,    tel2:phone2,
      firstname,    surname,
        dob,         maritalstat:maritalStatus,
        idType,      address:address,
        idNumber,     educ:education,
        gender,       taxId, customertype:customerType, 
        payeeType,   busisect:sector,  marketseg:segment
      }

      const options = {
        headers:{
          'x-auth-token':token
        }
      }

    axios.post('api/payee/register', data,options)
    .then((res) => {
        console.log(res.data)
    })

}


    return (
        <div className="container">
          <div className="row justify-content-center align-middle py-5">

            <div className="col-md-12">

            <div className="card">
                <div className="card-body p-0">

                <div className="row">

                    <div className="col-md-6">
                        <img src={background} className="bg img-fluid" alt="background image"/>
                    </div>

                    <div className="col-md-6">

                    <div className="row d-flex justify-content-center p-3">
                        <h5 className="my-3">
                        <strong>Tax Payee Registration</strong>
                        </h5>

                    
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" id="surname" placeholder="Surname" value={surname} className="form-control border-0 border-bottom" 
                            onChange={e => setSurname(e.target.value)}/>
                        </div>
                        <div className="col">
                            <input type="text" id="firstname" placeholder="First Name" value={firstname} className="form-control border-0 border-bottom"
                             onChange={e => setFirstname(e.target.value)}/>
                        </div>
                    </div>
                   
                    <div className="mb-3">
                        <input type="date" id="dob" name="dob" value={dob} className="form-control border-0 border-bottom" onChange={e => setDob(e.target.value)}/>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="tel" id="phone1" value={phone1} placeholder="(+233) Mobile Number1" className="form-control border-0 border-bottom" 
                             onChange={e => setPhone1(e.target.value)}/>
                        </div>
                        <div className="col">
                            <input type="tel" id="phone2" value={phone2} placeholder="(+233) Mobile Number1" className="form-control border-0 border-bottom"
                              onChange={e => setPhone2(e.target.value)}/>
                        </div>
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
                        <input type="text" className="form-control border-0 border-bottom" placeholder="ID Number" value={idNumber}
                          onChange={e => setIdNumber(e.target.value)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={gender}  onChange={e => setGender(e.target.value)}>
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="col">
                        <input type="email" className="form-control border-0 border-bottom" placeholder="Email" value={email} 
                          onChange={e => setEmail(e.target.value)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={maritalStatus}  onChange={e => setMaritalStatus(e.target.value)}>
                        <option value="">Marital Status</option>
                        <option value="1">Single</option>
                        <option value="2">Married</option>
                      </select>
                    </div>
                    <div className="col">
                        <input type="address" className="form-control border-0 border-bottom" placeholder="Address" value={address} 
                        onChange={e => setAddress(e.target.value)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={education} onChange={e => setEducation(e.target.value)}>
                        <option value="">Education</option>
                        <option value="1">Student</option>
                        <option value="2">Female</option>
                      </select>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control border-0 border-bottom" placeholder="Tax ID No." value={taxId} 
                        onChange={e => setTaxId(e.target.value)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={customerType} onChange={e => setCustomerType(e.target.value)}>
                        <option value="">Customer Type</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>
                    </div>
                    <div className="col">
                    <select className="form-select form-select-sm" value={payeeType} onChange={e => setPayeeType(e.target.value)}>
                        <option value="">Payee Type</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={sector} onChange={e => setSector(e.target.value)}>
                        <option value="">Business Sector</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>
                    </div>
                    <div className="col">
                    <select className="form-select form-select-sm" value={segment} onChange={e => setSegment(e.target.value)}>
                        <option value="">Market Segment</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                      </select>
                    </div>
                    </div>

                    <div className="d-grid text-center">
                        <button className="btn btn-classic btn-sm my-2" onClick={register}>Create Account</button>
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

export default PayeeRegister
