import express from 'express'
import Thesis from '../../../models/thesis'

const router = express.Router()

router.use(async (req,res) => {
    try{
        await Thesis.findByIdAndUpdate(req.body.payload.thesisid,{
            $pull:{
                students: res.locals.userid,
            }
        },{
            runValidators: true,
        })
        res.status(200).json({message: "Student added to thesis", confirm: true})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: "Internal error"})
    }
})

export default router