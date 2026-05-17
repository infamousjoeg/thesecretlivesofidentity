# The Secret Lives of Identity

[![Netlify Status](https://api.netlify.com/api/v1/badges/e16e5597-61ec-4a0d-9bfc-9d1539877f6b/deploy-status)](https://app.netlify.com/sites/thesecretlivesofidentity/deploys)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

An interactive visualization that explains SPIFFE and workload identity — no prior knowledge required. Available in multiple languages.

**[View the Visualization](https://thesecretlivesofidentity.com)**

## What You'll Learn

Choose your learning path based on how much time you have:

| Track | Duration | What You'll Learn |
|-------|----------|-------------------|
| **Bronze** | ~6 min | The identity crisis and core SPIFFE concepts |
| **Silver** | ~17 min | SPIRE architecture, attestation flows, and using identity |
| **Gold** | ~25 min | Complete deep dive including lifecycle, federation, and advanced topics |

Each track builds on the previous one. Start with Bronze if you're new to workload identity.

## About SPIFFE

**SPIFFE** (Secure Production Identity Framework for Everyone) is an open standard for securely identifying workloads in dynamic environments. Instead of managing secrets like API keys or passwords, SPIFFE gives each workload a cryptographic identity that:

- Is automatically issued and rotated
- Never requires manual distribution
- Can be verified by any other workload
- Works across clouds, containers, and bare metal

**SPIRE** is the reference implementation that makes SPIFFE real. Together, they form the foundation for zero-trust networking.

This visualization uses a **corporate badge system metaphor** to make these concepts intuitive — your SPIFFE ID is like your employee ID number (permanent), while your SVID is like your physical badge (expires and gets renewed automatically).

## Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/infamousjoeg/thesecretlivesofidentity.git
cd thesecretlivesofidentity

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Other Commands

```bash
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
npm run test     # Run Playwright tests
```

## Multi-Language Support

The visualization is fully internationalized using [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/). Users select their preferred language from the dropdown in the top-right corner of any page. The choice is saved to `localStorage` under the key `spiffe-language` and restored on the next visit.

### Supported Languages

| Code | Language |
|------|----------|
| `en` | English |
| `pt-BR` | Português (Brasil) |

### Contributing Translations

All locale files live under `src/locales/<language-code>/` and are split into five namespaces:

| File | Contents |
|------|----------|
| `ui.json` | Navigation labels, buttons, keyboard hints, accessibility text |
| `landing.json` | Landing page hero, track descriptions, about section |
| `tracks.json` | Track selector card titles, durations, goals |
| `content.json` | Frame titles, body text, and section names (all 95 frames) |
| `frames.json` | Animation strings hardcoded inside SVG/JSX frame components |

**To add a new language:**

1. Create a new directory: `src/locales/<code>/`
2. Copy all five JSON files from `src/locales/en/` into the new directory
3. Translate every value in each file (keys must remain identical)
4. Register the language in `src/i18n.ts`:
   ```typescript
   // Add to the resources object
   '<code>': { ui, landing, tracks, content, frames },
   
   // Add to supportedLanguages
   { code: '<code>', label: 'Language Name' },
   ```
5. Verify the build passes: `npm run build`

### Translation Key Conventions

- **UI strings:** `t('ui:key')` — e.g., `t('ui:nextFrame')`
- **Frame content:** `t('content:frames.1-4.title')` — section and frame id as written in the content data files
- **Frame animations:** `t('frames:frame1_4.exposedLabel')` — component name in snake_case, then a descriptive key
- **Missing keys:** Always use `{ defaultValue: 'English text' }` as a fallback so the app never shows a raw key string

## Documentation

- [Design Guidelines](docs/design-guidelines.md) - Visual design system and brand guidelines
- [Architecture](docs/architecture.md) - Technical overview for developers
- [Contributing](CONTRIBUTING.md) - How to contribute to this project

## Credits

### Inspiration

This project is inspired by [The Secret Lives of Data](http://thesecretlivesofdata.com/) by Ben Johnson, which brilliantly visualizes the Raft consensus algorithm. We aim to bring the same clarity to workload identity.

### SPIFFE Community

- [SPIFFE Specification](https://spiffe.io) - The standard this visualization explains
- [SPIRE](https://github.com/spiffe/spire) - The reference implementation
- ["Solving the Bottom Turtle"](https://spiffe.io/book/) - The SPIFFE book that informed much of this content
- [SPIFFE Slack](https://slack.spiffe.io) - Join the community

### Built With

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) — internationalization

### Created By

**Joe Garcia** ([@infamousjoeg](https://github.com/infamousjoeg))

Development assisted by [Claude](https://claude.ai) (Anthropic).

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

Apache 2.0 - See [LICENSE](LICENSE) for details.

---

*A community contribution to the SPIFFE ecosystem.*
