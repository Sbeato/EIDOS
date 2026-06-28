# FORMA Client Hub MVP

Mobile-first MVP for EIDOS: private client hub with a real Ask EIDOS agent.

## What it does

- Simple passcode screen
- Mobile-first hub UI
- Ask EIDOS agent powered by OpenAI Responses API
- Strategy / Brand / Product / Requests sections
- Request form MVP
- Deploy-ready to Vercel

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Environment variables

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5
CLIENT_NAME=Vivolt
NEXT_PUBLIC_CLIENT_NAME=Vivolt
NEXT_PUBLIC_HUB_PASSCODE=eidos
```

## Deploy today on Vercel

1. Create a new GitHub repo.
2. Upload this folder.
3. Go to Vercel → Add New Project → Import repo.
4. Add Environment Variables above.
5. Deploy.
6. Open the Vercel URL on your iPhone.
7. Share → Add to Home Screen.

## Notes

This is intentionally not a full platform. It is an MVP: one private space, one agent, zero friction.
