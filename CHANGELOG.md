# [1.2.0](https://github.com/douglas-henrique/next-js-saas-boilerplate/compare/v1.1.0...v1.2.0) (2026-01-12)


### Bug Fixes

* add missing @testing-library/dom dependency ([7799d29](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/7799d29fd4841ad237c2a7347044bc371f14dbd4))
* **docker:** add build dependencies for lightningcss native binaries ([d695619](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/d6956197da8799db83474ffcab295b3026499238))
* **docker:** ensure lightningcss is rebuilt during image build ([694e9f1](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/694e9f17ecb6e72e8b8c3b3c8d149b3f5347c440))
* **docker:** improve container detection in docker-exec script ([0fba170](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/0fba170f473b014a698752152edd1e44626cdb5e))
* **docker:** remove obsolete version attribute and improve error handling ([31caf72](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/31caf729ea1a199ef1f88945394029cec205bca3))
* **docker:** update Dockerfile and fix service name in docker-exec script ([fdd1054](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/fdd1054dba4d6ae4eec1dac1bd8f01c6bd9ca13b))
* generate Prisma Client before type-check and fix implicit any types ([c3e556c](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/c3e556c6be16a74b8b6473782f2472facdb7c8ff))
* **prisma:** use npx for tsx commands to ensure availability ([e0b5afa](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/e0b5afae05cb57acddf6e9a419eede2519735917))
* remove seed config from prisma.config.ts ([1c52ae2](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/1c52ae2d8a642b70b45ed8cec560b3a599e9be07))
* use npx instead of yarn dlx for commitlint ([f429dbd](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/f429dbd0a73d0b5cbd3e0724748b0c285f78b7f2))


### Features

* **docker:** add convenience scripts for running commands in Docker ([3daf7a7](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/3daf7a76715b2b9cb0f7cc74036206c311307cbe))
* **prisma:** add database seed script ([43dff97](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/43dff971a798e39317de49172b8d7ba7691a6c85))
* **prisma:** configure Prisma ORM with Docker PostgreSQL ([3161d3b](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/3161d3b98897f3867014226c151d8d923a97c37e))

# [1.1.0](https://github.com/douglas-henrique/next-js-saas-boilerplate/compare/v1.0.0...v1.1.0) (2026-01-12)


### Features

* add .env.example file and update README with setup instructions ([f7acb75](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/f7acb75e61d402f593cf1f1a46e4dfffae884cb7))

# 1.0.0 (2026-01-12)


### Bug Fixes

* **ci:** allow semantic-release commits to bypass commitlint ([abf636a](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/abf636a5eef51ea90f47edb4a93796ac60c504e1))
* **ci:** update Node.js version to 22 for semantic-release compatibility ([cc66af8](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/cc66af886bfb8bd63e7dbf729e38947ec3e283ec))
* **lint:** resolve ESLint errors and warnings ([c63300c](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/c63300cf8ca48f02afa156c6ca012eb4b9b5a58c))


### Features

* add Docker configuration with PostgreSQL ([a25583a](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/a25583a87f0d9d76f48c3b16fb43b307e7f35963))
* add testing pipeline, CI/CD workflows and semantic-release ([1576f30](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/1576f3075eb6fc53e11031448da8196e547d824c))
* **docker:** add automatic dependency check and installation ([fbf1219](https://github.com/douglas-henrique/next-js-saas-boilerplate/commit/fbf1219a1c3353431e8a3b91b8b6e2f4c10e73ec))
