import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();

function loadEnvFile(filename) {
  const filePath = path.join(PROJECT_ROOT, filename);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const equalIndex = trimmed.indexOf('=');
    if (equalIndex === -1) continue;
    const key = trimmed.slice(0, equalIndex).trim();
    const value = trimmed.slice(equalIndex + 1).trim().replace(/^"|"$/g, '');
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const PORT = Number(process.env.CHAT_SERVER_PORT || 8787);
const API_KEY = process.env.DASHSCOPE_API_KEY || '';
const BASE_URL =
  process.env.DASHSCOPE_BASE_URL ||
  'https://dashscope-us.aliyuncs.com/compatible-mode/v1/chat/completions';
const MODEL = process.env.DASHSCOPE_MODEL || 'qwen-plus';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json', ...corsHeaders });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    if (!API_KEY) {
      sendJson(res, 500, { error: '缺少 DASHSCOPE_API_KEY' });
      return;
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        const messages = Array.isArray(parsed.messages) ? parsed.messages : [];

        const response = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL,
            messages,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          sendJson(res, response.status, { error: errorText || '调用失败' });
          return;
        }

        const data = await response.json();
        const reply =
          data?.choices?.[0]?.message?.content ||
          data?.output?.choices?.[0]?.message?.content ||
          '';

        sendJson(res, 200, {
          reply,
          model: data?.model || MODEL,
          usage: data?.usage || data?.output?.usage,
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : '请求解析失败';
        sendJson(res, 500, { error: message });
      }
    });

    return;
  }

  res.writeHead(404, corsHeaders);
  res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Qwen proxy listening on http://0.0.0.0:${PORT}`);
});
