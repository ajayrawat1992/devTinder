const express = require('express')
const bcrypt=require('bcrypt')
const authRouter=express.Router()
const {validatorSignUp} =require('../utils/validation')
const {User} =require('../models/users')

 //  save data in Database by POST request
 authRouter.post('/signup', async (req,res)=>
    {
    
        try {     
    
       validatorSignUp(req)                                   // validating the incoming data
       const {firstName,lastName,emailid,password}=req.body
       const hashPassword= await bcrypt.hash(password,10)        //encrypting the password 
       
          
          const user=new User({firstName,lastName,emailid,password:hashPassword})    // here we created new instance of User model by passing dummy data
             
            await user.save()                                     //  saving data in database  //user.save() always returns promise
            res.send("data saved successfully")
            
        } catch (error) {
         res.status(400).send("Error : "+error.message)
        }
        })    

//Login 
authRouter.post('/login', async(req,res)=>
          {
            try {
              const {emailid,password}=req.body
             
             const userData= await User.findOne({emailid:emailid})
        
             if(!userData)
            {
             throw new Error("Invalid credentials")
            }
              //const isPasswordValid= await bcrypt.compare(password,userData.password)
              const isPasswordValid =await userData.validatePassword(password)
            if(isPasswordValid)
            {
              const token= await userData.getJWT()  // This function can now be called directly on user instance (ex.pritam user )
        
          //const token= jwt.sign({_id:userData._id},'Dev@123',{expiresIn:'7d'})   // expire option in token level
          console.log('token::: ',token)
           res.cookie('token',token,{expires: new Date(Date.now() + 1 * 3600000)})   //// expire option in cookie level
          //console.log(token)
          res.send("Login successful !!!!!")
        }
        else{
          throw new Error("Invalid credentials")
        }              
            } catch (error) {
               res.status(400).send("Error : " +error)
            }
         })
        


   module.exports=authRouter