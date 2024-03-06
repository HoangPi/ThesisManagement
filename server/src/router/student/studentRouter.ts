import express from 'express'
import Session from '../../models/session'
import getpenddingthesis from './getpenddingthesis'
import jointhesis from './jointhesis'
import unjoin from './unjoin'

const router = express.Router() 

router.use(async (req,res,next) => {
    try{
        const t = await Session.findById(req.body.hmac.sessionid).populate('userid')
        if((t?.userid as any).role !== 'student'){
            res.status(413).json({message: 'User cannot use this endpoint to retrieve data'})
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

router.post('/getpenddingtheses', getpenddingthesis)
router.post('/jointhesis',jointhesis)
router.post('/unjointhesis',unjoin)

export default router