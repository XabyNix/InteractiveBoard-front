const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, './src/environments/environment.ts');

let envContent = fs.readFileSync(targetPath, 'utf8');

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  console.error('ERRORE: La variabile API_URL non è impostata su Vercel!');
  process.exit(1);
}

const updatedContent = envContent.replace('{API_URL}', apiUrl);

fs.writeFileSync(targetPath, updatedContent);

console.log('✅ Variabile API_URL iniettata con successo!');
