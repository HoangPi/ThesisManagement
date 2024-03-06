import express from 'express'
import Account from '../../../models/account'
import { checkHMAC } from '../../../sideEffect/HMACFunctions'
import Session from '../../../models/session'

import Randomstring from 'randomstring'
import User from '../../../models/user'

const router = express.Router()
// declare module 'express-session'{
//     interface SessionData{
//         key: string,
//         salt: string,
//     }
// }

router.use(async (req,res)=>{
    try{
        const account = await Account.findOne({username: req.body.payload.username})
        // console.log(req.body.payload)
        // console.log(account)
        if(account?.password === undefined){
            res.status(200).json({message: "Wrong credential info"})
            return
        }
        if(checkHMAC(req.body.payload.password,account?.password,req.session.salt,req.session.key)){
            //delete sessions that have the userid (force log out for other devices)
            const userDoc = await User.findOne({accountid: account._id},'-accountid')
            await Session.deleteMany({userid: userDoc?._id})
            const newSesison = new Session({
                userid: userDoc?._id,
                salt: Randomstring.generate(15),
                key: Randomstring.generate(15),
                //5 mins, this is Unix Timestamp
                expire: Date.now() + 5*60*1000,
            })
            const sessionDoc = await newSesison.save()

            res.json({message: "Success",
            session:{
                sessionid: sessionDoc._id,
                salt: sessionDoc.salt,
                key: sessionDoc.key,
            }, 
            user: {
                fullname: userDoc?.fullname,
                phone: userDoc?.phone,
                email:userDoc?.email,
                role: userDoc?.role,
            }})
            return
        }
        res.status(200).json({message:"Wrong credential info"})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: "Internal error"})
    }
})

export default router