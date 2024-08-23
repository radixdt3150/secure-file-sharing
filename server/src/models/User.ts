// top level imports
// mongoose lib
import { Document, Schema, model, Model } from 'mongoose';

const modelName = 'User';

export interface IUser {
    name: string;
    email: string;
    password: string;

    makeHidden?: () => void
};

interface UserSchema extends Document, IUser {
};

interface IUserMethods {
    makeHidden: (fieldKey: string) => any;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
    generatePassword: (rawPassword: string) => string;
    validatePassword: (rawPassword: string, hashedPassword: string) => boolean;
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
});

// Static methods on schema - starts

// generates hashed password
userSchema.statics.generatePassword = function (rawPassword: string): string {
    return 'random password'
}

// validates hashed password
userSchema.statics.validatePassword = function (rawPassword: string, hashedPassword: string): boolean {
    return false;
}

// Static methods on schema - ends

// Instance methods - starts

userSchema.methods.makeHidden = function (fieldKey: string) {
    const r = this.lean();
    delete r[fieldKey];
    return r;
}


// Instance methods - ends

export default model<UserSchema, UserModel>(modelName, userSchema);
