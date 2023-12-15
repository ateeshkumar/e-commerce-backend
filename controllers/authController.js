import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";
const registerController = async(req,res)=>{
    try {
        const {name,email,password,phone,address,question} = req.body;
        if(!name || !email || !password || !phone || !address || !question){
            return res.status(400).send({
                success:false,
                massage:`Please fill all fields`
            });
        }

        const existUser = await userModels.findOne({email});
        if(existUser){
            return res.status(400).send({
                success:false,
                massage:`User already exist`
            });
        }

        const hashpassword = await hashPassword(password);
        const newUser =await new userModels({name,email,password:hashpassword,phone,address,question}).save();
        res.status(200).send({
            success:true,
            massage:'User registered successfully',
            newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            massage:'Error in registration',
            error
        });
    }
}

export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send({
                success:false,
                massage:`Please fill all fields`
            });
        }

         const user = await userModels.findOne({email});
         if(!user){
            return res.status(404).send({
                success:false,
                massage:`User not registered`,
            });
         }
        const match = await comparePassword(password,user.password);
         if(!match){
            return res.status(200).send({
                success:false,
                massage:`Password is incorrect`,
            })
         }
         const token = await JWT.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:'4h'});
         res.status(200).send({
            success:true,
            massage:'Login Successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,

            },
            token
         })

       

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            massage:'Error in login',
            error
        })
    }
}

export const testController = async (req,res)=>{
    try {
        res.status(200).send({
            success:true,
            massage:'Test Controller',
        });
    } catch (error) {
        
    }
}

export const forgotPassword = async (req,res)=>{
    try {
        const {email,question,newPassword} = req.body;
        if(!email || !question || !newPassword){
            res.status(400).send({
                success:false,
                massage:'Please enter all the fields'
            })
        }
        const user = await userModels.findOne({email,question});
        if(!user){
            res.status(400).send({
                success:false,
                massage:'User not found'
            });
        }
        const hash = await hashPassword(newPassword)
        await userModels.findByIdAndUpdate(user._id,{password:hash});
        res.status(200).send({
            success:true,
            massage:'Password changed successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            massage:'Error in login',
            error
        })
    }
}

export const updateUserProfile = async(req,res)=>{
    try {
        const {name,email,password,phone,address} = req.body;
        const user = await userModels.findById(req?.user?._id);
        const hashpassword = password ? await hashPassword(password):undefined
        const updateuser = await userModels.findByIdAndUpdate(req?.user?._id,{
            name:name || user.name,
            password:hashpassword || user.password,
            phone:phone || user.phone,
            address:address || user.address
        },{new:true});
        res.status(200).send({
            success:true,
            massage:'Update user successfully',
            updateuser
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            massage:'error in updateing user profile',
            error,
        })
    }
}
export default registerController;