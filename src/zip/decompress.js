import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createUnzip } from 'node:zlib';
import { createWriteStream, createReadStream } from 'node:fs';

const decompressFile = async () => {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectory = dirname(currentFilePath);

    const folderPath = join(currentDirectory, 'files');
    const compressedFileName = 'archive.gz';
    const decompressedFileName = 'fileToCompress.txt';
    const compressedFilePath = join(folderPath, compressedFileName);
    const decompressedFilePath = join(folderPath, decompressedFileName);

    const unzipStream = createUnzip();
    const inputStream = createReadStream(compressedFilePath);
    const outputStream = createWriteStream(decompressedFilePath);

    inputStream.pipe(unzipStream).pipe(outputStream);
};

await decompressFile();