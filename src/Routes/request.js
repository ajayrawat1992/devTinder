const express =require ('express')
const {userAuth}=require('../middlewares/auth')
const requestRouter=express.Router()

requestRouter.get('/connectionrequest',userAuth,(req,res)=>
    {
      const user=req.user
  
      console.log(user)
      res.send(user.firstName+" sent the request")
    })
  

module.exports=requestRouter