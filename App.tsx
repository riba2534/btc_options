import React, { useState, useEffect } from 'react';
import { STRATEGIES, DEFAULT_BTC_PRICE } from './constants';
import StrategyDetail from './components/StrategyDetail';
import { StrategyCategory } from './types';

const App: React.FC = () => {
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>(STRATEGIES[0].id);
  const [btcPrice] = useState<number>(DEFAULT_BTC_PRICE);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const selectedStrategy = STRATEGIES.find(s => s.id === selectedStrategyId) || STRATEGIES[0];

  // Handle window resize to determine mobile state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false); // Default closed on mobile
      } else {
        setIsSidebarOpen(true); // Default open on desktop
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Group strategies by category for sidebar
  const strategiesByCategory = STRATEGIES.reduce((acc, strategy) => {
    if (!acc[strategy.category]) {
      acc[strategy.category] = [];
    }
    acc[strategy.category].push(strategy);
    return acc;
  }, {} as Record<StrategyCategory, typeof STRATEGIES>);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleStrategySelect = (id: string) => {
    setSelectedStrategyId(id);
    if (isMobile) {
      setIsSidebarOpen(false); // Auto close on mobile selection
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden relative">
      
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:relative z-50 h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0 w-80 shadow-2xl lg:shadow-none' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden'}
        `}
      >
        <div className="w-80 flex flex-col h-full bg-white"> {/* Inner container to maintain width during transition */}
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold shrink-0">₿</div>
                <h1 className="font-bold text-xl tracking-tight text-slate-800">Options Master</h1>
              </div>
              <p className="text-xs text-slate-500 ml-11">比特币期权策略全解</p>
            </div>
            {/* Close button for mobile */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
            {(Object.keys(strategiesByCategory) as StrategyCategory[]).map((category) => (
              <div key={category}>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2 sticky top-0 bg-white/95 backdrop-blur py-1 z-10">
                  {category}
                </h3>
                <div className="space-y-1">
                  {strategiesByCategory[category].map((strategy) => (
                    <button
                      key={strategy.id}
                      onClick={() => handleStrategySelect(strategy.id)}
                      className={`w-full text-left px-3 py-3 lg:py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedStrategyId === strategy.id
                          ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span>{strategy.name.split('(')[0]}</span>
                        <span className="text-xs opacity-70 font-normal truncate mt-0.5">
                          {strategy.name.match(/\((.*?)\)/)?.[1] || ''}
                        </span>
                      </div>
                    </button>
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
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/></svg>
              ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
              )}
           </button>
        </div>

        <StrategyDetail strategy={selectedStrategy} btcPrice={btcPrice} />
      </main>
    </div>
  );
};

export default App;