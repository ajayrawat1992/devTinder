const express=require('express')
const {connectDB}=require('./config/Database.js')
 const cookieParser=require('cookie-parser')

const app=express()

app.use(express.json())   //express.json() middleware will convert JSON object into JavaScript object and  adds the javascript object onto req.body 
app.use(cookieParser())  //req.cookies will give undefined without using it


const authRouter=require('./Routes/auth.js')
const profileRouter=require('./Routes/profile.js')
const requestRouter=require('./Routes/request.js')

app.use('/',authRouter)         //here   authrouter works as a middleware
app.use('/',profileRouter)
app.use('/',requestRouter)


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


 // delete user data 

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

//update a data using Patch request

//   app.patch('/user/:userId',async (req,res)=>
//   {    
//     //const userId=req.body._id
//     const userId=req.params?.userId  // req.params.userId is used to retrieve the value of a dynamic parameter (often part of the URL) from a request.  
//     const data=req.body

//     console.log(data)
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

