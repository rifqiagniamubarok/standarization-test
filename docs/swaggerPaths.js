import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load individual JSON files
const registerDoc = JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/register.json'), 'utf-8'));
const loginDoc = JSON.parse(fs.readFileSync(path.join(__dirname, 'paths/login.json'), 'utf-8'));

// Gather all path
const docPaths = {
  '/api/v1/auth/register': registerDoc,
  '/api/v1/auth/login': loginDoc,
};

// Export path
export default docPaths;
