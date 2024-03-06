import moongose, { Schema, Types } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IUser {
    accountid: Types.ObjectId,
    fullname: string,
    email: string,
    phone: string,
    role: 'student' | 'instructor' | 'admin',
}

const userSchema = new Schema<IUser>({
    accountid: {
        type: Schema.Types.ObjectId,
        ref: 'account',
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role:{
        type: String,
    }
})

const User = moongose.model<IUser>('user', userSchema)
export default User