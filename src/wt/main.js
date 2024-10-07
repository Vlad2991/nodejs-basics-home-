import { Worker } from 'worker_threads';
import os from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const numCores = os.cpus().length;

// Получаем путь к файлу worker.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerPath = `${__dirname}/worker.js`;

// Функция для создания рабочего потока
const runWorker = (n) => {
    return new Promise((resolve) => {
        const worker = new Worker(workerPath);

        worker.postMessage(n);

        worker.on('message', (result) => {
            resolve(result);
        });

        worker.on('error', () => {
            resolve({ status: 'error', data: null });
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                resolve({ status: 'error', data: null });
            }
        });
    });
};

const performCalculations = async () => {
    const tasks = [];

    // Отправляем инкрементные числа, начиная с 10
    for (let i = 0; i < numCores; i++) {
        tasks.push(runWorker(10 + i)); // 10, 11, 12 и т.д.
    }

    const results = await Promise.all(tasks);

    // Выводим результаты
    console.log(results);
};

await performCalculations();