import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const computeHash = async () => {
    // Получаем путь к файлу
    const currentFile = fileURLToPath(import.meta.url);
    const currentDir = dirname(currentFile);
    const targetFile = join(currentDir, 'files/fileToCalculateHashFor.txt');

    // Создаем хеш-объект
    const hash = createHash('sha256');
    const fileStream = createReadStream(targetFile);

    // Обновляем хеш с данными из файла
    fileStream.on('data', (dataChunk) => {
        hash.update(dataChunk);
    });

    // Выводим хеш после завершения чтения файла
    fileStream.on('end', () => {
        console.log(hash.digest('hex'));
    });
};

await computeHash();