# Contributing

Thank you for considering contributing to this project! This document provides guidelines for contributing.

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to standardize commit messages. This allows [semantic-release](https://github.com/semantic-release/semantic-release) to automatically determine the version and generate changelogs.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Formatting, missing semicolons, etc (doesn't affect code)
- **refactor**: Code refactoring
- **perf**: Performance improvement
- **test**: Adding or fixing tests
- **build**: Build system changes
- **ci**: CI configuration changes
- **chore**: Other changes that don't modify src or tests
- **revert**: Revert a previous commit

### Examples

```bash
feat(auth): add login functionality
fix(button): correct hover state styling
docs(readme): update installation instructions
test(utils): add tests for cn function
chore(deps): update dependencies
```

### Breaking Changes

To indicate a breaking change, add `BREAKING CHANGE:` in the commit footer:

```
feat(api): change authentication method

BREAKING CHANGE: The authentication method has changed from JWT to OAuth2
```

## Pull Request Process

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feat/my-feature`)
3. Make your changes following the commit convention
4. Add tests for your changes
5. Make sure all tests pass (`npm run test`)
6. Make sure lint passes (`npm run lint`)
7. Make sure the build works (`npm run build`)
8. Commit your changes following the Conventional Commits pattern
9. Push to your branch (`git push origin feat/my-feature`)
10. Open a Pull Request

## Testing

All PRs should include adequate tests. Run tests locally before opening a PR:

```bash
npm run test
```

## PR Checklist

Before opening a PR, make sure:

- [ ] Code follows project standards
- [ ] Tests have been added/updated
- [ ] All tests pass
- [ ] Lint passes without errors
- [ ] Build works correctly
- [ ] Documentation has been updated if necessary
- [ ] Commits follow the Conventional Commits pattern

## CI/CD

When you open a PR, the following checks will be automatically executed:

- Lint & Type Check
- Tests
- Build
- Commit message validation

All checks must pass for the PR to be merged.
