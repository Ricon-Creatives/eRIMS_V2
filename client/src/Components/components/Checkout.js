import React,{useState,useEffect} from 'react'
import logo from "../../logo-03.png";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {v1 as uuid} from "uuid";
import moment from 'moment';
import swal from 'sweetalert';

const Checkout = () => {
  const history = useHistory();

  const [momoNumber, setMomo] = useState('')
  const [fullname, setFullname] = useState('')
  const [payType, setPayType] = useState('')
  const [reason, setReason] = useState('')
  const [amount, setAmount] = useState('')






  const submit = (e) =>{
  e.preventDefault();
  const validAmount = amount *100;

  const today = moment();
  const now = moment(today).format("hh:mm:ss a");
  console.log(`date: ${today} and time: ${now}`)
  const reference_no = uuid()

  const token = JSON.parse(localStorage.getItem('token'))
  const agent = JSON.parse(localStorage.getItem('agent'))
  console.log(token)

  const collector = agent.name

  const newPayment = {
    date:today,
    time:now,
    tel_no:momoNumber,
    payee_name:fullname,
    payment_type:payType,
    ref_no:reference_no,
    reason,
    amount:validAmount,
    collector
  }

  const options = {
    headers:{
      'x-auth-token':token
    }
  }

  localStorage.removeItem('payeedata')

  axios.post('api/payments/new',newPayment,options).then((res) =>{
    console.log(res.data)
    const payeeData = res.data
    const {payment_type, payee_name} = payeeData;

    if(payment_type === 'cash'){
      swal(`${payee_name}'s`," payment has been recorded successfully", "success");
      history.push("/dashboard")
    }else{      
      localStorage.setItem('payeedata',JSON.stringify(payeeData))
      history.push("/paygate");
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
                        <input type="text" id="momoNumber" placeholder="Momo Number" name="momoNumber" className="myInput form-control" 
                        value={momoNumber} onChange={e =>setMomo(e.target.value)} required/>
                      </div>
                      <div className="mb-3">
                        <input type="text" id="fullname" placeholder="Full Name" name="myInput fullname" className="myInput form-control" 
                        value={fullname} onChange={e => setFullname(e.target.value)} required/>
                      </div>

                      <div className="mb-3">
                      <select className="form-select form-select-sm" value={payType} onChange={e => setPayType(e.target.value)}>
                            <option value="" disabled>Payment Type</option>
                            <option value="cash">Cash</option>
                            <option value="momo">Momo</option>
                            <option value="bank">Bank</option>
                            <option value="qr-code">Qr-code</option>
                        </select>
                      </div>

                      <div className="mb-3">
                      <select className="myInput form-select form-select-sm" value={reason} onChange={e => setReason(e.target.value)}>
                            <option value="" disabled>Reason For Payment</option>
                            <option value="property-tax">Property Tax</option>
                            <option value="sewage-fee">Sewage Fee</option>
                            <option value="value-added-tax">Value Added Tax</option>
                        </select>
                      </div>
                     
                      <div className="mb-3">
                        <input type="text" id="amount" placeholder="Amount" name="amount" value={amount} className="myInput form-control" 
                        onChange={e => setAmount(e.target.value)} required/>
                      </div>
                      <div className="card-foter d-grid gap-2">
                        <button type="button" className="btn btn-classic btn-sm my-4" onClick={submit}>Make Payment</button>
                      </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
