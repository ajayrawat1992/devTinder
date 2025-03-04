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
      const userName=req.body.firstName
      console.log(userName)
      try {
        const user=await User.deleteMany({firstName:userName})
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
        const user=new User(req.body)    // here we created new instance of User model by passing dummy data
    // console.log(req.body)
  
    try {     

      if(user.firstName.length > 15)
      {
        throw new Error("Enter proper firstname")
      }    
      
        await user.save()             //  saving data in database  //user.save() always returns promise
        res.send("data saved successfully")
        
    } catch (error) {
     res.status(400).send("Error : "+error.message)        
    }
    })


// update a data using Patch request
  app.patch('/user/:userId',async (req,res)=>
  {
    
    //const userId=req.body._id
    const userId=req.params?.userId  // req.params.userId is used to retrieve the value of a dynamic parameter (often part of the URL) from a request.  
    const data=req.body 
    //console.log(data)
    try {
        const ALLOWED_UPDATES=['skills','Age','gender']

          const isUpdateAllowed=Object.keys(data).every(k=>ALLOWED_UPDATES.includes(k))
          console.log(isUpdateAllowed)      // this is API level updation...ex. if we dont want to update emailid 

          if(!isUpdateAllowed)
          {
              throw new Error("update not allowed")
          }
          if(data?.skills.length > 10)
          {
            throw new Error(" Skills Exceeded Maximum length")
          }
         
    
    const user=await User.findByIdAndUpdate({_id:userId},data,
       {returnDocument:"after",runValidators:true})      //By default, it will return the document before the update was applied.
       res.send(user)

  } 
  catch (error) {
        res.status(404).send("update failed : "+error.message)
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

  