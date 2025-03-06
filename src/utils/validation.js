const validator=require('validator')


const validatorSignUp=(req)=>
{
   const {firstName,lastName,emailid,password}=req.body

   //console.log(firstName)

    if(!firstName || !lastName)
    {
        throw new Error("firstName or lastName  is  not valid")
    }

     else if(!validator.isEmail(emailid))
    {
        throw new Error("Kindly enter valid emailid")
    }

    else if(!validator.isStrongPassword(password))
     {
        throw new Error("Kindly enter strong password")
     }


}


module.exports={validatorSignUp}