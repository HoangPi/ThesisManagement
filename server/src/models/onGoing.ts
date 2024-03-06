import moongose, { Types, Schema, Date, model } from 'mongoose';
import User from './user';
import mongoose from 'mongoose';
const mongooseUniqueValidator = require('mongoose-unique-validator');

const onGoingSchema = new Schema({
    thesis: {
        type: Types.ObjectId,
        required: true,
        ref: 'thesis',
    },
    student: {
        type: Types.ObjectId,
        required: true,
        kind: 'unique',
        ref: 'user',
        message: 'Error, expected `username` to be unique. Value: `JohnSmith`',
        name: 'ValidatorError',
        path: 'student',
        value: 'JohnSmith'
    }
})
onGoingSchema.plugin(mongooseUniqueValidator);

const OnGoing = model('ongoing', onGoingSchema)
export default OnGoing