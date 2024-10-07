import { promises as fs } from 'fs';
import path from 'path';

const list = async () => {
    const dirPath = path.join(process.cwd(), 'files');
    
    try {
        const files = await fs.readdir(dirPath);
        console.log(files);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('Error: FS operation failed');
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
};

await list();