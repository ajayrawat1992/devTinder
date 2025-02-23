const express=require('express')


const app=express()

app.use('/user',(req,res,next)=>
{
    console.log("helllllllllllllllllllllll")
    next()
  //res.send(" 1st  response")
 
},(req,res,next )=>
{
    console.log("in 2nd  response")
    next()
//res.send("2nd response ")
},(req,res,next)=>
    {
        console.log("in  3rd  response")
   // res.send("3nd response ")
   next()
    })

// app.get('/ab*c',(req,res)=>
// {
// res.send("jaosn buttler +++++jofra archer")
// })


// app.use('/user/:userID/:name/:password',(req,res)=>
// {
//     console.log(req.params)
//   res.send('mchvhvJHCHVJCBJBCJBCJBCC')
// })

// app.use('/test',(req,res)=>
//     {
//      res.send('test creae successfullkjgshjqgcjwbcjby')   
//     })
   
// app.patch('/user',(req,res)=>
// {
//     res.send('patch means update the existing record')
// })

// app.get('/user',(req,res)=>
// {
// res.send({firstname:"ajay",lastname:"rawat"})
// })

// app.post('/user',(req,res)=>
// {
// console.log("saving data")
// res.send("data  saved in database")
// })


// app.delete('/user',(req,res)=>{
//     res.send("data dlet succefully")
// })



    app.listen(3000,()=>
{
    console.log('server created successfully')
})