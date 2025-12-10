# The Secret Lives of Identity

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/thesecretlivesofidentity/deploys)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

An interactive visualization that explains SPIFFE and workload identity — no prior knowledge required.

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

### Created By

**Joe Garcia** ([@infamousjoeg](https://github.com/infamousjoeg))

Development assisted by [Claude](https://claude.ai) (Anthropic).

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

Apache 2.0 - See [LICENSE](LICENSE) for details.

---

*A community contribution to the SPIFFE ecosystem.*
