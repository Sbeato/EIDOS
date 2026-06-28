# EIDOS — FORMA Client Hub MVP

Mobile-first multi-client MVP for EIDOS.

## URLs

- `/e/vivolt`
- `/e/arkko`
- `/e/pangea`

## Vercel environment variables

Add these in Vercel → Project → Environment Variables:

```bash
OPENAI_API_KEY=your_real_key
OPENAI_MODEL=gpt-5
```

## Local setup

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open: http://127.0.0.1:3000/e/vivolt
