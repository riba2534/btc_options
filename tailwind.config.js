import colors from 'tailwindcss/colors';

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
      // Color-family aliases: the 46 strategy content files mix red/green/violet
      // with rose/emerald/purple for the *same* semantic (loss/profit/volatility),
      // producing visibly mismatched gradients (e.g. from-red-50 to-rose-50).
      // Re-pointing the family to its sibling collapses those into true same-hue
      // gradients without touching any of the 46 files. `yellow` is intentionally
      // NOT aliased to `amber` here: yellow is the "实战案例-中等结果" semantic
      // and amber is the "⚠️ 风险提示" semantic — merging them would make two
      // unrelated meanings share one color family.
      colors: {
        red: colors.rose,
        green: colors.emerald,
        violet: colors.purple,
        // Vivid blue, not a desaturated navy — an earlier pass picked a muted
        // steel-navy here for "brand identity separation" from the NEUTRAL
        // category's blue, but in practice it just read as dull. This is
        // Tailwind's own `blue` scale, matching the bright blue-600 the
        // original UI already used for every interactive/selected state.
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        pnl: {
          profit: '#059669',
          profitSoft: '#10B981',
          loss: '#E11D48',
          lossSoft: '#FB7185',
          current: '#2563EB',
        },
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.03em' }],
      },
      boxShadow: {
        // Default content-card elevation — near-invisible, used everywhere a
        // card used to be a flat `border` or `shadow-sm`.
        card: '0 1px 2px rgba(15,23,42,0.04)',
        // Page-level "shell" containers (Construction / Scenario / Detail /
        // PnL chart outer frame) — replaces the box-shadow string that used
        // to be hand-copied across 4 separate places.
        shell: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.10)',
        // Reserved for the single most important element on the page (the
        // PnL chart) so it reads as the visual anchor instead of competing
        // with every other card at the same weight.
        spotlight: '0 4px 6px -2px rgba(15,23,42,0.05), 0 12px 28px -6px rgba(15,23,42,0.18)',
      },
    },
  },
  plugins: [],
}
