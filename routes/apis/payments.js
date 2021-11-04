const express = require('express');
const router = express.Router();
const Payments = require('../../models/Payments');
const Agent = require('../../models/Agents');
const Payee = require('../../models/Payee');
const auth = require('../../middleware/auth');

 

//@route GET api/payments/verify
//@desc Gets all tax payers registered in the system
//@access Private*
router.get('/verify', (req, res) =>{
    const phone = req.query.phone;
    console.log(phone)
    if(!phone){
        res.json({
            msg: 'Payment Failed: Still pending'
        })        
    }else{
        Payments.update(
            { remark: 'paid' },
            { where: { tel_no: phone} }
        )
        .then(res =>{
            res.json({
                paid: 'true',
                msg:'Payment:successful and remark:Paid'
            }) 
        })          
               
    }
});





//@route GET api/payments
//@desc Gets all tax payers registered in the system
//@access Private*
router.get('/', auth, (req, res) => {
    Payments.findAll()
    .then(payments=>{
        if(!payments){
            res.status(404).json("There was an unknown error")
        }else{
            console.log(payments);
            res.status(200).json({payments})
        }        
    })
   
});




//@route GET api/payments/daily
//@desc Gets all transaction registered to a particular Agent
//@access Private*
router.get('/daily', auth, (req, res) => {
    const id = req.query.id;
    const date = req.query.date;
    Agent.findOne({
        attributes:['full_name'],
        where:{
            agent_id : id
        }
    }).then(agent =>{
        const collector = agent.dataValues.full_name
        console.log(agent.dataValues.full_name)
        Payments.findAll({
            where : {
                date,
                collector
            }
        })
        .then(revenue=>{
            if(!revenue){
                res.status(404).json("There was an unknown error")
            }else{
                console.log(revenue);
                res.status(200).json(revenue)
            }        
        })
    })
   
});





//@route POST api/payments/new
//@desc RECORDS NEW PAYMENT
//@access Private*
router.post('/new', auth, (req, res) => {
    const newPayment = req.body;
    const paytype = newPayment.payment_type;
    const amountLd = newPayment.amount;
    const amount = amountLd/100
    console.log(amount);
    console.log(newPayment);



    const momoPayment = {
        date: newPayment.date,
        time: newPayment.time,
        reference_no: newPayment.ref_no,
        tel_no: newPayment.tel_no,
        payee_name: newPayment.payee_name,
        payment_type:newPayment.payment_type,
        reason:newPayment.reason,
        amount: amount,
        email: newPayment.email,
        collector: newPayment.collector,
        remark: 'pending-payment'
    };

    const cashPayment = {
        date: newPayment.date,
        time: newPayment.time,
        reference_no: newPayment.ref_no,
        tel_no: newPayment.tel_no,
        payee_name: newPayment.payee_name,
        payment_type:newPayment.payment_type,
        reason:newPayment.reason,
        amount: amount,
        email: newPayment.email,
        collector: newPayment.collector,
        remark: 'paid'
    };

    if(paytype === 'cash'){
        Payments.create(cashPayment)
        .then( entry => {
            if(!entry){
                res.status(400).json('payment failed')
                console.log(entry);
                }else{
                res.status(200).json(entry)
                console.log(entry);
            }
        })
    }else{
        Payments.create(momoPayment)
        .then( entry => {
            if(!entry){
                res.status(400).json('payment failed')
                console.log(entry);
                }else{
                    const payment = entry.dataValues;
                    const {
                        transaction_id, 
                        date, 
                        time, 
                        reference_no, 
                        tel_no, 
                        payee_name, 
                        payment_type, 
                        reason, 
                        amount, 
                        email, 
                        collector
                     } = payment

                     const amountPyble = amount*100;

                     const data = {
                         transaction_id,
                         date,
                         time,
                         reference_no,
                         tel_no,
                         payee_name,
                         payment_type,
                         reason,
                         amount:amountPyble,
                         collector
                     }

                res.status(200).json(data)
                console.log(entry);
            }
    })

    }
    
   
});




//@route GET api/payments/getpayee
//@desc Gets all tax payers registered in the system
//@access Private*
router.get('/getpayee', auth, (req, res) =>{
    const tel = req.query.phone;
    Payee.findOne({
            attributes:['full_name'],
            where : {
                tel
            }
    }).then((name)=>{
        console.log(name)
        if(!name){
            res.status(200).json({msg:"Unregistered"})
        }else{
            res.status(200).json({
                msg:"Registered",
                name: name
            })
        }
        
    })

})



module.exports = router;