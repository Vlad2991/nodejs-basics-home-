import { promises as fs } from 'fs';
import path from 'path';

// Получаем директорию, где находится данный скрипт
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const copy = async () => {
    try {
        const sourceDir = path.join(__dirname, 'files'); // Используем __dirname
        const destDir = path.join(__dirname, 'files_copy'); // Используем __dirname

        console.log('Current working directory:', process.cwd());
        console.log('Source directory path:', sourceDir);
        console.log('Destination directory path:', destDir);

        const sourceExists = await fs.stat(sourceDir).catch(() => false);
        if (!sourceExists) {
            throw new Error('FS operation failed: source directory "files" does not exist.');
        }

        const destExists = await fs.stat(destDir).catch(() => false);
        if (destExists) {
            throw new Error('FS operation failed: destination directory "files_copy" already exists.');
        }

        await fs.mkdir(destDir);

        const files = await fs.readdir(sourceDir);
        for (const file of files) {
            const sourceFile = path.join(sourceDir, file);
            const destFile = path.join(destDir, file);
            await fs.copyFile(sourceFile, destFile);
        }

        console.log('Files copied successfully!');
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

copy();