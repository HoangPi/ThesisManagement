import moongose, { Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IAccount {
    username: string,
    password: string,
}

const accountSchema = new Schema<IAccount>({
    username: {
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const Account = moongose.model('account', accountSchema)
export default Account