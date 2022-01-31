# Dev Notes

# Project Overview

> Welcome to the secret project! This is a test project that provides documented api resources that you could use on your project.
> 

## Installation

```jsx
$ npm run install
$ npm run dev

# You can now explore http://localhost:3003/api-docs/ 
# or import http://localhost:3003/api-docs/swagger.json into your postman
```

## Package.json

### Project Usage

- `package.json` see file for details

### npm run scripts

- `npm run start`
- `npm run dev`
- `npm run build`
- `npm run build:tsc`
- `npm run test`
- `npm run lint`
- `npm run lint:fix`
- `npm run deploy:prod`
- `npm run deploy:dev`

## Docker

- .dockerignore

## VSCode

- .editorconfig - to define and maintain coding styles which helps team to be consistent. It takes precedence over global Visual Studio Code settings.

## Dotenv (.env)

- File created if you are using `dotenv` package which is used using `import 'dotenv/config'`. It reads off your .env file parses it and add the content on the process.env.
- **Best Practice**
    - only store API keys / DB Passwords
    - Avoid having multiple .env files these should vary between deployment and no sharing

## Linting (ESLint / Prettier)

- `.eslintignore` - ignored files for linting
    - **Project Setup**
        - `/dist` was ignored because this is a generated folder already for distribution
- `.eslintrc` - eslint config file
    - **Project Setup**
        - `"parser": "@typescript-eslint/parser"` - this will allow ESLint to understand TypeScript syntax without this it will try to parse it as regular JavaScript only.
        - `"extends": ["prettier", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],`
            - `plugin:@typescript-eslint/recommended` it is the recommended rule set from the plugin [https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts)
            - `prettier` is added to avoid ESLint from reporting formatting issues that will be handled/fixed by prettier and `plugin:prettier/recommended` is the ruleset from prettier
        - **Question**: Why is `plugins:['@typescript-eslint']` is missing?
        - **Other Helpful Notes:**
            - Community Configs
                - airbnb-typescript
                - `[eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)` and `[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)`
                - `[eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)`
                - `[eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)`
                - `[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)`
                - `[eslint-plugin-eslint-comments](https://www.npmjs.com/package/eslint-plugin-eslint-comments)`
- `.prettierrc` - see file for Prettier configuration

## Husky / Lint-Staged

<aside>
💡 You can use it to **lint your commit messages**, **run tests**, **lint code**, etc... when you commit or push. Husky supports **[all Git hooks](https://git-scm.com/docs/githooks)**.

</aside>

### Project Usage

- `.huskyrc` see file for configuration setup
- `.lintstagedrc.json` see file for configuration setup (has a wildcard `.ts`) to run lint for those files
- `"pre-commit": "lint-staged"` uses lint-staged package
    - Why? Because even though we want to lint your project it takes a lot of time to do it so by using lint-staged we can limit to only staged commits for faster pre-commit hook checking.
    - It will follow the lint setup mentioned above on ESLint section

## Testing

### Project Usage

## Swagger

### Project Usage

- `swagger.yaml`

# Project Structure

## Folder Structure

- `package.json`
- `src`
    - `src/configs` - folder for environment based configurations
    - `src/controllers`
    - `src/databases`
    - `src/dtos`
    - `src/exceptions`
    - `src/http`
    - `src/interfaces`
    - `src/logs`
    - `src/middlewares`
    - `src/models`
    - `src/routes`
    - `src/services`
    - `src/tests`
    - `src/utils`
    - `src/app.ts`
    - `src/index.ts`
    - `src/server.ts`