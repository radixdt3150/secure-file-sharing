
import File, { IFile } from "../../models/File";

class FileService {
    async addFilesToDB(files: Array<Partial<IFile>>): Promise<void> {
        await File.create(files);
    }
}

export default new FileService();
export type FileServiceType = InstanceType<typeof FileService>;
