import express from 'express'
import Session from '../../models/session'
import gettheses from './gettheses'
import addthesis from './addthesis'
import activethesis from './activethesis'

const router = express.Router()

router.use(async (req,res,next) => {
    try{
        const t = await Session.findById(req.body.hmac.sessionid).populate('userid')
        if((t?.userid as any).role !== 'instructor'){
            res.status(401).json({message: "Unauthorized user"})
            return
        }
        res.locals.userid = t?.userid
        next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({message: "Unauthorized user"})
    }
})
router.post('/gettheses',gettheses)
router.post('/addthesis',addthesis)
router.post('/activatethesis',activethesis)

export default router