# Contributing to Tier List Maker

Thank you for your interest in contributing to Tier List Maker! 🎉

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- **Clear title** describing the bug
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (browser, OS, device)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:

- **Clear description** of the feature
- **Use case** - why this feature would be useful
- **Mockups or examples** if applicable

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   pnpm dev      # Test in development
   pnpm build    # Ensure it builds
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

## 📝 Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` types when possible

### React

- Use functional components
- Use hooks (useState, useEffect, useCallback, etc.)
- Keep components small and focused

### Naming Conventions

- **Components**: PascalCase (`TierListMaker.tsx`)
- **Functions**: camelCase (`handleDragStart`)
- **Constants**: UPPER_CASE (`STORAGE_KEY`)
- **Files**: kebab-case for utilities (`tier-list-maker.tsx`)

### CSS/Styling

- Use Tailwind CSS classes
- Use inline styles only for dynamic values
- Follow the existing theme structure

## 🌐 Internationalization

When adding new text:

1. Add to English: `src/i18n/messages/en.json`
2. Add to Chinese: `src/i18n/messages/zh.json`
3. Use translation keys in components

Example:
```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations();
<button>{t('common.save')}</button>
```

## 🧪 Testing

Before submitting:

- [ ] Test on desktop browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Test both light and dark themes
- [ ] Test both English and Chinese languages
- [ ] Ensure `pnpm build` completes successfully

## 📁 Project Structure

```
src/
├── app/              # Next.js pages and API routes
├── components/       # React components
│   ├── blocks/       # Landing page blocks
│   └── ui/           # Reusable UI components
├── i18n/             # Internationalization
├── lib/              # Utility functions
└── types/            # TypeScript types
```

## 🎯 Areas for Contribution

### High Priority

- [ ] Keyboard shortcuts (Ctrl+Z for undo, etc.)
- [ ] Custom tier names and colors
- [ ] Undo/Redo functionality
- [ ] Improve mobile UX

### Medium Priority

- [ ] More export formats (PDF, SVG)
- [ ] Tier list templates
- [ ] Image cropping/editing
- [ ] Batch operations

### Low Priority

- [ ] User accounts (optional)
- [ ] Cloud storage
- [ ] Public gallery
- [ ] Social sharing

## 🐛 Common Issues

### Build Errors

If you encounter build errors:

```bash
# Clear cache
rm -rf .next node_modules
pnpm install
pnpm build
```

### Type Errors

Ensure all TypeScript types are properly defined:
```bash
pnpm build  # This will show type errors
```

## 📞 Getting Help

- Create an issue for questions
- Check existing issues and PRs
- Read the [README](README.md)

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow

## 🎉 Recognition

All contributors will be:
- Listed in the contributors section
- Credited in release notes
- Appreciated forever! ❤️

---

Thank you for contributing to Tier List Maker! 🚀

