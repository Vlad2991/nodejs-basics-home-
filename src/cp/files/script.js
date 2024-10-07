const args = process.argv.slice(2); // Получаем аргументы из командной строки

console.log(`Received arguments: ${args.join(', ')}`);

// Чтение из stdin (для примера)
process.stdin.on('data', (data) => {
    console.log(`Received from stdin: ${data.toString()}`);
});
