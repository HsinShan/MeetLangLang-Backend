module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ['airbnb-base'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        'linebreak-style': 0,
        'prefer-template': 0,
        'arrow-parens': ['error', 'always'],
        indent: [2, 4],
        'newline-per-chained-call': 0,
        'operator-linebreak': ['error', 'after'],
        'no-use-before-define': [
            'error',
            {
                functions: false,
                classes: true,
                variables: true,
            },
        ],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        'max-len': [
            'error',
            500,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            }],
        'no-useless-constructor': 0,
        'import/no-unresolved': 0,
        'no-console': 0,
    },
    plugins: [],
};
