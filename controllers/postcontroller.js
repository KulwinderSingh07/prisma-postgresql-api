import { PrismaClient } from '@prisma/client'
import Jwt  from 'jsonwebtoken'
import bcrypt from "bcrypt"
const jwt_key=process.env.JWT_KEY
const prisma = new PrismaClient()
const postcreation=async(req,res)=>{
    const token=req.cookies.loged
    const decodedToken=Jwt.verify(token,jwt_key)
    const logedUser=await prisma.user.findUnique({
        where:{
            id:decodedToken.payload
        }
    })
    const postdata=req.body;
    postdata.authorId=logedUser.id
    const createdPost=await prisma.post.create({
        data:postdata
    })
    res.send(createdPost)
}
const getspecificpost =async(req,res)=>{
    try{
        const id=req.params.id
        const specificpost=await prisma.post.findUnique({
            where:{
                id
            }
        })
        console.log(specificpost)
        res.send(specificpost)
}catch(err){
    res.send(err.message)
}
}
const deletepost=async(req,res)=>{
    try{
        const id=req.params.id
        const specificpost=await prisma.post.delete({
            where:{
                id
            }
        })
        console.log(specificpost)
        res.send(specificpost)
}catch(err){
    res.send(err.message)
}
}
export {postcreation,getspecificpost,deletepost}