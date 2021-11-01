const express = require('express');
const router = express.Router();
const Payments = require('../../models/Payments');
const Agent = require('../../models/Agents')
const auth = require('../../middleware/auth')


//@route GET api/payee
//@desc Gets all tax payers registered in the system
//@access Private*
router.get('/', (req, res) => {
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