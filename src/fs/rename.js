import { promises as fs } from 'fs';
import path from 'path';

// Определяем путь к файлам
const filesDir = path.join(process.cwd(), 'files');
const wrongFilename = path.join(filesDir, 'wrongFilename.txt');
const properFilename = path.join(filesDir, 'properFilename.md');

const rename = async () => {
    try {
        // Проверяем, существует ли wrongFilename.txt
        await fs.access(wrongFilename);
    } catch {
        console.error('FS operation failed: wrongFilename.txt does not exist');
        return;
    }

    // Проверяем, существует ли properFilename.md
    try {
        await fs.access(properFilename);
        console.error('FS operation failed: properFilename.md already exists');
        return;
    } catch {
        // properFilename.md не существует, продолжаем
    }

    // Переименовываем файл
    try {
        await fs.rename(wrongFilename, properFilename);
        console.log(`File renamed from wrongFilename.txt to properFilename.md`);
    } catch (error) {
        console.error('FS operation failed:', error.message);
    }
};

// Запускаем функцию
await rename();