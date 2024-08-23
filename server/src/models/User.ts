// top level imports
import { pbkdf2Sync, randomBytes } from 'crypto';

// mongoose lib
import { Document, Schema, model, Model } from 'mongoose';

const modelName = 'User';

export interface IUser {
    name: string;
    email: string;
    password: string;
    salt: string;

    makeHidden?: () => void
};

interface UserSchema extends Document, IUser {
};

interface IUserMethods {
    makeHidden: (fieldKey: string) => any;
}

export type PasswordSet = { salt: string, hashedPassword: string };

interface UserModel extends Model<IUser, {}, IUserMethods> {
    generatePassword: (rawPassword: string) => PasswordSet;
    validatePassword: (rawPassword: string, hashedPassword: string, salt: string) => boolean;
}

// User schema definition
const userSchema = new Schema<UserSchema>({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    salt: {
        type: String,
        required: true,
    },
});

// Static methods on schema - starts

// generates hashed password
userSchema.statics.generatePassword = function (rawPassword: string): PasswordSet {
    // salt doesn't contain any sensitive data that can identify the user
    // hence it can be stored in DB in plain text
    const salt = randomBytes(16).toString('hex');

    const hashedPassword = pbkdf2Sync(rawPassword, salt, 100000, 64, 'sha512').toString('hex');
    return { salt, hashedPassword }
}

// validates hashed password
userSchema.statics.validatePassword = function (rawPassword: string, hashedPassword: string, salt: string): boolean {
    const computedHash = pbkdf2Sync(rawPassword, salt, 100000, 64, 'sha512').toString('hex');

    return computedHash === hashedPassword;
}

// Static methods on schema - ends

// Instance methods - starts

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.salt;
    
    return userObject;

}


// Instance methods - ends

export default model<UserSchema, UserModel>(modelName, userSchema);
