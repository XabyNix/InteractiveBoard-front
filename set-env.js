const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, './src/environments/environment.ts');

let envContent = fs.readFileSync(targetPath, 'utf8');

const apiUrl = process.env.API_URL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!apiUrl || !clientId || !clientSecret) {
  console.error('ERRORE: Una variabile ambiente non è impostata');
  process.exit(1);
}

const updatedContent = envContent.replace('{API_URL}', apiUrl)
  .replace('{CLIENT_ID}',clientId)
  .replace('{CLIENT_SECRET}', clientSecret);



fs.writeFileSync(targetPath, updatedContent);

console.log('✅ Variabile API_URL iniettata con successo!');
