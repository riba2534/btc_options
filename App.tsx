import React, { useState, useEffect, useMemo, Suspense, useCallback, memo } from 'react';
import { STRATEGIES, DEFAULT_BTC_PRICE } from '@/constants';
const StrategyDetail = React.lazy(() => import('@/components/StrategyDetail'));
import { StrategyCategory, Strategy } from '@/types';

/**
 * Fixed category display order for sidebar.
 * 
 * NOTE: This array is derived from StrategyCategory enum values.
 * If you add a new category to the enum, you MUST add it here too,
 * otherwise the new category won't appear in the sidebar.
 * 
 * To ensure all categories are included, this array should match
 * Object.values(StrategyCategory) in your preferred display order.
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
      className={`w-full text-left px-3 py-3 lg:py-2 rounded-lg text-sm font-medium transition-colors ${isSelected
        ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const selectedStrategy = useMemo(() => (
    STRATEGIES.find(s => s.id === selectedStrategyId) || STRATEGIES[0]
  ), [selectedStrategyId]);

  // Handle window resize to determine mobile state
  useEffect(() => {
    let rafId: number | null = null;
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        handleResize();
        rafId = null;
      });
    };

    handleResize(); // Initial check
    window.addEventListener('resize', onResize);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

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

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
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
              className="lg:hidden p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-4">
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
          </div>

          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>基准价格 (Ref Price)</span>
              <span className="px-1.5 py-0.5 bg-slate-200 rounded text-[10px] text-slate-500 font-bold">FIXED</span>
            </div>
            <div className="font-mono font-bold text-lg text-slate-700">
              ${btcPrice.toLocaleString()}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-hidden bg-[#fafafa] flex flex-col w-full relative">
        {/* Toggle Button Area */}
        <div className="absolute top-4 left-4 z-30">
          <button
            onClick={toggleSidebar}
            className={`p-2 bg-white/80 backdrop-blur border border-slate-200 shadow-sm rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-all ${isSidebarOpen && !isMobile ? 'hidden' : 'flex'}`}
            title={isSidebarOpen ? "Hide Sidebar" : "Show Strategies"}
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
