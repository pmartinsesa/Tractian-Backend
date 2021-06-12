import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const unitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    actives: [{
        type: Schema.Types.ObjectId,
        ref: 'Actives',
    }],
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

export const UnitsModel = mongoose.model('Units', unitSchema);