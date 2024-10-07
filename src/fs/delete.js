import { promises as fs } from 'fs';
import path from 'path';

const remove = async () => {
    const filePath = path.join(process.cwd(), 'fileToRemove.txt');
    
    try {
        await fs.unlink(filePath);
        console.log('File removed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('fileToRemove.txt Error: FS operation failed');
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
};

await remove();