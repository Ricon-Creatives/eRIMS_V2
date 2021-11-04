import React,{useState,useEffect} from 'react'
import logo from "../../logo-03.png";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {v1 as uuid} from "uuid";
import moment from 'moment';
import swal from 'sweetalert';
import { PaystackButton } from 'react-paystack';


const Checkout = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const history = useHistory();
  const publicKey = "pk_live_859e5e52b848e1dc3c36600cdc451fe96b8a1394";
  const currency = 'GHS';
  const channels = ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
  const [amount, setAmount] = useState("");
  const [momoNumber, setMomo] = useState("");
  const [reason, setReason] = useState("");
  const [fullname, setFullname] = useState("");
  const [payType, setPayType] = useState("");
  const [isCash, setIsCash] = useState(false);

    

  const submit = (e) =>{
    e.preventDefault();  
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
      amount,
      collector,
      remark:'paid'
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
      const {payment_type, payee_name, tel_no} = payeeData;
  
      if(payment_type === 'cash'){
        swal(`${payee_name}'s`," payment has been received successfully", "success");
        history.push("/payment-table")
      }else{      
        localStorage.setItem('payeedata',JSON.stringify(payeeData))
        history.push("/paygate");
      }
  
    })
    }


    const completePayment = () =>{
      submit();
      history.push("/payment-table")
    }

    
    
    const componentProps = {
      email:'andreakumah@gmail.com',    
      amount: amount*100,
      currency,
      channels,
      metadata: {    
        fullname,    
        tel_no: momoNumber        
      },    
      publicKey,    
      text: "Pay On Digital Portal",  
      className:"btn btn-classic btn-sm my-4",  
      onSuccess: () => 
              completePayment(),
      onClose: () => 
              swal("Failed"," Please try making the transaction again ", "error"),    
    }
 




    useEffect(() =>{

    }, []);




    let button;
    if(isCash === true){
          button = <button className="btn-classic" onClick={ submit }>Pay Now</button>
    }else{
          button =  <PaystackButton {...componentProps} />
    }




    const verify = () =>{
      const momo = momoNumber;
      const options = {
        params:{
          phone : momo
        },
        headers:{
          'x-auth-token':token
        }
      }
    
      axios.get('api/payments/getpayee',options)
      .then((res) =>{
        const payee = res.data;
        const {msg, name} = payee
        console.log(name);
        if(msg === 'Registered'){
            setFullname(name.full_name)
        }else{
          setFullname('Unregistered')
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
                        
                        <div className="row col-md-12">
                          <div className="col-md-9">
                            <input type="text" id="momoNumber" placeholder="Momo Number" name="momoNumber" className="myInput form-control" 
                                value={momoNumber} onChange={e =>setMomo(e.target.value)} required/>
                          </div>
                          <div className="col-md-3">
                                <button className="btn-classicals" onClick={verify}>Verify</button>
                          </div>
                        </div>

                      <div className="mb-3">
                        <input type="text" id="fullname" placeholder="Full Name" name="myInput fullname" className="myInput form-control" 
                        value={fullname} onChange={e => setFullname(e.target.value)} required/>
                      </div>

                      <div className="mb-3">
                      <select className="form-select form-select-sm" value={payType} onChange={e => setPayType(e.target.value)}>
                            <option value="" disabled>Payment Type</option>
                            <option value="cash" onClick={() => setIsCash(true)}>Cash</option>
                            <option value="momo" onClick={() => setIsCash(false)}>Momo</option>
                            <option value="bank" onClick={() => setIsCash(false)}>Bank</option>
                            <option value="qr-code" onClick={() => setIsCash(false)}>Qr-code</option>
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
                        {button}
                      </div>                      
                    </div>
                 </div>
               </div>
            </div>
        </div>
    )
}

export default Checkout
