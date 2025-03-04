const mongoose=require('mongoose')
const validator=require('validator')

const userSchema=new mongoose.Schema({
     
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxlength:80
    },
    
    lastName:{
        type:String
    },
    
    Age:{
        type:Number,
        min:18,
        max:50,
        required:true
    },
    
    emailid:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value)
        {
        if(!validator.isEmail(value))
        {
            throw new Error("Invalid emailid :: " +value)
        }
        }
        // validate(value){
        //     const re= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        //     if( !(re.test(value)))
        //     {
        //         throw new Error('Please fill a valid email address')
        //     }
        //}
       //match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    
    password:{
        type:String,
        required:true,
        minLength:8,
        // validate(value)
        // {
        //     if(!validator.isStrongPassword(value))
        //     {
        //         throw new Error("enter strong Password : " +value)
        //     }
        // }
    },
    
    gender:{
        type:String,
        validate(value){        // this validate funtion will only run when you are trying to enter a new data.. to enable it on updations we have to update runValidators:true
            if(!['Male','Female','others'].includes(value))
            throw new Error("Gender is not valid")
        }
    },
    photoURL:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/128/5355/5355316.png",
        validate(value)
        {
            if(!validator.isURL(value))
            {
                throw new Error("Invalid phootoURL: :: " +value)
            }
        }

    },
    skills:{
        type:[String],
    },

},{timestamps:true})

    const User= mongoose.model('User',userSchema)
    module.exports={User}    