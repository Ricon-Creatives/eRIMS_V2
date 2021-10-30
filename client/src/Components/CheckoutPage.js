import React from 'react';
import { useEffect, useState } from 'react';
import { PaystackButton } from 'react-paystack';
import Logo from '../logo-03.png'
import '../Styles/FormMain.css'
import { Col, Form, FormGroup, Label, Input, Container } from 'reactstrap';



const CheckoutPage = () => {
        
    const publicKey = "pk_test_ea56daae18789f1cdf60d1e3efeddd18a412b9d8";
    
    const [amount, setAmount] = useState("");
    const [payee_name, setName] = useState("");
    const [tel_no, setPhone] = useState("");
    const [email, setEmail] = useState("andreakumah@gmail.com");

    const fetchPayeeDeets = () =>{
        const payeeDeets = JSON.parse(localStorage.getItem('payeedata'));
        console.log(payeeDeets)
        const {payee_name, amount, tel_no} = payeeDeets;
        setName(payee_name);
        setAmount(amount);
        setPhone(tel_no);
        setEmail(email);
        
        console.log(`${payee_name}, ${amount}, ${tel_no}`);    
    }


    useEffect(() =>{
        fetchPayeeDeets();
        console.log(`${payee_name}, ${amount}, ${tel_no}`)
    }, []);


    const componentProps = {
        email:'andreakumah@gmail.com',    
        amount,    
        metadata: {    
          payee_name,    
          tel_no
        },    
        publicKey,    
        text: "Pay Now",  
        className:"btn btn-classic btn-sm my-4",  
        onSuccess: () =>    
            alert("Thanks for doing business with us! Come back soon!!"),    
        onClose: () => 
            alert("Transaction failed, Please try again"),    
      }
   


    return (
        
        <div className="container">
        <div className="row justify-content-center align-middle py-5">
            <div className="col-md-4 my-5">
                <div className="card card-signup z-depth-1 p-2">
                    <div className="card-body text-center">
                    <img src={Logo} className="logo img-fluid"/>
                    

                        <form>
                            <div className="mb-3">
                                
                                <input className="form-control border-0 border-bottom" value={payee_name} type="text" name="name" id="name" placeholder={`${payee_name}`} disabled/>

                            </div>

                            <div className="mb-3">
                                
                                <input className="form-control border-0 border-bottom" value={amount} type="text" name="amount" id="amount" placeholder={`${amount}`} disabled/>

                            </div>

                            <div className="mb-3">

                                <input className="form-control border-0 border-bottom" value={tel_no} type="text" name="tel_no" id="tel_no" placeholder={`${tel_no}`} disabled/>

                            </div>

                        </form>
                    <div className="card-foter d-grid gap-2">
                        <PaystackButton {...componentProps} />
                    </div>

            </div>
    
                </div>
            </div>
        </div>
    </div>

       
    )
}

export default CheckoutPage
