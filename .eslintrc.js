module.exports = {
    env: {
        es6: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 2018,
    },
    extends: [
        'plugin:jest/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    plugins: ['@typescript-eslint', 'import', 'jest'],
};
