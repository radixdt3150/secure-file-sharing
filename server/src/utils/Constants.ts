import dotenv from 'dotenv';

dotenv.config()

export const MONGO_URI = process.env.MONGO_URI as string;
export const STATUS = {
    SUCCESS: 'success',
    ERROR: 'error'
};
export const STATUS_CODE = {
    OK: 200,
    CLIENT_ERROR: 400,
    INTERNAL_SERVER_ERROR: 500
};
