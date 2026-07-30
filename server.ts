import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Translation / Speech AI enhancement endpoint
  app.post('/api/translate', async (req, res) => {
    const { text, targetLang = 'sw' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      // Return simple mock translation fallback if API key not supplied
      const mockSwahili: Record<string, string> = {
        'How am I looking on your minimore?': 'Vipi ninaonekana kwenye mchoro wako?',
        'What??': 'Nini??',
        'That\'s a teo in your comments.': 'Hiyo ni maoni katika maelezo yako.',
        'Emergency Fire Warning': 'Onyo la Moto la Dharura',
        'Traffic & Horns nearby': 'Magari na Honi karibu',
      };
      return res.json({
        translatedText: mockSwahili[text] || `[SW] ${text}`,
        source: 'fallback',
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Translate the following speech transcript into ${
        targetLang === 'sw' ? 'Swahili (Swahili spoken in Kenya)' : 'English'
      }. Keep the output natural and concise, output ONLY the translated string without extra quotes or formatting: "${text}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const translated = response.text?.trim() || text;
      res.json({ translatedText: translated, source: 'gemini' });
    } catch (err: any) {
      console.error('Gemini translation error:', err);
      res.json({ translatedText: `[SW] ${text}`, source: 'fallback_err' });
    }
  });

  // Sound environment analysis endpoint
  app.post('/api/analyze-sound', async (req, res) => {
    const { promptText } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        detectedSound: promptText || 'High-frequency siren detected',
        category: 'Hazard',
        recommendedPattern: 'rapid-triple-pulse',
        confidence: 0.94,
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are HaptiQ AI sound identifier engine for Deaf accessibility.
Analyze this sound description: "${promptText}".
Respond in JSON format with keys:
"detectedSound" (string), "category" (Hazard, Traffic, Social, or Call), "recommendedPattern" (pulse pattern description e.g. "rapid-double", "long-vibration", "intermittent-staccato"), "confidence" (number between 0.8 and 0.99).`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('Gemini sound analysis error:', err);
      res.json({
        detectedSound: promptText || 'Environmental sound',
        category: 'Hazard',
        recommendedPattern: 'pulse-medium',
        confidence: 0.88,
      });
    }
  });

  // Vite development middleware vs production static serve
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HaptiQ Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
