import { release as osRelease, version as osVersion } from 'os';
import { createServer as startServer } from 'http';
import { readFile as readFileAsync } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, sep as pathSeparator } from 'node:path';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentFilePath);

// Генерация случайного значения для выбора JSON-файла
const isFileA = Math.random() > 0.5;
let selectedData;

const filePath = isFileA ? `${currentDirPath}/files/a.json` : `${currentDirPath}/files/b.json`;

// Асинхронное чтение выбранного JSON-файла
selectedData = JSON.parse(
  await readFileAsync(filePath, { encoding: 'utf-8' })
);

// Вывод информации о системе и путях
console.log(`Operating system release: ${osRelease()}`);
console.log(`Node.js version: ${osVersion()}`);
console.log(`File path separator: "${pathSeparator}"`);
console.log(`Absolute path to current file: ${currentFilePath}`);
console.log(`Absolute path to current directory: ${currentDirPath}`);

// Создание и запуск сервера
const server = startServer((request, response) => {
  response.end('Request has been processed successfully');
});

const SERVER_PORT = 3000;

console.log(selectedData);

server.listen(SERVER_PORT, () => {
  console.log(`Server is running and listening on port ${SERVER_PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

// Экспортируемые объекты
export { selectedData, server };