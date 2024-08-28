import mongoose from 'mongoose';
import { MONGO_URI } from '../utils/Constants';

// Connection URI
const mongoURI = MONGO_URI;

// Connection options
const options = {
    // useMongoClient: true,
    autoIndex: true, // build indexes
};

// Establish connection with mongoDB
const connect = () => {
    return mongoose.connect(mongoURI, options)
        .then(() => {
            console.log('✅ ✅ ✅ --- Mongo DB connected --- ✅ ✅ ✅');
        })
        .catch((err: any) => console.log(`Error while connecting to database :: ${err}`));
};

const disconnect = () => {
    if (!mongoose.connection) {
        return;
    }
    mongoose.connection.once('close', async () => {
        console.log('Disconnected from database');
    });
    return mongoose.disconnect();
}

export default {
    connect,
    disconnect
};
