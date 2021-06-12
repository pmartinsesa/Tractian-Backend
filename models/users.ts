import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Companies',
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
}, 
{
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: { 
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
          }
    },
    versionKey: false,
});

export const UsersModel = mongoose.model('Users', userSchema);