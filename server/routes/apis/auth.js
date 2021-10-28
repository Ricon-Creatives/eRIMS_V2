const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Agent = require('../../models/Agents');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


//@route POST api/user/register
//@desc Authenticates System Users
//@access Public*
router.post('/', (req, res) => {
    const {tel_no, password } = req.body;

    //validate input
    if(!tel_no || !password){
        return res.status(400).json("Please Provide Login Details")
    }
    //check for already existing user
    User.findOne({
        where :{
            tel_no
        }
    }).then(user=>{
        if(!user){
            return res.status(400).json("User Does Not Exist")
        }
        //Validate Password
        bcrypt.compare( password, user.password )
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({ msg:"Invalid Credentials"});
            jwt.sign(
                {id:user.user_id},
                config.get('jwtSecret'),
                {expiresIn: 3600},
                (err, token) =>{
                    if(err) throw err;
                    res.status(200).json({
                        token,
                        user :{
                            id:user.user_id,
                            name: `${user.first_name} ${user.last_name}`,
                            phone: user.tel_no,
                            userlevel: user.user_rank,
                            last_seen: user.last_seen                                  
                        }
                    });

                }
            )

        })

    })
   
});



module.exports = router;