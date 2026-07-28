import {prisma} from "../config/db.js";
import bcrypt from "bcryptjs";

const register = async (req,res) => {
    const {name,email,password} = req.body;  
    const userExists = await prisma.user.findUnique({
        where: {email: email},
    });

    if(userExists){
        return res.status(400).json({error:"User already exists with the following mail ID!"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
        },
    });

    res.status(201).json({
        status:"success",
        data:{
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        },
    });

}

const login = async (req,res) =>{
    const {email,password} = req.body;
    const user = await prisma.user.findUnique({
        where: {email:email},
    });

    if(!user){
        return res.status(401).json({error:"User already exists with this email!"});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(401).json({error:"Entered password is incorrect!"});
    }   

    res.status(201).json({
        status:"success",
        data:{
            user: {
                id: user.id,
                email:user.email,
            },
        },
    });
}

export {register, login};