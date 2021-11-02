const express = require('express');
const router = express.Router();
const Payments = require('../../models/Payments');
const Agent = require('../../models/Agents');
const auth = require('../../middleware/auth');



//@route GET api/payments/verify
//@desc Gets all tax payers registered in the system
//@access Private*
router.get('/verify', auth, (req, res) =>{
    const email = req.query.email;
    const amount = req.query.amount;
    const phone = req.query.phone;
    console.log(`${phone},${email},${amount}`)
    const https = require('https')
    const params = JSON.stringify({
        "email": email,
        "amount": amount,
        "phone": phone
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: 'sk_test_1d93b2656eb99d3c3334977538d638cfe0dab00d',
            'Content-Type': 'application/json'
        }
    }

    const request = https.request(options, response => {
    let data = ''
    response.on('data', (chunk) => {
        data += chunk
    });
    response.on('end', () => {
        console.log(data);
        //const tel_no = data.customer.phone;
        if(data.status === 'success'){
            Payments.update({ remark: "paid" }, {
                where: {
                  tel_no
                }
            })
            console.log(JSON.parse(data));
            res.status(200).json({
                msg:'Payment:successful and remark:Paid',
                data
            })
        }else{
            res.json({
                msg: 'Payment:Incomplete and remark unchanged'
            })
        }
    })
    }).on('error', error => {
        console.error(error)
    })
    request.write(params)
    request.end()
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
    console.log(newPayment);

    const momoPayment = {
        date: newPayment.date,
        time: newPayment.time,
        reference_no: newPayment.ref_no,
        tel_no: newPayment.tel_no,
        payee_name: newPayment.payee_name,
        payment_type:newPayment.payment_type,
        reason:newPayment.reason,
        amount: newPayment.amount,
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
        amount: newPayment.amount,
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
                res.status(200).json(entry)
                console.log(entry);
            }
    })

    }
    
   
});



module.exports = router;