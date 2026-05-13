import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 8080;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

app.use(express.static(path.join(root, 'dist')));
app.use(express.static(path.join(root, 'public')));
app.use('/src', express.static(path.join(root, 'src')));  // prefijo /src

app.get('*', (req, res) => {
  res.sendFile(path.join(root, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});