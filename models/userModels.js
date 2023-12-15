import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],

    },
    phone:{
        type:String,
        required:[true,"Phone is required"],
    },
    address:{
        type:String,
        required:[true,"Address is required"],
    },
    question:{
        type:String,
        required:[true,"Question is required"],
    },
    role:{
        type:Number,
        default:0,
    }
},{timestamps:true});
export default mongoose.model("User", userSchema);