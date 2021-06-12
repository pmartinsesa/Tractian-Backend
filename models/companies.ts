import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    units: [{
        type: Schema.Types.ObjectId,
        ref: 'Units',
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }]
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

export const CompaniesModel = mongoose.model('Companies', companySchema);