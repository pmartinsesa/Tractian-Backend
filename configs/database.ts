import moongoose from 'mongoose';

import { BACKEND_URI } from '../consts/back_uri';

moongoose.Promise = global.Promise;

const config = {
    uri: process.env.MONGO_URL || BACKEND_URI,
    options: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
};

moongoose.connection.on('open', () => {
    console.log('Successfully connected to database.');
});

moongoose.connection.on('error', () => {
    throw new Error('Error to connected on database.');
});

export default {
    connect: () => moongoose.connect(config.uri, config.options)
};