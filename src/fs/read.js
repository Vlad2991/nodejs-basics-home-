import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { promises as fs } from 'node:fs';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFile);

const read = async () => {
    const filePath = `${currentDir}/files/fileToRead.txt`;
    try {
        const content = await fs.readFile(filePath, 'utf8');
        console.log(content);
    } catch (err) {
        console.error('Error reading file:', err.message);
    }
};

read();