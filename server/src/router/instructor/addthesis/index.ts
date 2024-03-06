import express from 'express'
import Thesis from '../../../models/thesis'

const router = express.Router()
router.use(async (req,res) => {
    try{
        const t = new Thesis({
            instructorid: res.locals.userid._id,
            name: req.body.payload.name,
            description: req.body.payload.description,

        })
        await t.save()
        res.status(200).json({message: "New thesis added"})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: "Internal error"})
    }
})

export default router