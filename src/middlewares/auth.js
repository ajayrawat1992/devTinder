const jwt=require('jsonwebtoken') 
const { User } = require('../models/users')


    const userAuth= async (req,res,next)=>
        {
            try {

            const cookies =req.cookies // here we are reading the cookies
            const {token}=cookies

            if(!token)
            {
                throw new Error("Invalid token @@@!!!!!")
            }
            
            const decodedObj= jwt.verify(token,'Dev@123')
            const {_id}=decodedObj
          // console.log("id  is......",_id)
            const user= await User.findById(_id)

            if(!user)
            {
            throw new Error("user not found")
            }

            req.user=user
            next()
                
            } catch (error) {
                res.status(400).send("Error:::"+error.message)
            }
        
        }

    module.exports={userAuth}