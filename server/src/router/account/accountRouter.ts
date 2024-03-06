import express from 'express'
const router = express.Router()
declare module 'express-session'{
    interface SessionData{
        key: string,
        salt: string,
    }
}

import randomString = require('randomstring')
import signin from './signIn'
import getsession from './getsession'
import profile from './profile'
import Session from '../../models/session'

router.use((req,res,next) =>{
    
    next()
})

router.post('/',(req,res) => {
    try{
        req.session.key = randomString.generate(15)
        req.session.salt = randomString.generate(15)
        req.session.save()
        console.log(req.session.id)
        res.status(200).json({
            salt: req.session.salt,
            key: req.session.key
        })
    }
    catch(err){
        console.log(err)
        res.json(500).json({message: "Internal server error"})
    }
})
router.post('/signin',signin)
router.post('/getsession',getsession)
router.post('/profile',profile)
router.post('/signout',async (req,res)=>{
    try{
        await Session.findOneAndDelete({_id:req.body.hmac.sessionid})
        // console.log(temp)
        res.status(200).json({message: "User logged out"})
    }
    catch(err){
        console.log(err)
        res.status(400)
    }
})

export default router