module.exports = {
    'extends': ['standard', 'standard-react'],
    'env': {
        'browser': true,
        'node': true,
        'es6': true,
        'jest': true
    },
    'parser': 'babel-eslint',
    'rules': {
      'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],
      'space-before-function-paren': [2, 'never'],
      'no-class-assign': 0,
      'jsx-quotes': [2, 'prefer-double'],
      'react/prop-types': 1,
      'react/jsx-boolean-value': [2, 'always'],
      'react/jsx-no-bind': [2, {
        'allowArrowFunctions': true,
        'allowBind': false
      }]
    }
}
