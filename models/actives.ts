import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ativeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    model: {
        type: String,
        required: true
    }, 
    responsible: {
        type: String,
        required: true
    }, 
    image: {
       data: Buffer,
       contentType: String
    },
    status: {
        type: String,
        enum: ['Em Operação', 'Em Alerta', 'Em Parada']
    },    
    healthLevel: {
        type: Number,
        max: 100,
        min: 0
    },
    unit: {
        type: Schema.Types.ObjectId,
        ref: 'Units',
        required: true
    },
    unitName: {
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

export const ActivesModel = mongoose.model('Actives', ativeSchema);