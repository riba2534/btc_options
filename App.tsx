import React, { useState, useEffect, useMemo, Suspense, useCallback, memo } from 'react';
import { STRATEGIES, DEFAULT_BTC_PRICE } from '@/constants';
const StrategyDetail = React.lazy(() => import('@/components/StrategyDetail'));
import { StrategyCategory, Strategy } from '@/types';

/**
 * Sidebar category display order.
 *
 * Order follows the declaration order of the StrategyCategory enum. New enum
 * members are picked up automatically by Object.values — do NOT push entries
 * here manually (that would create duplicates). To change the sidebar order,
 * reorder the members in types.ts.
 */
const CATEGORY_ORDER: StrategyCategory[] = Object.values(StrategyCategory);

// Pre-parse all strategy names at module load (runs once)
const PARSED_NAMES = new Map<string, { cn: string; en: string }>();
const NAME_REGEX = /^(.*?)\s*[（(]\s*(.+?)\s*[）)]\s*$/;
STRATEGIES.forEach(strategy => {
  const m = strategy.name.match(NAME_REGEX);
  PARSED_NAMES.set(strategy.id, m
    ? { cn: m[1].trim(), en: m[2].trim() }
    : { cn: strategy.name.trim(), en: '' }
  );
});

// Memoized sidebar button component to prevent unnecessary re-renders
interface SidebarButtonProps {
  strategy: Strategy;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const SidebarButton = memo<SidebarButtonProps>(({ strategy, isSelected, onSelect }) => {
  const nameParts = PARSED_NAMES.get(strategy.id) || { cn: strategy.name, en: '' };

  return (
    <button
      onClick={() => onSelect(strategy.id)}
      aria-current={isSelected ? 'page' : undefined}
      className={`w-full text-left px-3 py-3 lg:py-2 rounded-lg text-sm font-medium transition-colors border-l-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${isSelected
        ? 'bg-blue-50 text-blue-700 border-blue-500 font-semibold'
        : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <div className="flex flex-col">
        <span>{nameParts.cn}</span>
        {nameParts.en && (
          <span className="text-xs opacity-70 font-normal truncate mt-0.5">{nameParts.en}</span>
        )}
      </div>
    </button>
  );
});

SidebarButton.displayName = 'SidebarButton';

const App: React.FC = () => {
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>(STRATEGIES[0].id);
  const [btcPrice] = useState<number>(DEFAULT_BTC_PRICE);
  // Lazily derive the initial layout from the real viewport so the first paint
  // already matches the device (no sidebar flash on mobile).
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => typeof window === 'undefined' || window.innerWidth >= 1024);

  const selectedStrategy = useMemo(() => (
    STRATEGIES.find(s => s.id === selectedStrategyId) || STRATEGIES[0]
  ), [selectedStrategyId]);

  // Track the viewport, but only force the sidebar open/closed when the lg
  // breakpoint is actually crossed — never clobber a manual toggle on resize.
  useEffect(() => {
    let rafId: number | null = null;
    let prevMobile = window.innerWidth < 1024;
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      if (mobile !== prevMobile) {
        prevMobile = mobile;
        setIsMobile(mobile);
        setIsSidebarOpen(!mobile);
      }
    };
    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        handleResize();
        rafId = null;
      });
    };

    window.addEventListener('resize', onResize);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Close the mobile drawer on Escape (drawer/modal a11y convention).
  useEffect(() => {
    if (!isMobile || !isSidebarOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSidebarOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobile, isSidebarOpen]);

  // Group strategies by category for sidebar (static, computed once)
  const strategiesByCategory = useMemo(() => {
    return STRATEGIES.reduce((acc, strategy) => {
      if (!acc[strategy.category]) {
        acc[strategy.category] = [];
      }
      acc[strategy.category].push(strategy);
      return acc;
    }, {} as Record<StrategyCategory, typeof STRATEGIES>);
  }, []);

  // Memoized callbacks to prevent child re-renders
  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  const handleStrategySelect = useCallback((id: string) => {
    setSelectedStrategyId(id);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false); // Auto close on mobile selection
    }
  }, []);

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden relative">

      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:top-2 focus:left-2 focus:bg-white focus:px-3 focus:py-2 focus:rounded-lg focus:shadow focus:ring-2 focus:ring-blue-500 text-sm font-medium text-blue-700"
      >
        跳到主要内容
      </a>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        id="strategy-sidebar"
        aria-label="侧边栏"
        inert={!isSidebarOpen || undefined}
        className={`
          fixed lg:relative z-50 h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out sidebar-animate
          ${isSidebarOpen ? 'translate-x-0 w-80 shadow-2xl lg:shadow-none' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden'}
        `}
      >
        <div className="w-80 flex flex-col h-full bg-white"> {/* Inner container to maintain width during transition */}
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 px-2">
                <img src="/favicon.svg" alt="BTC Options" className="h-10 w-10 rounded-md shadow-sm flex-shrink-0" />
                <div className="min-w-0 text-center">
                  <div className="text-slate-900 font-extrabold text-lg md:text-xl leading-tight">Option Strategy</div>
                  <div className="text-xs md:text-sm leading-tight bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">如果说衍生品是金融产品中的皇冠</div>
                  <div className="text-xs md:text-sm leading-tight bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">那么期权就是这顶皇冠上的明珠</div>
                </div>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={closeSidebar}
              aria-label="关闭侧边栏"
              className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-slate-700 rounded-md hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>

          <nav aria-label="期权策略列表" className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-4">
            {CATEGORY_ORDER.filter(cat => strategiesByCategory[cat]?.length > 0).map((category) => (
              <div key={category}>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2 sticky top-0 bg-white/95 backdrop-blur py-1 z-10">
                  {category}
                </h3>
                <div className="space-y-1">
                  {strategiesByCategory[category].map((strategy) => (
                    <SidebarButton
                      key={strategy.id}
                      strategy={strategy}
                      isSelected={selectedStrategyId === strategy.id}
                      onSelect={handleStrategySelect}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>基准价格 (Ref Price)</span>
              <span className="px-1.5 py-0.5 bg-slate-200 rounded text-[10px] text-slate-500 font-bold">FIXED</span>
            </div>
            <div className="font-mono font-bold text-lg text-slate-700">
              ${btcPrice.toLocaleString()}
            </div>
            <a
              href="https://github.com/riba2534/btc_options"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="在 GitHub 查看本项目源码"
              className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-lg py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.07 11.07 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .31.21.68.8.56A10.94 10.94 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
              </svg>
              <span>在 GitHub 查看源码</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main id="main-content" className="flex-1 h-full overflow-hidden bg-[#fafafa] flex flex-col w-full relative">
        {/* Toggle Button Area */}
        <div className="absolute top-4 left-4 z-30">
          <button
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? '隐藏侧边栏' : '显示策略列表'}
            aria-expanded={isSidebarOpen}
            aria-controls="strategy-sidebar"
            title={isSidebarOpen ? '隐藏侧边栏' : '显示策略列表'}
            className={`p-2.5 min-w-[44px] min-h-[44px] items-center justify-center bg-white/80 backdrop-blur border border-slate-200 shadow-sm rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isMobile && isSidebarOpen ? 'hidden' : 'flex'}`}
          >
            {isSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M9 3v18" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
            )}
          </button>
        </div>

        <Suspense fallback={
          <div className="flex-1 p-8 animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
            <div className="aspect-[4/3] max-h-[600px] bg-slate-200 rounded-2xl"></div>
          </div>
        }>
          <StrategyDetail strategy={selectedStrategy} btcPrice={btcPrice} />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
