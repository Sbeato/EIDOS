# EIDOS FORMA Client Hub

Mobile-first Next.js MVP for client URLs such as:

- `/e/vivolt`
- `/e/arkko`
- `/e/pangea`

The Next.js app lives at the repository root so Vercel can deploy without a Root Directory setting.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` from `.env.local.example`:

   ```bash
   cp .env.local.example .env.local
   ```

3. Add your real OpenAI API key in `.env.local`:

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-5
   ```

   Keep these variables server-side only. Do not prefix them with `NEXT_PUBLIC_`.

4. Start the app:

   ```bash
   npm run dev
   ```

## Client config

Client content lives in `lib/clients.ts`.

Each client has local config for brand colors, typography, strategy, positioning, key messages, tone of voice, design notes, Figma links, downloadable assets, and latest deliverables.

Public placeholder assets live in:

- `public/clients/vivolt/`
- `public/clients/arkko/`
- `public/clients/pangea/`

## Vercel

This is a standard Next.js App Router project and can deploy directly on Vercel. Set these environment variables in Vercel:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
