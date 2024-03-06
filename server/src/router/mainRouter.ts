import express from 'express'
const router = express.Router()

import account from './account/accountRouter'
import instructor from './instructor/instructorRouter'
import student from './student/studentRouter'

router.use((req,res,next) => {
    // console.log('Time: ', Date.now())
    next()
})

router.use('/account',account)
router.use('/instructor',instructor)
router.use('/student',student)

export default router