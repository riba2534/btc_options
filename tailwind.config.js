/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  // The strategy explanations are injected via dangerouslySetInnerHTML, so their
  // class names live inside string literals in src/strategies/**. The content
  // globs above already scan those files; the safelist is belt-and-suspenders for
  // the color / gradient families used dynamically.
  safelist: [
    { pattern: /^(from|via|to)-(slate|gray|red|rose|pink|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple)-(50|100|200|300|400|500|600)$/ },
    { pattern: /^(bg|text|border)-(slate|gray|red|rose|pink|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple)-(50|100|200|300|400|500|600|700|800|900)$/ },
    { pattern: /^bg-gradient-to-(r|br|b|t|tr)$/ },
    { pattern: /^border-l-\d$/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '"PingFang SC"', '"Microsoft YaHei"', '"Hiragino Sans GB"', '"Noto Sans SC"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Roboto Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
