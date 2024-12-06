import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, '..', 'db.json');

// Leer el archivo db.json
const db = JSON.parse(readFileSync(dbPath, 'utf8'));

// Actualizar los restaurantes
db.restaurants = db.restaurants.map(restaurant => ({
  ...restaurant,
  zones: restaurant.zones || ['main']
}));

// Escribir los cambios de vuelta al archivo
writeFileSync(dbPath, JSON.stringify(db, null, 2));

console.log('Restaurants updated successfully!');
