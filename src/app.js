const express=require('express')
const {connectDB}=require('./config/Database.js')
//const {adminAuth,userAuth}=require('./middlewares/auth.js')
const {User}=require('./models/users.js')


const app=express()

app.use(express.json())   //express.json() middleware will convert JSON object into JavaScript object and  adds the javascript object onto req.body 



//get user by emailid
app.get('/user',async (req,res)=>
{
    const userEmail=req.body.emailid
    
    try {       
        console.log(userEmail)
        const user=await User.findOne({emailid:userEmail})
        if (!user) {
            res.status(404).send("user not found")
        }
       // console.log(user)
       else{res.send(user)}
        
        
    } catch (error) {
        console.error('Error: ',error)
       res.status(400).send(error.message)
    }
})

//get user by ID
app.get('/id',async (req,res)=>
{
    try {
        const userId=req.body._id
      //  console.log(userId)
        const  user=await User.findOne({_id:userId})      
       res.send(user) 
    } catch (error) {
       res.status(404).send("user not found")        
    }
})
  // delete user data 
app.delete('/user',async(req,res)=>
    {
      const userID=req.body.userId
      console.log(userID)
      try {
        const user=await User.findByIdAndDelete(userID)
        console.log(user)
        res.send("data deleted successfully")
      } catch (error) {
        res.status(404).send("user not found")
      }
    })

//get all the users  from the database
app.get('/feed',async (req,res)=>
{
    try {
          const users=await User.find({})
          res.send(users)
    } catch (error) {
        console.error('Error: ', error)
        res.status(400).send(error.message)
        
    }
})

 //  save data in Database by POST request
app.post('/signup', async (req,res)=>
{
    // console.log(req.body)
    const user=new User(req.body)      // here we created new instance of User model by passing dummy data
    
    try {
        await user.save()     //saving data in database  //user.save() always returns promise
        res.send("data saved successfully")
        
    } catch (error) {
     res.status(400).send(error.message)        
    }
    })

    
// update a data using Patch request
app.patch('/user',async (req,res)=>
{
  try {
    const userEmailId=req.body.emailid
    console.log(userEmailId)
    const data=req.body 
    const user=await User.findOneAndUpdate({emailid:userEmailId},data, {returnDocument:"after"})
    res.send(user)

  } catch (error) {
        res.status(404).send("something went wrong")
  }
   
})



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



//The right way is first we have to connect to the database  ...then start listening to the API calls (start  server )
 //   for ex. the users have started hitting to the API request and the database   has not started yet. So it will create problems
  // so first connect to the database and then call app.listen().Thats why we have written connectDB function in app.js

  