import express from 'express'
import Session from '../../../models/session'
import User from '../../../models/user'
const router = express.Router()

router.use(async (req,res) => {
    try{
        // console.log(/^\d+$/.test(req.body.payload.phone))
        // console.log(!/^[^@]+@\w+(\.\w+)+\w$/.test(req.body.email))
        if(!/^\d+$/.test(req.body.payload.phone) || !/^[^@]+@\w+(\.\w+)+\w$/.test(req.body.payload.email)){
            res.status(400).json({message:'Invalid input'})
            return
        }
        const sessionDoc = await Session.findById(req.body.hmac.sessionid)
        await User.updateOne({_id: sessionDoc?.userid._id},{
            phone: req.body.payload.phone,
            email: req.body.payload.email
        })
        res.status(200).json({confirm: true})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: 'Internal error'})
    }
})
export default router