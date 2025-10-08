# Changelog

All notable changes to Tier List Maker will be documented in this file.

## [1.2.0] - 2025-01-08

### 🌐 Tier List Maker Internationalization

- **Multi-language Support for Interactive Component** - Tier List Maker now fully supports 3 languages
  - English, Chinese (中文), and Japanese (日本語)
  - All UI text: buttons, toast messages, empty states, mobile menu
  - Dynamic content: loading states, success/error messages, item counts
  - Localized watermark text in exported images
  - Translation files:
    - `src/i18n/messages/en.json` - English translations
    - `src/i18n/messages/zh.json` - Chinese translations  
    - `src/i18n/messages/ja.json` - Japanese translations

### 📚 Documentation

- **Japanese README** - Added `README.ja.md` with full Japanese documentation
- **Language Navigation** - Added language switcher links to all README files
  - English, Chinese, and Japanese versions now cross-reference each other
  - Updated all documentation to reflect Japanese language support

## [1.1.0] - 2025-01-08

### 🌐 Internationalization

- **Japanese Language Support** - Added full Japanese (日本語) localization
  - Landing page translation (`src/i18n/pages/landing/ja.json`)
  - Global messages translation (`src/i18n/messages/ja.json`)
  - SEO metadata in Japanese
  - Updated routing to support `/ja` locale

## [1.0.0] - 2025-01-08

### 🎉 Initial Release

#### ✨ Core Features

- **Tier List Creator** - Interactive drag & drop tier list maker
  - 5-tier ranking system (S, A, B, C, D)
  - Upload and organize custom images
  - Real-time tier organization
  
- **User Experience**
  - Drag & drop for desktop
  - Mobile quick menu with tap-to-move
  - Double-click to cycle tiers (desktop)
  - Auto-save with localStorage
  - Loading states and progress feedback
  
- **Export & Sharing**
  - High-quality PNG export (2x scale)
  - Watermark: "Made by tierlist-maker.com"
  - Theme-aware export (light/dark)
  
- **Design & Accessibility**
  - Light and dark theme support
  - Fully responsive design
  - Mobile-friendly interface
  - Empty state guidance
  
- **Internationalization**
  - English (en) language support
  - Chinese (zh) language support
  - Multi-language landing pages

#### 🎨 UI/UX Enhancements

- **Visual Feedback**
  - Drop zone highlighting during drag
  - Semi-transparent dragged items
  - Hover effects on items
  - Smooth transitions
  
- **Mobile Optimizations**
  - Bottom sheet quick menu
  - Touch-friendly interactions
  - Responsive tier heights
  - Adaptive instructions

#### 🔧 Technical Features

- Next.js 15 App Router
- TypeScript for type safety
- Tailwind CSS styling
- Shadcn UI components
- html2canvas for image export
- next-intl for i18n
- localStorage persistence

#### 📄 Documentation

- Comprehensive README (English & Chinese)
- Privacy Policy
- Terms of Service
- Implementation documentation
- Usage guide

#### 🐛 Bug Fixes

- Fixed SSR window object errors
- Fixed oklch color compatibility with html2canvas
- Fixed theme detection for export
- Fixed JSON syntax in i18n files
- Fixed mobile menu positioning

#### 🚀 Performance

- Optimized render cycles with useCallback
- Efficient localStorage updates
- Theme change observer
- Responsive design breakpoints

---

## Future Roadmap

### Planned Features

- [ ] Undo/Redo functionality
- [ ] Custom tier names and colors
- [ ] Save/load tier list templates
- [ ] Cloud storage integration
- [ ] Share via URL
- [ ] More tier systems (F-tier, custom tiers)
- [ ] Keyboard shortcuts
- [ ] Batch operations
- [ ] Image cropping/editing
- [ ] Text labels for items

### Under Consideration

- [ ] User accounts (optional)
- [ ] Public tier list gallery
- [ ] Collaborative editing
- [ ] Export formats (PDF, SVG)
- [ ] API access
- [ ] Embed widget for websites

---

**Legend:**
- ✨ New features
- 🎨 UI/UX improvements
- 🐛 Bug fixes
- 🔧 Technical changes
- 📄 Documentation
- 🚀 Performance improvements

