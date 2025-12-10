# Contributing to The Secret Lives of Identity

Thank you for your interest in contributing! This project is a community effort to make SPIFFE and workload identity concepts accessible to everyone.

## Ways to Contribute

### Report Bugs

Found something broken? [Open an issue](https://github.com/infamousjoeg/thesecretlivesofidentity/issues/new?template=bug_report.md) with:

- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser/device information

### Suggest Features

Have an idea? [Open a feature request](https://github.com/infamousjoeg/thesecretlivesofidentity/issues/new?template=feature_request.md) describing:

- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

### Improve Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add examples or diagrams
- Translate content (future goal)

### Submit Code

Ready to write code? Here's how:

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/thesecretlivesofidentity.git
   cd thesecretlivesofidentity
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create a branch for your work**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Code Guidelines

### TypeScript

- Use strict mode (no `any` types)
- Prefer interfaces for object shapes
- Use explicit return types on functions

### React

- Functional components only
- Named exports (no default exports)
- Co-locate styles with Tailwind classes

### Styling

- Use Tailwind CSS classes
- Follow the color palette in `docs/design-guidelines.md`
- Test with both light and dark modes (if applicable)

### Animations

- Only animate `transform` and `opacity`
- Always check `prefers-reduced-motion`
- Use timing constants from `src/utils/animations.ts`

### Accessibility

- Maintain WCAG AA contrast ratios
- Include proper ARIA labels
- Ensure keyboard navigation works

## Pull Request Process

1. **Ensure your code passes linting**
   ```bash
   npm run lint
   ```

2. **Build successfully**
   ```bash
   npm run build
   ```

3. **Write a clear PR description**
   - Describe what changes you made
   - Reference any related issues
   - Include screenshots for visual changes

4. **Be responsive to feedback**
   - Maintainers may request changes
   - Discussion is part of the process

## Content Guidelines

When adding or modifying educational content:

- **Target audience**: Assume zero prior knowledge of SPIFFE
- **Maintain the metaphor**: Use the corporate badge system metaphor consistently
- **Be accurate**: Verify technical details against [spiffe.io](https://spiffe.io)
- **Keep it concise**: Each frame should convey one main idea

## Questions?

- **GitHub Issues**: For bugs and feature requests
- **SPIFFE Slack**: For general SPIFFE questions ([slack.spiffe.io](https://slack.spiffe.io))

## Code of Conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License

By contributing, you agree that your contributions will be licensed under the Apache 2.0 License.

---

Thank you for helping make SPIFFE accessible to everyone!
