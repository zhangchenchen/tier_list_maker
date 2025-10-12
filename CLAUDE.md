# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server with turbopack
- `pnpm build` - Build for production (MUST run after JS/TSX changes)
- `pnpm lint` - Run linting
- `pnpm start` - Start production server locally

### Database Commands
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm db:push` - Push schema changes to database

### Other Commands
- `pnpm analyze` - Bundle analysis
- `fumadocs-mdx` - Process MDX content (runs in postinstall)

## Project Architecture

### Core Framework Stack
- **Next.js 15** with App Router and standalone output
- **TypeScript** with strict mode
- **Tailwind CSS** with shadcn/ui components
- **Drizzle ORM** with PostgreSQL
- **next-intl** for internationalization
- **fumadocs** for documentation
- **NextAuth.js** for authentication

### Directory Structure

#### `/src/app/` - Next.js App Router
- `[locale]/` - Internationalized routes
  - `(default)/` - Main application pages
  - `(admin)/` - Admin dashboard
  - `(console)/` - User console
  - `(docs)/` - Documentation
- `api/` - API routes including auth, payments, and utilities

#### `/src/components/`
- `blocks/` - Large page sections (hero, pricing, etc.)
- `ui/` - shadcn/ui base components
- Component organization follows feature-based structure

#### `/src/i18n/`
- `messages/` - Global translations (en, zh, ja, ko, fr, es, tw)
- `pages/` - Page-specific translations
- `locale.ts` - Supported locales configuration

#### `/src/db/`
- `schema.ts` - Drizzle schema definitions
- `migrations/` - Database migration files
- `config.ts` - Database configuration

### Key Features

#### Tier List Maker Component
- Located: `src/components/blocks/hero/tier-list-maker.tsx`
- Drag & drop functionality with @dnd-kit
- localStorage auto-save
- Mobile-responsive with touch support
- PNG export using html2canvas
- 5-tier system (S, A, B, C, D)

#### Internationalization
- 7 supported languages: en, zh, ja, ko, fr, es, tw
- Locale detection configurable via NEXT_PUBLIC_LOCALE_DETECTION
- Route prefixing with "as-needed" strategy
- Separate translation files for global and page-specific content

#### Authentication & Database
- NextAuth.js with multiple providers
- User management with invite system
- Credit/payment system with Stripe and Creem integration
- Admin dashboard for content management

#### Payment Integration
- Stripe for international payments
- Creem for local payments
- Webhook handling for payment callbacks

### Development Notes

#### Component Dependencies
- Uses shadcn/ui components extensively - check `components.json` for configuration
- Icons from @tabler/icons-react and lucide-react
- Framer Motion for animations

#### Styling Conventions
- Tailwind CSS with custom theme in `src/app/theme.css`
- CSS variables for theming support
- Mobile-first responsive design

#### Type Safety
- Comprehensive TypeScript types in `/src/types/`
- Drizzle ORM provides type-safe database operations
- Zod for runtime validation

#### Testing & Quality
- ESLint with Next.js configuration
- Bundle analysis available via ANALYZE=true

### Environment Configuration
- Database connection via Drizzle
- Authentication providers configuration
- Payment system API keys
- Internationalization settings

### MDX & Documentation
- fumadocs for documentation system
- MDX support with custom components
- Documentation content in `/content/docs/`