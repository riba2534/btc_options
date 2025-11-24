# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based web application for Bitcoin options strategy analysis and education. It provides interactive P&L charts, detailed strategy explanations, and AI-powered insights using Google Gemini API.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Component Structure
- **App.tsx**: Main application with responsive sidebar navigation and strategy categorization
- **StrategyDetail.tsx**: Core strategy analysis component with P&L calculations and scenario analysis
- **PnLChart.tsx**: Interactive chart component using Recharts for P&L visualization

### Key Files
- **constants.ts**: Contains 20+ Bitcoin options strategy definitions with Chinese/English names and risk analysis
- **types.ts**: TypeScript interfaces for Strategy, OptionLeg, ChartPoint, and StrategyCategory
- **services/geminiService.ts**: Google Gemini API integration for AI-powered strategy insights
- **vite.config.ts**: Build configuration with port 3000 and environment variable handling

### Technology Stack
- React 19.2.0 with TypeScript
- Vite 6.2.0 for build tooling
- Recharts 3.5.0 for charting
- Tailwind CSS (CDN)
- Google Gemini API for AI features

## Environment Setup

### Required Environment Variable
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Local Development
1. Create `.env.local` file in project root
2. Add `GEMINI_API_KEY` to the file
3. Run `npm run dev` to start development server

## Deployment

This project uses GitHub Actions for automated deployment to GitHub Pages:

- **Workflow**: `.github/workflows/deploy.yml`
- **Trigger**: Push to main branch
- **Domain**: option.riba2534.cn
- **Build Output**: `/dist` directory

The workflow requires `GEMINI_API_KEY` to be configured as a GitHub secret (Settings > Secrets and variables > Actions).

## Key Development Patterns

### Adding New Strategies
1. Define strategy in `constants.ts` following existing structure
2. Include Chinese and English names, risk profile, scenarios, and Greeks analysis
3. Ensure strategy category matches StrategyCategory enum

### Working with Charts
- P&L calculations are performed in `StrategyDetail.tsx`
- Chart data format uses ChartPoint interface from `types.ts`
- Color coding: green for profit, red for loss

### API Integration
- Gemini API calls are handled in `services/geminiService.ts`
- Environment variables are injected via Vite's define configuration
- API responses include strategy analysis and risk assessment

## TypeScript Configuration

- Target: ES2022
- Strict mode enabled
- React JSX transform
- Path alias: `@` resolves to project root