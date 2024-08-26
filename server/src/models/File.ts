// mongoose lib
import { Document, Schema, model, Model, SchemaType } from 'mongoose';

export interface IFile {
    name: string;
    owner: SchemaType;
    path: string;
    type: string;
    size: number;
    sharedWith?: SchemaType[];
};

interface FileSchema extends Document, IFile {}

interface FileModel extends Model<IFile> {}

const modelName = "File";

// Schema definition
const fileSchema = new Schema<FileSchema>({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    path: String,
    type: String,
    size: Number,
    sharedWith: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default model<FileSchema, FileModel>(modelName, fileSchema);
