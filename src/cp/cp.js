import { spawn } from 'child_process';
import { stdin, stdout } from 'process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
    // Создаем дочерний процесс, передавая ему файл script.js и аргументы
    const child = spawn('node', [join(__dirname, 'files', 'script.js'), ...args], {
        stdio: ['pipe', 'pipe', 'pipe'] // Устанавливаем IPC-канал
    });

    // Перенаправляем stdin главного процесса в stdin дочернего
    stdin.pipe(child.stdin);

    // Перенаправляем stdout дочернего процесса в stdout главного процесса
    child.stdout.pipe(stdout);

    // Обрабатываем stderr дочернего процесса
    child.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    // Закрываем дочерний процесс при завершении
    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

// Пример вызова функции с аргументами
await spawnChildProcess(['arg1', 'arg2']);