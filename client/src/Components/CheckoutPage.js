import React from 'react';
import { useEffect, useState } from 'react';
import { PaystackButton } from 'react-paystack';
import Logo from '../logo.png'
import '../Styles/FormMain.css'
import { Col, Form, FormGroup, Label, Input, Container } from 'reactstrap';;



const CheckoutPage = () => {
        
    const publicKey = "pk_test_eec39cbfc76d18333db8e6c36cf0ad9cfd864c65";
    
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const fetchPayeeDeets = () =>{
        const payeeDeets = JSON.parse(localStorage.getItem('payeedata'));
        console.log(payeeDeets)
        const {name, email, amount, phone} = payeeDeets;
        setName(name);
        setAmount(amount);
        setPhone(phone);
        setEmail(email)
        console.log(`${name}, ${amount}, ${phone}, ${email}`);    
    }


    useEffect(() =>{
        fetchPayeeDeets();
        console.log(`${name}, ${amount}, ${phone}, ${email}`)
    }, []);


    const componentProps = {
        email,    
        amount,    
        metadata: {    
          name,    
          phone,    
        },    
        publicKey,    
        text: "Pay Now",  
        className:"paystack_button",  
        onSuccess: () =>    
            alert("Thanks for doing business with us! Come back soon!!"),    
        onClose: () => 
            alert("Transaction failed, Please try again"),    
      }
   


    return (
        
            <div className="container middler">

                <div className="item">

                    <div className="overlay-effect"></div>
                    <img

                        className="item-image"
                        src={Logo}
                        alt="product"
                        height="200px"
                    />

                    <div className="item-details">
                        
                    </div>

                </div>


                <div className="checkout">

                    <div className="checkout-form">
                        <form>
                            <div className="checkout-field">
                                
                                <label>Name</label>
                                <input className="myInput" value={name} type="text" name="name" id="name" placeholder={`${name}`} disabled/>

                            </div>

                            <div className="checkout-field">
                                
                                <label>Amount</label>
                                <input className="myInput" value={amount} type="text" name="amount" id="amount" placeholder={`${amount}`} disabled/>

                            </div>

                            <div className="checkout-field">

                                <label>Phone</label>
                                <input className="myInput" value={phone} type="text" name="phone" id="phone" placeholder={`${phone}`} disabled/>

                            </div>

                            <div className="checkout-field">

                                <label>Email</label>
                                <input className="myInput" value={email} type="text" name="email" id="email" placeholder={`${email}`} disabled/>

                            </div>

                        </form>

                    </div>
                    <PaystackButton {...componentProps} />

                </div>

            </div>

       
    )
}

export default CheckoutPage
