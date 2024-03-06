import moongose, { Types, Schema, Date, model } from 'mongoose';
import User from './user';
import mongoose from 'mongoose';
import OnGoing from './onGoing';

interface IThesis {
    name: string,
    instructorid: Types.ObjectId,
    students: Types.ObjectId[],
    dateStart: Date | null,
    defenseDate: Date | null,
    committee: Types.ObjectId,
    score: Number,
    status: 'Pending' | 'On going' | 'Finished',
    description: string,
}

const thesisSchema = new Schema<IThesis>({
    name: {
        type: String,
        required: true,
    },
    instructorid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'user',
    },
    dateStart: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    defenseDate: {
        type: Date,
        // required: true,
    },
    committee: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    score: {
        type: Schema.Types.Number
    },
    status: {
        type: String,
        validate: {
            validator: function (v: string) {
                return /Pending|On going|Finished/.test(v)
            },
            message: props => `Invalid status ${props.value}`
        },
        required: true,
        default: 'Pending'
    },
    description:{
        type: String,
        default: "None"
    }
})
//Pre validate the doc
thesisSchema.pre('validate', async function (next) {
    //Create a copy of string values of studentid
    const i_id = String(this.instructorid)
    const c_id = String(this.committee)
    let stdCopy: string[] = []
    for (let i = 0; i < Object.keys(this.students).length; i++) {
        stdCopy.push(String(this.students[i]))
    }
    let uniqueStd = [...new Set(stdCopy)]
    //check duplicate student
    if (Object.keys(uniqueStd).length !== Object.keys(stdCopy).length) throw new Error("Duplicate student found")
    console.log('validate')
    //check committee is not instructor
    if (i_id === c_id) throw new Error("Committee must not be thesis's instructor")
    //If pending then whatever
    //If not pending check number of students, is student attending other theses
    if (/On going|Finished/.test(this.status)) {
        if (Object.keys(uniqueStd).length > 4 || Object.keys(uniqueStd).length <= 0) {
            throw new Error("Thesis must have from 0 to 4 students")
        }
    }
    //This part is for communicate with database (avoid reaching this part)
    if (await getRole(i_id) !== 'instructor') throw new Error("Invalid instructor id")
    for (let i = 0; i < Object.keys(uniqueStd).length; i++) {
        if (await getRole(uniqueStd[i]) !== 'student') throw new Error("Attendent must be student")
    }
    next()
})
//Pre update the doc
thesisSchema.pre('findOneAndUpdate', async function (next) {
    const beforeUpdate = await this.model.findOne(this.getQuery())
    console.log(beforeUpdate.status)
    console.log((this.getUpdate() as any).status)
    //If the status change from Pending to On going, update On Going table
    if (beforeUpdate.status === 'Pending' && (this.getUpdate() as any).status === 'On going') {
        const onGoingDocs = await beforeUpdate.students.map((item: any) => {
            return {
                thesis: beforeUpdate._id,
                student: item,
            }
        })
        try {
            for (let i = 0; i < Object.keys(onGoingDocs).length; i++) {
                await onGoingDocs[i].save()
            }
        }
        catch (err) {
            throw new Error("Contain magic")
        }
    }

    next()
})

//Get user's role
async function getRole(v: String) {
    let temp = await User.findById(v)
    return temp?.role
}

thesisSchema.path('students').validate((value) => {
    const stdStringArray = value.toString().split(',')
    console.log(stdStringArray)
    console.log(stdStringArray.length)
    console.log([...new Set(stdStringArray)])
    console.log([...new Set(stdStringArray)].length)
    if(stdStringArray.length === [...new Set(stdStringArray)].length){
        console.log('return true')
        return true
    }
    return false
},"Duplicate student found")

const Thesis = mongoose.model('thesis', thesisSchema)
export default Thesis