import { promises as fs } from 'fs';
import { join } from 'path';
import { ERROR_MSG, SUCCESS_MSG, __DIR } from './constants.js'; // Импортируем из constants.js

const copyFiles = async () => {
    const sourceDir = join(__DIR, 'files');
    const targetDir = join(__DIR, 'files_copy');

    try {
        await fs.access(sourceDir);

        try {
            await fs.access(targetDir);
            throw new Error(ERROR_MSG);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw new Error(ERROR_MSG);
            }
        }

        await fs.mkdir(targetDir);

        const files = await fs.readdir(sourceDir);

        await Promise.all(files.map(async (file) => {
            const sourcePath = join(sourceDir, file);
            const destPath = join(targetDir, file);
            await fs.copyFile(sourcePath, destPath);
        }));

        console.log(SUCCESS_MSG);
    } catch (error) {
        console.error(`${ERROR_MSG}: ${error.message}`);
    }
};

await copyFiles();