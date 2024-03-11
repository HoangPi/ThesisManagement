import express from 'express'
import OnGoing from '../../../models/onGoing'
import Thesis from '../../../models/thesis'

const router = express.Router()

router.use(async (req,res) => {
    try{
        const thesisDocs = await Thesis.find({instructorid: res.locals.userid._id, status: 'On going'}).populate('students', '-accountid')
        res.status(200).json({theses: thesisDocs})
    }
    catch(err){
        console.log(`contain error: ${err}`)
        res.status(500).json({message: "Internal error"})
    }
})

export default router