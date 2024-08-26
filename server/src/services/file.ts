
import File, { IFile } from "../models/File";

class FileService {
    async addFiles(files: Array<Partial<IFile>>) {
        await File.create(files);
    }
}

export default new FileService();
export type FileServiceType = InstanceType<typeof FileService>;
