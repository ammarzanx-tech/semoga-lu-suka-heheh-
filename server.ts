import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SAVED_SLIDES_PATH = path.resolve(__dirname, 'src/assets/savedSlides.json');
const SAVED_MUSIC_META_PATH = path.resolve(__dirname, 'src/assets/savedMusic.json');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const BGM_FILE_PATH = path.resolve(PUBLIC_DIR, 'bgm.mp3');

function readSavedSlides(): Record<string, string> {
  try {
    if (fs.existsSync(SAVED_SLIDES_PATH)) {
      const raw = fs.readFileSync(SAVED_SLIDES_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read savedSlides.json:', err);
  }
  return {};
}

function writeSavedSlides(data: Record<string, string>) {
  try {
    fs.mkdirSync(path.dirname(SAVED_SLIDES_PATH), { recursive: true });
    fs.writeFileSync(SAVED_SLIDES_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write savedSlides.json:', err);
  }
}

function readMusicMeta(): { hasMusic: boolean; fileName: string; updatedAt: number } {
  try {
    const fileExists = fs.existsSync(BGM_FILE_PATH);
    if (fs.existsSync(SAVED_MUSIC_META_PATH)) {
      const meta = JSON.parse(fs.readFileSync(SAVED_MUSIC_META_PATH, 'utf-8'));
      return {
        hasMusic: Boolean(meta.hasMusic && fileExists),
        fileName: meta.fileName || '',
        updatedAt: meta.updatedAt || 0,
      };
    }
  } catch (err) {
    console.error('Failed to read savedMusic.json:', err);
  }
  return { hasMusic: false, fileName: '', updatedAt: 0 };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  app.get('/api/slides', (_req, res) => {
    res.json(readSavedSlides());
  });

  app.post('/api/slides', (req, res) => {
    const { updates } = req.body as { updates?: Record<string, string> };
    if (!updates || typeof updates !== 'object') {
      res.status(400).json({ error: 'Invalid updates payload' });
      return;
    }
    const current = readSavedSlides();
    const merged = { ...current, ...updates };
    writeSavedSlides(merged);
    res.json({ ok: true, slides: merged });
  });

  app.get('/api/music', (_req, res) => {
    res.json(readMusicMeta());
  });

  app.post('/api/music', (req, res) => {
    try {
      const { dataUrl, fileName } = req.body as { dataUrl?: string; fileName?: string };
      if (!dataUrl || typeof dataUrl !== 'string') {
        res.status(400).json({ error: 'Invalid audio dataUrl' });
        return;
      }
      const commaIdx = dataUrl.indexOf(',');
      const base64 = commaIdx !== -1 ? dataUrl.slice(commaIdx + 1) : dataUrl;
      const buffer = Buffer.from(base64, 'base64');

      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
      fs.writeFileSync(BGM_FILE_PATH, buffer);

      const meta = {
        hasMusic: true,
        fileName: fileName || 'bgm.mp3',
        updatedAt: Date.now(),
      };
      fs.writeFileSync(SAVED_MUSIC_META_PATH, JSON.stringify(meta, null, 2), 'utf-8');

      res.json({ ok: true, meta });
    } catch (err) {
      console.error('Failed to save MP3:', err);
      res.status(500).json({ error: 'Failed to save MP3 file' });
    }
  });

  // Serve /bgm.mp3 directly in both development and production
  app.get('/bgm.mp3', (_req, res) => {
    if (fs.existsSync(BGM_FILE_PATH)) {
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(BGM_FILE_PATH);
    } else {
      res.status(404).end();
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
