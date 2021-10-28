const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Agent = require('../../models/Agents');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');


//@route GET api/user
//@desc Gets all Agents registered in the system
//@access Public*
router.get('/', auth, (req, res) => {
    
});


//@route POST api/user/register
//@desc REGISTERS NEW Agent
//@access Public*
router.post('/register', auth, (req, res) => {
    const {first_name, last_name, username, email, tel_no, password, user_rank, 
           age, ids, gender, assigned_device, assigned_areas, superagent} = req.body;

    const full_name = first_name + ' ' + last_name;
    //validate input
    if(!first_name || !last_name || !tel_no || !password || !user_rank || !age || !gender || !assigned_device || !assigned_areas ){
        return res.status(400).json("Please Provide All Required Registration Details")
    }
    //check for already existing user
    User.findOne({
        where :{
            tel_no
        }
    }).then(user=>{
        if(user){
            return res.status(400).json("User Already Exists")
        }

        //if user doesnt exist continue and register
        const newUser = new User({
            first_name,
            last_name,
            username,
            email,
            tel_no,
            password,
            user_rank
        });


        //Create Salt & Hash
        bcrypt.genSalt(10, (err,salt) =>{
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user =>{
                    //Dealing with all the data that belongs in the agent table
                    const newAgent = new Agent({
                        agent_id: user.user_id,
                        full_name: full_name,
                        age: age,
                        tel_no: user.tel_no,
                        ids: ids,
                        gender: gender,
                        assigned_device: assigned_device,
                        assigned_areas: assigned_areas,
                        average_collection_ytd: null,
                        agent_or_superagent: superagent
                    });
                    newAgent.save()
                    .then(agent =>{                       
                        console.log({user}, {agent})
                    })
                    //signing the jwt token and prepping the server response
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
        })
    })
   
});



module.exports = router;