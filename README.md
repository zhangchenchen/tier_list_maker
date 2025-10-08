# Tier List Maker

> 🌐 Languages: **English** | [中文](README.zh.md) | [日本語](README.ja.md)

🎯 **Free Online Tier List Maker** - Create and share professional tier lists in seconds!

![preview](preview.png)

## ✨ Features

- 🆓 **100% Free Forever** - No registration, no hidden fees
- 🎨 **Drag & Drop Interface** - Intuitive and easy to use
- 📱 **Mobile Friendly** - Works seamlessly on all devices
- 💾 **Auto-Save** - Never lose your work with localStorage
- 🖼️ **High-Quality Export** - Download as PNG images
- 🌐 **Multi-language** - English, Chinese & Japanese support
- 🎯 **5 Tier System** - S, A, B, C, D ranking system

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/zhangchenchen/tier_list_maker.git
cd tier_list_maker
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

```bash
cp .env.example .env.development
```

4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎨 Customization

### Theme

Set your theme colors in `src/app/theme.css`

You can use [TweakCN Theme Editor](https://tweakcn.com/editor/theme) to customize colors.

### Landing Page Content

Edit content in:
- English: `src/i18n/pages/landing/en.json`
- Chinese: `src/i18n/pages/landing/zh.json`
- Japanese: `src/i18n/pages/landing/ja.json`

### Messages & Translations

Update translations in:
- `src/i18n/messages/en.json`
- `src/i18n/messages/zh.json`
- `src/i18n/messages/ja.json`

## 📦 Build

Build for production:

```bash
pnpm build
```

Test production build locally:

```bash
pnpm start
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Deploy!

### Deploy to Cloudflare Pages

1. Build the project:

```bash
pnpm build
```

2. Deploy to Cloudflare Pages using the `.next` output

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Image Export**: [html2canvas](https://html2canvas.hertzen.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📁 Project Structure

```
tier_list_maker/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React components
│   │   ├── blocks/       # Landing page blocks
│   │   │   └── hero/     # Hero section with Tier List Maker
│   │   └── ui/           # Shadcn UI components
│   ├── i18n/             # Internationalization
│   │   ├── messages/     # Global translations
│   │   └── pages/        # Page-specific translations
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript types
├── public/               # Static assets
└── content/             # MDX documentation
```

## 🎯 Key Components

### Tier List Maker

Location: `src/components/blocks/hero/tier-list-maker.tsx`

Features:
- Drag & drop item organization
- Auto-save with localStorage
- Mobile quick menu
- Real-time theme detection
- High-quality PNG export
- Loading states & progress feedback

## 🌐 Internationalization

The project supports multiple languages:

- English (`en`)
- Chinese (`zh`)
- Japanese (`ja`)

Add more languages by:
1. Creating new JSON files in `src/i18n/messages/`
2. Adding translations in `src/i18n/pages/landing/`
3. Updating locale configuration in `src/i18n/routing.ts`

## 📝 License

[MIT License](LICENSE)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📱 Social Media & SEO

The project includes comprehensive social media optimization:

- **Open Graph tags** - For Facebook, LinkedIn sharing
- **Twitter Cards** - For Twitter previews
- **SEO metadata** - Keywords, descriptions, alt tags
- **Multi-language support** - English, Chinese & Japanese metadata

See [Social Media Guide](SOCIAL_MEDIA_GUIDE.md) for testing and optimization tips.

### Testing Your Social Cards

- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

## 📧 Contact

- Website: [tierlist-maker.com](https://tierlist-maker.com)
- Email: support@tierlist-maker.com
- Twitter: [@tierlistmaker](https://twitter.com/tierlistmaker)

---

Made with ❤️ by the Tier List Maker team
