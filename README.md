# Tweetcoa.ch - SaaS for X Account Growth

Welcome to Tweetcoa.ch! This is a SaaS application designed to help users grow their X (formerly Twitter) accounts by uploading their tweet data (CSV), receiving detailed GPT-4o analysis and reports, earning growth badges, and tracking progress on a dedicated dashboard.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + daisyUI
- **UI Components**: shadcn/ui (to be initialized)
- **Backend & Auth**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: OpenAI GPT-4o (via OpenAI SDK)
- **Payments**: Stripe (to be integrated)

## Project Structure Highlights

- `src/app/`: Main application routes (marketing, pricing, dashboard, auth, etc.)
- `src/app/api/`: API backend routes (e.g., `/api/upload`, `/api/ping`)
- `src/components/`: Reusable React components (Navbar, Footer, DropCsv, etc.)
- `src/lib/`: Utility functions, Supabase client, OpenAI prompt logic.
- `src/providers/`: React Context providers (e.g., SupabaseProvider).
- `src/styles/`: Global styles and Tailwind CSS configuration.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm (or pnpm/yarn)
- Supabase account and project set up.
- OpenAI API key.

### 1. Clone the repository (if you haven't already)

```bash
# If you are starting from scratch with this generated code:
# git clone <your-repo-url>
# cd realtweetcoach
```

### 2. Create Environment Variables

Copy the `.env.example` (if provided, otherwise create `.env.local`) to `.env.local` and fill in your Supabase and OpenAI API keys:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# If using Supabase server-side functions that require a service role key:
# SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe (when integrating)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pk
# STRIPE_SECRET_KEY=your_stripe_sk
# STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

**Important**: Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correctly set for Supabase client-side initialization.

### 3. Install Dependencies

```bash
npm install
```

### 4. Initialize shadcn/ui (Recommended)

This project is set up to use shadcn/ui. Initialize it in your project:

```bash
npx shadcn-ui@latest init
```

Follow the prompts. You can choose the default options or customize as needed. This will typically create a `components.json` file and might update your `tailwind.config.ts` and `globals.css` (though we have already configured these, review any changes). You can then add individual shadcn/ui components as needed (e.g., `npx shadcn-ui@latest add button`).

### 5. Set up Supabase Database (if needed)

- Ensure your Supabase project has the necessary tables (e.g., for users (handled by Auth), reports, CSV uploads).
- Set up Supabase Storage buckets if you plan to store uploaded CSVs (e.g., a bucket named `csv-uploads`).
- Configure Row Level Security (RLS) policies on your Supabase tables.

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server (after building).
- `npm run lint`: Lints the codebase using ESLint.
- `npm run lint:fix`: Lints and automatically fixes issues.
- `npm run format`: Formats code using Prettier.

## Further Development

- Implement Stripe for payments.
- Complete the CSV processing logic in `/api/upload` using OpenAI.
- Flesh out the dashboard with real data and Supabase integration.
- Add Supabase RLS policies for data security.
- Create specific favicons and replace placeholders in `public/`.
