const mongoose=require('mongoose')


const connectDB = async()=>
{
     await mongoose.connect(
     'mongodb+srv://ajrawat92:z1l5pp2wzedSgv6j@namastenode.djtt7.mongodb.net/DevTinder'
        )
}
module.exports={connectDB}


