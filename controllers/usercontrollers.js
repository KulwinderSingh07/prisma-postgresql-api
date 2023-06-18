import { PrismaClient } from '@prisma/client'
import Jwt  from 'jsonwebtoken'
import bcrypt from "bcrypt"
const jwt_key=process.env.JWT_KEY
const prisma = new PrismaClient()
const signup=async(req,res)=>{
    const userdata=req.body;
    const hashpassword=await bcrypt.hash(userdata.password,10)
    console.log(hashpassword)
    userdata.password=hashpassword
    const userdocument=await prisma.user.create({
        data:userdata
    })
    console.log(userdocument)
    res.send(userdocument)
}
const signin =async(req,res)=>{
    try{
    const {email,password}=req.body;
    const UserCheck=await prisma.user.findUnique({
        where:{
            email:email
        },
        select:{
            password:true,
            id:true
        }
    })
    if(!UserCheck) throw new Error("User not signed up")
    const passcompare=await bcrypt.compare(password,UserCheck.password)
    if(!passcompare) throw new Error("Pass word validation failed")
    const token=Jwt.sign({payload:UserCheck.id},jwt_key)
    res.cookie("loged",token,{expires:new Date(Date.now()+5654654654)})
    console.log(token)
    res.json({
        message:"Loged in"
    })
}catch(err){
    res.send(err.message)
}
}
const userDetailUpdate=async(req,res)=>{
    try{
    const token=req.cookies.loged
    const decodedToken=Jwt.verify(token,jwt_key)
    const updateUser=await prisma.user.update({
        where:{
            id:decodedToken.payload
        },
        data:req.body
    })
    console.log(updateUser)
    res.send("updated")
}catch(err){
    res.send(err.message)
}
}
const getspecificuser=async(req,res)=>{
    try{
        const token=req.cookies.loged
        const decodedToken=Jwt.verify(token,jwt_key)
        const user=await prisma.user.findUnique({
            where:{
                id:decodedToken.payload
            },
            select:{
                posts:true,
                name:true,
                email:true,
                id:true
            }
        })
        console.log(user)
        res.send(user)
    }catch(err){
        res.send(err.message)
    }
}
export {signup,signin,userDetailUpdate,getspecificuser}