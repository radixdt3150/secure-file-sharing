import { afterEach, describe, expect, it, jest } from "@jest/globals";

import File, { IFile } from "../../models/File";
import FileService from "./index";

jest.mock("../../models/File");

describe('FileService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('addFilesToDB', () => {
        it('Adds the file to collection', async (): Promise<void> => {
            // Arrange
            const file: IFile[] = [
                {
                    name: 'file-name',
                    originalName: 'original-name',
                    path: '/random/path',
                    type: 'type',
                    size: 50000,
                    encryptionKey: 'encryptionKey',
                    iv: 'iv',
                    owner: 'owner_id' as any
                }
            ];

            (File.create as jest.Mock) = jest.fn();

            // Act
            await FileService.addFilesToDB(file);

            // Assert
            expect(File.create).toHaveBeenCalledWith(file)
        })
    })
})