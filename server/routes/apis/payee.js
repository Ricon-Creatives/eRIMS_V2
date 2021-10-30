const express = require('express');
const router = express.Router();
const Payee = require('../../models/Payee');
const auth = require('../../middleware/auth');


//@route GET api/payee
//@desc Gets all tax payers registered in the system
//@access Private*
router.get('/', auth, (req, res) => {
    Payee.findAll()
    .then(payees=>{
        if(!payees){
            res.status(404).json("There was an unknown error")
        }else{
            console.log(payees);
            res.status(200).json({payees})
        }        
    })
   
});


//@route POST api/payee/register
//@desc REGISTERS NEW PAYEES
//@access Private*
router.post('/register', auth, (req, res) => {
    const newPayee = req.body;
    console.log(newPayee);
    const full_name = newPayee.firstname + ' ' + newPayee.surname;
    console.log(full_name)
    const tel = newPayee.tel1 + ', ' + newPayee.tel2;
    const ids = newPayee.id_type_1 + ': ' + newPayee.id_number_1 + ', ' + newPayee.id_type_2 + ': ' + newPayee.id_number_2;
    Payee.create({
        full_name,           
        tel,
        ids,
        email:newPayee.email,
        tin_no:newPayee.tin_no,
        dob:newPayee.dob,
        gender:newPayee.gender ,
        marital_status: newPayee.maritalstat,
        education_level:newPayee.educ ,
        business_sector:newPayee.busisect,
        market_segment: newPayee.marketseg,
        location: newPayee.address,
        customer_type: newPayee.customertype,
        tax_type:newPayee.tax_type,
        dob:newPayee.dob    
    })
        .then( confirmation => {
            if(!confirmation){
                res.status(400).json('registration failed')
                console.log(confirmation);
            }else{
                res.status(200).json(`Tax-Payer registered successfully, details : ${confirmation}`)
            }
        }).catch(function(err) {
            // print the error details
            console.log(err);
        });  
   
});



module.exports = router;