import express from 'express'
import Thesis from '../../../models/thesis'
import OnGoing from '../../../models/onGoing'

const router = express.Router()

router.use(async (req,res) => {
    try{
        console.log((req.body.payload))
        const resDoc = await Thesis.findByIdAndUpdate(req.body.payload.thesisid,{
            $pull:{
                students: {$nin: req.body.payload.students}
            },
            $set:{
                status: 'On going'
            }
        },{
            runValidators: true,
            new: true,
        })
        const OnGoingBatch = resDoc?.students.map((item) => {
            return {
                thesis: resDoc._id,
                student: item._id,
            }
        })
        if(OnGoingBatch === undefined) {
            throw new Error("No student found")
        }
        OnGoing.collection.insertMany(OnGoingBatch)
        await Thesis.updateMany({_id:{
            $nin: resDoc?._id
        }},{
            $pull:{
                students: {$in: req.body.payload.students}
            }
        })
        res.status(200).json({message: "Success", confirm: true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Internal error"})
    }
})

export default router