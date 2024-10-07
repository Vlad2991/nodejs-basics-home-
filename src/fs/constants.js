import { fileURLToPath } from "url";
import { dirname } from "path";

export const ERROR_MSG = 'File system operation failed';
export const SUCCESS_MSG = 'Operation completed successfully';

const __filename = fileURLToPath(import.meta.url);
export const __DIR = dirname(__filename);