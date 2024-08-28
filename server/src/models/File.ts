// mongoose lib
import { Document, Schema, model, Model, SchemaType, Types } from 'mongoose';

export interface IFile {
    name: string;
    originalName: string;
    owner: SchemaType;
    path: string;
    type: string;
    size: number;
    encryptionKey: string;
    iv: string;
    sharedWith?: SchemaType[];
};

interface FileSchema extends Document<Types.ObjectId>, IFile {}

interface FileModel extends Model<IFile> {}

const modelName = "File";

// Schema definition
const fileSchema = new Schema<FileSchema>({
    name: { type: String, required: true },
    originalName: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    path: String,
    type: String,
    size: Number,
    encryptionKey: String,
    iv: String,
    sharedWith: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default model<FileSchema, FileModel>(modelName, fileSchema);
