// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'main': ['Inconsolata', 'monospace'],
        'main-bold': ['Inconsolata', 'monospace'],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        // ... other colors
      },
    },
  },
  content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.tsx'], // Add your content sources here
  // ...
};
