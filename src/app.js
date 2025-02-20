const express=require('express')


const app=express()



app.use('/test',(req,res)=>
    {
    res.send("hello from testingdkjbxjkabscxkbacbabcx")
    })

app.use((req,res)=>
    {
    res.send("hello frommnb cbvasbxkjqBJKQBHX ")
    })

app.listen(3000,()=>{console.log("server installed successfully")    })