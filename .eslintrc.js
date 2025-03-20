module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  rules: {
    // Relaxed rules for development
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': ['warn', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_' 
    }]
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'public/',
    '*.config.js'
  ]
};
