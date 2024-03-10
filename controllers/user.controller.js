const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function signUp(req, res) {

    models.User.findOne({where:{email:req.body.email}}).then(result => {
        if(result){
            res.status(409).json({
                message:"Email already exists"
            })

        }else {
                    
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(req.body.password, salt, function(err, hash){
                
                    const user = {
                        name: req.body.name,
                        email:req.body.email,
                        password:hash
                    }

                    models.User.create(user)
                    .then(result => {
                        res.status(201).json({
                            message: "User created successfully"
                        })
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: "Something went wrong"
                        })
                    })

                })

            })

        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong"
        })
    })
}

function login(req, res){
    models.User.findOne({where:{email: req.body.email}})
    .then(user => {
        if(user === null){
            res.status(404).json({
            message: "Invalid credentials"
            })

        } else {
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId:user.id
                    }, process.env.JWT_KEY, function(err, token){
                            res.status(200).json({
                            message: "Authentication Successful!",
                            token: token
                        })
                    })

                }else {
                    res.status(500).json({
                        message: "Invalid credentials"
                    })
                }

            })

        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            req:JSON.stringify(req.body)
        })

    });

}


module.exports = {
    signUp: signUp,
    login:login
}