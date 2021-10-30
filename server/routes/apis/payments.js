const express = require('express');
const router = express.Router();
const Payments = require('../../models/Payments');
const auth = require('../../middleware/auth')


//@route GET api/payee
//@desc Gets all tax payers registered in the system
//@access Private*
router.get('/daily', (req, res) => {
    const date = new Date()
    const today = req
    Payments.findAll({
        where 
    })
    .then(payments=>{
        if(!payments){
            res.status(404).json("There was an unknown error")
        }else{
            console.log(payments);
            res.status(200).json({payments})
        }        
    })
   
});


//@route POST api/payments/new
//@desc RECORDS NEW PAYMENT
//@access Private*
router.post('/new', auth, (req, res) => {
    const newPayment = req.body;
    console.log(newPayment);
    Payments.create({
        date: newPayment.date,
        time: newPayment.time,
        reference_no: newPayment.ref_no,
        tel_no: newPayment.tel_no,
        payee_name: newPayment.payee_name,
        payment_type:newPayment.payment_type,
        reason:newPayment.reason,
        amount: newPayment.amount,
        email: newPayment.email,
        collector: newPayment.collector

    })
    .then( entry => {
        if(!entry){
            res.status(400).json('payment failed')
            console.log(entry);
            }else{
            res.status(200).json(entry)
            console.log(entry);
        }
    })
   
});



module.exports = router;