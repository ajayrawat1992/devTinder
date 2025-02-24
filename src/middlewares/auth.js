 const adminAuth=(req,res,next)=>
    {
        console.log("home page")
        const token="xyz"
        const isAuthorized=token==="xyz"
        if(!isAuthorized)
        {
            res.status(401).send("Unauthorized User")
        }
        else{
            next()
        }   
    
    }

    const userAuth=(req,res,next)=>
        {
            console.log("home page")
            const token="xyz"
            const isAuthorized=token==="xyz"
            if(!isAuthorized)
            {
                res.status(401).send("Unauthorized User")
            }
            else{
                next()
            }   
        
        }

    module.exports={adminAuth,userAuth}