import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const svgDir = path.join(__dirname, 'feather');
const outputFilePath = path.join(__dirname, 'icons.json'); // Adjust the path as needed

fs.readdir(svgDir, (err, files) => {
  if (err) {
    return console.error('Could not list the directory.', err);
  }

  const svgPaths = files
    .filter(file => path.extname(file) === '.svg')
    .map(file => `feather/${file}`); // Adjust the path as needed

  fs.writeFile(outputFilePath, JSON.stringify(svgPaths, null, 2), (err) => {
    if (err) {
      return console.error('Could not write the JSON file.', err);
    }
    console.log('SVG paths written to JSON file.');
  });
});
