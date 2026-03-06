# Contributing to Eclipse Lyra

Thank you for your interest in contributing to Eclipse Lyra.

## License

By contributing, you agree that your contributions will be licensed under the [Eclipse Public License 2.0](https://www.eclipse.org/legal/epl-2.0) (EPL-2.0).

## Eclipse Contributor Agreement

Before your first contribution can be accepted, you must complete the [Eclipse Contributor Agreement](https://www.eclipse.org/legal/ECA.php) (ECA). The ECA is a one-time agreement that applies to all Eclipse Foundation projects.

## How to contribute

1. **Open an issue** — For bugs or feature requests, open an [issue](https://github.com/eclipse-lyra/core/issues) to discuss.
2. **Fork and clone** — Fork the repository and clone your fork locally.
3. **Create a branch** — Use a short, descriptive branch name (e.g. `fix/command-palette`, `feat/settings-panel`).
4. **Make changes** — Follow the existing code style and run the test suite.
5. **Commit** — Use clear commit messages. Sign off your commit (e.g. `git commit -s`) to confirm the ECA.
6. **Push and open a PR** — Push your branch and open a pull request against `main`. Reference any related issues.

## Development setup

```bash
git clone https://github.com/eclipse-lyra/core.git
cd core
npm install
npm run dev          # run the default app
npm run test         # run tests
npm run build:app    # build core and app
npm run type-check   # TypeScript check
```

## Code and PR expectations

- Keep changes focused; prefer smaller PRs.
- Ensure `npm run test` and `npm run type-check` pass.
- New features or API changes may require updates to docs under `docs/`.

## Questions

For questions or discussion, open a [GitHub Discussion](https://github.com/eclipse-lyra/core/discussions) or an issue.
