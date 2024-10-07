import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

const compressFile = async () => {
    try {
        const currentFilePath = fileURLToPath(import.meta.url);
        const currentDir = dirname(currentFilePath);

        const folderPath = join(currentDir, 'files');
        const inputFileName = 'fileToCompress.txt';
        const outputFileName = 'archive.gz';
        const inputFilePath = join(folderPath, inputFileName);
        const outputFilePath = join(folderPath, outputFileName);

        const inputStream = createReadStream(inputFilePath);
        const outputStream = createWriteStream(outputFilePath);
        const gzipStream = createGzip();
        const pipelineAsync = promisify(pipeline);

        await pipelineAsync(inputStream, gzipStream, outputStream);
        console.log(`Successfully compressed ${inputFileName} to ${outputFileName}`);
    } catch (error) {
        console.error('An error occurred during compression:', error);
    }
};

compressFile();