module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'unused-imports',
        'react-hooks',
    ],
    rules: {
        indent: [ 2, 4, { SwitchCase: 1 } ],
        'react/jsx-curly-spacing': [ 'error', { when: 'always' } ],
        '@typescript-eslint/member-delimiter-style': [ 'error', { multiline: { delimiter: 'none' } } ],
        'react/jsx-indent': [ 2, 4 ],
        'react/jsx-indent-props': [ 2, 4 ],
        'max-len': [ 2, { code: 120, ignoreComments: true } ],
        'object-curly-spacing': [ 'error', 'always' ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'unused-imports/no-unused-imports': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-unused-vars': 'warn',
        'react/jsx-props-no-spreading': 'warn',
        'no-plusplus': 'off',
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'react/jsx-filename-extension': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'no-shadow': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'no-extra-boolean-cast': 'off',
        'no-param-reassign': 'off',
        'no-undef': 'off',

        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
    },
};
