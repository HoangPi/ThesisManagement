import moongose, { Types, Schema, Date } from 'mongoose';

interface ISession {
    userid: Types.ObjectId,
    salt: string,
    key:string,
    expire: Date,
}

const sessionSchema = new Schema<ISession>({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    expire:{
        type: Date,
        required: true,
    }
})

const Session = moongose.model('session', sessionSchema)
export default Session