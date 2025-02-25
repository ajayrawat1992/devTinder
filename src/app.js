const express=require('express')
const {adminAuth,userAuth}=require('./middlewares/auth.js')


const app=express()

app.use('/',(err,req,res,next) =>
    {
        //console.log("some error")
    if(err)
      {
       res.status(500).send("something wen wrong in home ")
      }
    });
  

    // if we  route to getUserdata  the code will run from  top . it will not get any error from upper route('/').now it will get error in ('/getUserData')route 
  //  which will throw error in lower route('/') which will print the error. 
  
  // functionality-----if we have DB error,api error etc. then we have to use try catch block in main code . if  by any means there is some error
  //then it will  be catch by lower  route 

app.get('/getUserData',(req,res)=>
{
    //console.log("inuserdata")
    //try{
        throw new Error("cncvnbvc")
    //res.send("userdata sent")

//     }
//     catch(err)
//     {
//        res.status(500).send("some error kindly contact it dept")
//    }
    })


    app.use('/',(err,req,res,next) =>
        {
            //console.log("some error")
        if(err)
          {
           res.status(500).send("something went wrong againnnnnnnnnnn")
          }
        });

    // app.use('/',(err,req,res,next) =>
    //     {
    //         //console.log("some error")
    //     if(err)
    //       {
    //        res.status(500).send("something wenT  wrong")
    //       }
    //     });
   


// app.get('/ab*c',(req,res)=>
// {
// res.send("jaosn buttler +++++jofra archer")
// })


// app.use('/user/:userID/:name/:password',(req,res)=>
// {
//     console.log(req.params)
//   res.send('mchvhvJHCHVJCBJBCJBCJBCC')
// })

// app.use('/',(req,res,next)=>
//      {
//     //     if(err)
//     //     {
//     //         res.status(500).send(" error in home page")
//     //     }
//        // res.send("home page")
//        next()
//     })

// app.get('/test',(req,res)=>
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