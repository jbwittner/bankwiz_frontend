[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jbwittner_bankwiz_frontend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jbwittner_bankwiz_frontend) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jbwittner_bankwiz_frontend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=jbwittner_bankwiz_frontend) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=jbwittner_bankwiz_frontend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=jbwittner_bankwiz_frontend) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jbwittner_bankwiz_frontend&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=jbwittner_bankwiz_frontend) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jbwittner_bankwiz_frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jbwittner_bankwiz_frontend) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jbwittner_bankwiz_frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jbwittner_bankwiz_frontend) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jbwittner_bankwiz_frontend&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=jbwittner_bankwiz_frontend) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jbwittner_bankwiz_frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jbwittner_bankwiz_frontend)

BankWiz Server is a banking-related server application. This README provides instructions for setting up and maintaining the project.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Requirements

To work on this project, it is necessary to define three environment variables: `USER_GITHUB_LOGIN`, `USER_GITHUB_KEY`, and `SONAR_TOKEN`.

The `USER_GITHUB_LOGIN` variable should be set with your GitHub login, which is your GitHub username.

The `USER_GITHUB_KEY` variable should be set with a Personal Access Token that has the required `read:packages` scope. This token grants access to GitHub packages.

The `SONAR_TOKEN` variable should be set with your SonarCloud token. This will allow you to push analysis results from your local machine to SonarCloud.

Ensure to keep these tokens and your Personal Access Token confidential and avoid sharing them with unauthorized individuals. By correctly setting these environment variables, your development environment will be able to securely access GitHub and SonarCloud using your credentials.

**Important note:** These environment variables need to be set either on the host machine (in case of using DevContainer) or directly on the machine where you develop.

## Authentication Configuration

This project uses Auth0 for authentication. Provide a .env file (.env.local for development, .env.production for production) in the project root with the following variables:

```bash
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret
```

## Code Quality

This project has both ESLint and Prettier configured. These tools can automatically highlight and fix many common programming errors and stylistic issues.

- **ESLint Check**: To run the linter, use the lint script:

```bash
pnpm run lint
```

- **Prettier Check**: To check if your code is formatted according to Prettier's rules, use the prettier script:

```bash
pnpm run prettier
```

- **Prettier Auto-fix**: To automatically fix any formatting errors that Prettier can handle, use the prettier:fix script:

```bash
pnpm run prettier:fix
```

## OpenAPI Library

This project utilizes the **@jbwittner/bankwiz_openapi-client** library for communication with the application's API. The library is designed to interact with the API endpoints and abstracts the intricacies of API communication. It provides an easy-to-use interface for sending HTTP requests to the server, handling responses, and converting between JavaScript objects and the data formats used by the API.

The library comes from the repository https://github.com/jbwittner/bankwiz_openapi. It's crucial to familiarize yourself with this library to understand how it facilitates communication between the application and its API. Using this library will allow you to focus more on developing the application's features, as the low-level details of API communication are handled for you.

Remember to always keep the library updated to the latest version to incorporate any improvements or bug fixes that have been made.

## Getting Started

First, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Backend

To use the backend application, you can use the provided `compose.yml`.
After that you need to configure BDD with scripts https://github.com/jbwittner/bankwiz_server/tree/develop/sql
