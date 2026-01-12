This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- **Node.js**: Version 22 (required for Prisma 7 and semantic-release)
- **Yarn**: Package manager (install with `npm install -g yarn` or `corepack enable`)
- **PostgreSQL**: Database server (can be local or remote)

This project includes a `.nvmrc` file. If you use [nvm](https://github.com/nvm-sh/nvm), you can automatically use the correct Node.js version:

```bash
# Install and use the correct Node.js version
nvm install
nvm use
```

### Setup

1. **Install dependencies**:

```bash
yarn install
```

2. **Create a `.env` file in the project root**:

```bash
# Copy the example environment file
cp .env.example .env
```

The `.env.example` file contains all the necessary environment variables with default values. Update the `.env` file with your PostgreSQL connection details:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nextjs_saas
```

3. **Generate Prisma Client**:

```bash
yarn db:generate
```

4. **Apply database schema**:

```bash
yarn db:push
```

5. **Seed the database (optional)**:

```bash
yarn db:seed
```

### Local Development

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

- `app/` - Main Next.js application directory
- `components/` - Reusable React components
- `lib/` - Utilities and helpers
- `hooks/` - Custom React hooks

## Available Scripts

```bash
# Development
yarn dev             # Start development server
yarn build           # Create production build
yarn start           # Start production server

# Code Quality
yarn lint            # Run ESLint
yarn lint:fix        # Run ESLint and fix issues automatically
yarn type-check      # Check TypeScript types

# Testing
yarn test            # Run tests once
yarn test:watch      # Run tests in watch mode
yarn test:ui         # Open Vitest UI
yarn test:coverage   # Run tests with coverage

# Database
yarn db:generate     # Generate Prisma Client
yarn db:push         # Push schema changes to database
yarn db:migrate      # Run database migrations
yarn db:studio       # Open Prisma Studio
yarn db:seed         # Seed the database
yarn db:test         # Test database connection
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. Tests should be written alongside the code they test.

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

### Writing Tests

Tests should be placed in `*.test.ts` or `*.test.tsx` files next to the code they test, or in `__tests__` directories.

Example:
```typescript
import { describe, it, expect } from 'vitest'

describe('MyComponent', () => {
  it('should render correctly', () => {
    // your test here
  })
})
```

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) to standardize commit messages. This allows [semantic-release](https://github.com/semantic-release/semantic-release) to automatically determine the version and generate changelogs.

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc (doesn't affect code)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding or fixing tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes that don't modify src or tests
- `revert`: Revert a previous commit

### Examples

```bash
feat(auth): add login functionality
fix(button): correct hover state styling
docs(readme): update installation instructions
test(utils): add tests for cn function
chore(deps): update dependencies
```

### Commit Validation

Commits are automatically validated using [commitlint](https://commitlint.js.org/). If you use Husky (installed locally), commits will be validated before they are created.

## Semantic Release

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automate releases. When commits are made to the `main` or `master` branch following the Conventional Commits pattern, semantic-release:

1. Analyzes commits since the last release
2. Determines the version type (major, minor, patch)
3. Generates changelog automatically
4. Creates a Git tag
5. Publishes the release on GitHub

### How It Works

- **feat**: Increments minor version (1.0.0 → 1.1.0)
- **fix**: Increments patch version (1.0.0 → 1.0.1)
- **BREAKING CHANGE**: Increments major version (1.0.0 → 2.0.0)

### Configuration

The semantic-release configuration is in `.releaserc.json`. Releases are automatically executed in GitHub Actions when code is merged into the main branch.

## CI/CD

### Pull Requests

When a Pull Request is created or updated, the following checks are automatically executed:

1. **Lint & Type Check**: Validates code with ESLint and TypeScript
2. **Tests**: Runs all tests
3. **Build**: Verifies that the build works correctly
4. **Commitlint**: Validates that commit messages follow the pattern

All checks must pass for the PR to be merged.

### Releases

Releases are automatically created when code is merged into the `main` or `master` branch, as long as there are commits that justify a new version.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
