import express from 'express'
import Thesis from '../../../models/thesis'


const router = express.Router()

router.use(async (req,res) => {
    try{
        // console.log(res.locals.userid)
        const theses = await Thesis.find({instructorid: res.locals.userid._id}).populate('students')
        res.status(200).json({theses:theses})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: 'Internal error'})
    }
})

export default router