module.exports = {
    extends: [
        '@commitlint/config-conventional',
    ],
    rules: {
        'type-enum': [2, 'always', [
            'feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore',
        ]],
        'scope-enum': [2, 'always', [
            'env', 'app', 'db', 'apitest',
        ]],
        'scope-empty': [2, 'never'],
    },
};
