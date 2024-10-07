import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const read = async () => {
    // Получаем путь к файлу
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, 'files/fileToRead.txt');

    // Создаем поток для чтения файла
    const stream = createReadStream(filePath);

    // Перенаправляем данные из потока в process.stdout
    stream.pipe(process.stdout);

    // Обрабатываем ошибки
    stream.on('error', (err) => {
        console.error('Ошибка при чтении файла:', err);
    });
};

await read();