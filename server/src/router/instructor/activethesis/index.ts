import express from 'express'
import Thesis from '../../../models/thesis'

const router = express.Router()

router.use(async (req,res) => {
    try{
        console.log((req.body.payload))
        const resDoc = await Thesis.findByIdAndUpdate(req.body.payload.thesisid,{
            $pull:{
                students: {$nin: [...req.body.payload.students]}
            },
            $:{
                status: 'On going'
            }
        },{
            runValidators: true,
            new: true,
        })
        console.log(resDoc)
        res.status(200).json({message: "Success", confirm: true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Internal error"})
    }
})

export default router