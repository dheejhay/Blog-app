require('../../models/mongooseConnection')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const serverResponse = (status = 200) => ({
    success: true,
    message: "",
    data: [],
    status: status
})

exports.register = async(req, res)=> {
    let response = serverResponse()
    try {
        const confirmPassword = req.body.password === req.body.confirm_password;
        if(confirmPassword){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const users  = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });
            await users.save()
            response.data = users
            response.message = "Registration Successful"
        } else {
            response.status = 400
            response.message = "Registration unsuccessful"
        }
    } catch (error) {
        console.log(error)
    }  
    return res.status(response.status).json(response)
}

exports.login = async(req, res)=> {
    
    let response = serverResponse()
    try{
        const user = await User.findOne({username: req.body.username})
        if(user){
            const verifyPassword = await bcrypt.compare(req.body.password, user.password)
            if(verifyPassword){
                const payload ={
                    id:user._id,
                    username:user.username,
                    email:user.email
                }
                const access_token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"30m"}); 
                delete payload.email;   
                const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "1h"})
                    res.cookie("refreshToken", refresh_token, {maxAge: 216000, secure: true, httpOnly:true})
                    feedback={user, access_token, refresh_token}
                response.data = feedback
                response.message = "login successful"
            } else{
                response.status = 400
                response.message = "Login failed"
            }
        } else{
            response.status = 400
            response.message = "Login not Successful"
        }
    }catch(error){
        console.log(error)
    }
    console.log(response)
    return res.status(response.status).json(response) 
}

exports.refresh = async(req, res)=> {
    let response = serverResponse();
    try {
        const refreshToken = req.cookies.refreshToken;
        const verifyRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const user = await User.findOne({token:refreshToken})
        if (user){
            const verifyPassword = await bcrypt.compare(req.body.password, user.password)
            if(verifyPassword){
                const payload ={
                    id:user._id,
                    username:user.username,
                    email:user.email
                }
                const access_token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"1h"}); 
                delete payload.email;   
                const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "1h"})
                    feedback={user, access_token}
                    res.cookie("refreshToken", refresh_token, {maxAge: 216000, secure: true, httpOnly:true})
                response.data = feedback
            } else{
                response.status = 400
                response.message = "Login failed"
            }
        } else{
            response.status = 400
            response.message = "Login not Successful"
        }
        }
     catch (error) {
        console.log(error)
    }
}

exports.logout = async(req, res)=> {
    let response = serverResponse(201)
    req.logout();
    res.status(response.status).json(response)
}

exports.profile = async(req, res)=> {
    let response = serverResponse()
    const user = await User.findById({_id:req.user.id})
    response.data = user 
    res.status(response.status).json(response)
}

exports.editProfile = async(req, res)=> {
    let response = serverResponse()
    // const user = await User.findById({_id:req.user.id})
    
    const user= await User.updateOne({_id:req.user.id},req.body)
    response.data = user
    res.status(response.status).json(response)
}

exports.changePassword = async(req, res)=> {
    let response = serverResponse()
    const user = await User.findById({_id:req.user.id})
    if(user){
        let initialpassword = await bcrypt.compare(req.body.current_password,user.password);
        if (initialpassword) {
            if(req.body.new_password === req.body.confirm_password){
                try {
                    const newhashed = await bcrypt.hash(req.body.new_password, 10);
                    user.password = newhashed
                    await user.save() 
                    response.data= user
                } catch (error) {
                    console.log(error)
                } 
            }else {
                response.status = 400
                response.message = "Comparing password failed"
            } 
        } else  {
            response.status = 400
            response.message = "Couldn't get initial password"
        }    
    } else {
        response.status = 400
    }
    
    res.status(response.status).json(response)
}

exports.index = async(req, res)=> {
    let response = serverResponse()
    const users = await User.find({})
    response.data = users;
    res.status(response.status).json(response)
}

exports.forgotPassword = async(req, res)=> {
    let response = serverResponse()
    console.log(req.user)
    // const user = await User.findOne({name:req.user.name})

		// const hashed = await bcrypt.hash( password, 10);
		// user.password = hashed
		// await user.save()
        // response.data = user.password

    res.status(response.status).json(response)
}
