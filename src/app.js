const express=require('express')
const {adminAuth,userAuth}=require('./middlewares/auth.js')


const app=express()

app.use('/admin',adminAuth)

app.get('/user',userAuth,(req,res)=>
{
res.send("user verified")
})

app.get('/admin/getAllData',(req,res)=>
{
    console.log("dtaa response")
    res.send("dadta data successfully")
    
})

app.get('/admin/deleteData',(eq,res)=>
    {
        console.log("delete response")
        res.send("deleted data successfully")
    })

    app.get('/user/login',(req,res)=>
    {
   res.send(" welcome")
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