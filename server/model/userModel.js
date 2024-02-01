import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        default:""
    },
    password:{
        type:String,
        default:''
    },
    avatar:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    website:{
        type:String,
        default:''
    },
    story:{
        type:String,
        default:''
    }
    
})


export default mongoose.model('user', userSchema)