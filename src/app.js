const express=require('express')
const {connectDB}=require('./config/Database.js')
//const {adminAuth,userAuth}=require('./middlewares/auth.js')
const {User}=require('./models/users.js')

const app=express()

app.use(express.json())   //express.json() middleware will convert JSON object into JavaScript object and  adds the javascript object onto req.body 

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

  