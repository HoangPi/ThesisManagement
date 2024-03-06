import express from 'express'
import Session from '../../../models/session'
import randomString from 'randomstring'

const router = express.Router()

router.use(async (req,res)=>{
    try{
        // console.log('req.body')
        const sessionDoc = await Session.findById(req.body.hmac.sessionid).populate('userid', '-accountid')
        // console.log(sessionDoc)
        if(!sessionDoc){
            res.status(404).json({message: "Session not found"})
            return
        }
        sessionDoc.salt =  randomString.generate(15)
        sessionDoc.key = randomString.generate(15)
        await sessionDoc.save()
        res.status(200).json({
            session: {
                sessionid: sessionDoc._id,
                salt: sessionDoc.salt,
                key: sessionDoc.key,
            },
            user: sessionDoc.userid,
            
        })
    }
    catch(err){
        console.log(err)
        res.status(404).json({message: "Session not found"})
    }
}) 

export default router