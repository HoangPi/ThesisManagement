import express from 'express'
import Thesis from '../../../models/thesis'
const router = express.Router()

router.use(async (req,res) => {
    try{
        const thesesDocs = await Thesis.find({status:'Pending'}).populate('instructorid','-role -accountid')
        let isStudentIn = thesesDocs.map((item) => {
            // console.log(item.students.toString())
            return item.students.toString().includes(res.locals.userid._id)
        })
        res.status(200).json({theses: thesesDocs, isStudentIn})
    }
    catch(err){
        console.log(err)
        res.status(400).json({message: "Internal error"})
    }
})

export default router