const express=require('express')
const {connectDB}=require('./config/Database.js')
const {userAuth}=require('./middlewares/auth.js')
const {User}=require('./models/users.js')
const   {validatorSignUp}=require('./utils/validation.js')
const bcrypt  = require('bcrypt')
 const cookieParser=require('cookie-parser')
 const jwt=require('jsonwebtoken')

const app=express()

app.use(express.json())   //express.json() middleware will convert JSON object into JavaScript object and  adds the javascript object onto req.body 
app.use(cookieParser())  //


//get user by emailid
// app.get('/user',async (req,res)=>
// {
//     const userEmail=req.body.emailid
    
//     try {       
//         console.log(userEmail)
//         const user=await User.findOne({emailid:userEmail})
//         if (!user) {
//             res.status(404).send("user not found")
//         }
//        // console.log(user)
//        else{res.send(user)}
        
        
//     } catch (error) {
//         console.error('Error: ',error)
//        res.status(400).send(error.message)
//     }
// })

// //get user by ID
// app.get('/id',async (req,res)=>
// {
//     try {
//         const userId=req.body._id
//       //  console.log(userId)
//         const  user=await User.findOne({_id:userId})      
//        res.send(user) 
//     } catch (error) {
//        res.status(404).send("user not found")        
//     }
// })
//   // delete user data 

// app.delete('/user',async(req,res)=>
//     {
//       const userName=req.body.firstName
//       console.log(userName)
//       try {
//         const user=await User.deleteMany({firstName:userName})
//         console.log(user)
//         res.send("data deleted successfully")
//       } catch (error) {
//         res.status(404).send("user not found")
//       }
//     })


// //get all the users  from the database
// app.get('/feed',async (req,res)=>
// {
//     try {
//           const users=await User.find({})
//           res.send(users)
//     } catch (error) {
//         console.error('Error: ', error)
//         res.status(400).send(error.message)
        
//     }
// })


//Login 
app.post('/login', async(req,res)=>
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

 //  save data in Database by POST request
app.post('/signup', async (req,res)=>
{

    try {     

   validatorSignUp(req)                                   // validating the incoming data
   const {firstName,lastName,emailid,password}=req.body
   const hashPassword= await bcrypt.hash(password,10)        //encrypting the password 
   //console.log("hashPassword",hashPassword)
      
      const user=new User({firstName,lastName,emailid,password:hashPassword})    // here we created new instance of User model by passing dummy data
         
        await user.save()                                     //  saving data in database  //user.save() always returns promise
        res.send("data saved successfully")
        
    } catch (error) {
     res.status(400).send("Error : "+error.message)
    }
    })

app.get('/profile',userAuth, async(req,res)=>
{
  try {
      const user=req.user
     // console.log('user........',user)
    res.send("reading cookies")
 
  } catch (error) {
    res.status(400).send("error :: "+error.message)
  }
  })


  app.get('/connectionrequest',userAuth,(req,res)=>
  {
    const user=req.user

    console.log("connection making................")
    res.send(user.firstName+" sent the request")
  })




// update a data using Patch request
//   app.patch('/user/:userId',async (req,res)=>
//   {    
//     //const userId=req.body._id
//     const userId=req.params?.userId  // req.params.userId is used to retrieve the value of a dynamic parameter (often part of the URL) from a request.  
//     const data=req.body
//     //console.log(data)
//     try {
//         const ALLOWED_UPDATES=['skills','gender']

//           const isUpdateAllowed=Object.keys(data).every(k=>ALLOWED_UPDATES.includes(k))
//           console.log(isUpdateAllowed)      // this is API level updation...ex. if we dont want to update emailid 

//           if(!isUpdateAllowed)
//           {
//               throw new Error("update not allowed")
//           }
//           if(data?.skills.length > 10)
//           {
//             throw new Error(" Skills Exceeded Maximum length")
//           }
         
    
//     const user=await User.findByIdAndUpdate({_id:userId},data,
//        {returnDocument:"after",runValidators:true})      //By default, it will return the document before the update was applied.
//        res.send(user)

//   } 
//   catch (error) {
//         res.status(404).send("update failed : "+error.message)
//      }
   
// })

connectDB()
.then(()=>
{
    console.log("connected to database")
    app.listen(3000,()=>
        {
          console.log('server created successfully')
        })
})
.catch(()=>
{
    console.log("database  cannot be connected")
})

