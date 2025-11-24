import { Strategy, StrategyCategory } from './types';

export const DEFAULT_BTC_PRICE = 100000;

export const STRATEGIES: Strategy[] = [
  // ==========================================
  // BULLISH STRATEGIES
  // ==========================================
  {
    id: 'long-call',
    name: '买入看涨期权 (Long Call)',
    category: StrategyCategory.BULLISH,
    description: '最基础的看涨策略。支付权利金，获得未来低价买入的权利。',
    setup: '买入 Call',
    riskProfile: '风险有限 (权利金)，收益无限。',
    idealScenario: 'BTC价格大幅上涨。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.03 }
    ],
    detailedAnalysis: {
      explanation: '最纯粹的做多策略。你支付一笔权利金（Premium），锁定一个未来的买入价（Strike）。如果到期时BTC价格高于行权价，你的期权就具有内在价值。因为期权具有杠杆效应，BTC上涨10%，期权可能上涨100%甚至更多。',
      pros: [
        '收益无限：理论上上行空间没有封顶。',
        '风险锁定：最多亏损投入的权利金，绝不会爆仓。',
        '资金利用率高：用少量资金控制大额BTC名义价值。'
      ],
      cons: [
        '时间损耗 (Theta)：期权每天贬值，如果BTC不涨或涨得慢，你也会亏钱。',
        '对方向要求高：不仅要看对方向，还要在到期日前涨得足够多。'
      ]
    }
  },
  {
    id: 'bull-call-spread',
    name: '牛市看涨价差 (Bull Call Spread)',
    category: StrategyCategory.BULLISH,
    description: '买入低价Call，卖出高价Call。牺牲潜在暴利换取更低成本。',
    setup: '买入 Call A + 卖出 Call B (Strike B > A)',
    riskProfile: '风险有限 (净权利金)，收益有限 (价差 - 成本)。',
    idealScenario: 'BTC温和上涨。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
      { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: '当你觉得BTC会涨，但认为它不会涨上天（比如不会超过11万）时使用。你买入平值Call的同时，卖出一个虚值Call。卖出的收入降低了你的总成本，也降低了盈亏平衡点。这是一种非常稳健的看涨策略。',
      pros: [
        '成本低：比直接买Call便宜。',
        '抗波动：受隐含波动率下降（Vega Crush）的影响较小。',
        '胜率提升：因为成本低，盈亏平衡点更低。'
      ],
      cons: [
        '收益封顶：如果BTC暴涨，超过高行权价的部分与你无关。',
        '交易成本：涉及两笔交易，手续费略高。'
      ]
    }
  },
  {
    id: 'bull-put-spread',
    name: '牛市看跌价差 (Bull Put Spread)',
    category: StrategyCategory.BULLISH,
    description: '卖出高价Put，买入低价Put保护。一种“收租”式的看涨策略。',
    setup: '卖出 Put A + 买入 Put B (Strike A > B)',
    riskProfile: '风险有限 (价差 - 权利金)，收益有限 (净权利金)。',
    idealScenario: 'BTC上涨或横盘 (不跌破卖出价)。',
    legs: [
      { type: 'Put', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.03 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.85, premiumRatio: 0.01 }
    ],
    detailedAnalysis: {
      explanation: '这是一个“信用价差”策略（Net Credit）。你主要是想卖Put赚钱，但又怕BTC暴跌导致巨大亏损，所以买了一个更低价格的Put作为保险。只要BTC不跌破你卖出的行权价，你就白赚差价。',
      pros: [
        '胜率高：只要BTC不暴跌就能赚钱（横盘、微跌也赚）。',
        '风险明确：即便市场崩盘，你的最大亏损也被买入的Put锁定了。',
        '时间是朋友：每天时间流逝都在帮你赚钱。'
      ],
      cons: [
        '盈亏比通常一般：最大亏损可能大于最大盈利，需要高胜率维持。',
        '大涨与你无关：只能赚取固定的权利金。'
      ]
    }
  },
  {
    id: 'synthetic-long',
    name: '合成多头 (Synthetic Long / Risk Reversal)',
    category: StrategyCategory.BULLISH,
    description: '买入Call + 卖出Put。模拟持有现货的损益曲线。',
    setup: '买入 ATM Call + 卖出 ATM Put',
    riskProfile: '风险收益几乎等同于持有1个BTC。',
    idealScenario: '看涨，且想用极低资金建立全额仓位。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
      { type: 'Put', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.05 }
    ],
    detailedAnalysis: {
      explanation: '通过期权组合完美复制现货的走势。买Call让你拥有上涨收益，卖Put让你承担下跌亏损，两者结合，你的P&L曲线就变成了一条直线，和持有BTC现货几乎一模一样。通常用于资金利用率优化，因为这不需要全额资金买币。',
      pros: [
        '极高杠杆：几乎不需要即时资金（除了保证金）就能获得1 BTC的敞口。',
        '无时间损耗：Call和Put的Theta相互抵消。'
      ],
      cons: [
        '风险巨大：下跌亏损和持有现货一样实打实，若暴跌需要追加保证金。',
        '爆仓风险：如果不控制杠杆率，极易爆仓。'
      ]
    }
  },
  {
    id: 'call-ratio-backspread',
    name: '看涨比例反向价差 (Call Ratio Backspread)',
    category: StrategyCategory.BULLISH,
    description: '卖出1份低价Call，买入2份高价Call。',
    setup: '卖出 1x ITM Call + 买入 2x OTM Call',
    riskProfile: '下行风险有限，上行收益无限且加倍。',
    idealScenario: '极度看涨，认为会有史诗级暴涨。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.06 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.025 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.025 }
    ],
    detailedAnalysis: {
      explanation: '当你非常确信会有一波大暴涨时使用。你卖出一个贵的期权，用这笔钱买入两个便宜的期权。如果价格微涨，你可能会亏损（因为卖出的那个亏钱，买的那两个还没赚）；但如果价格暴涨，那两个买入的Call会带来双倍快乐。',
      pros: [
        '可能零成本甚至有净收入：如果构建得当。',
        '暴涨收益极高：持有双倍的多头头寸。',
        '如果反而暴跌：你甚至可能赚点小钱（如果构建时是Net Credit）。'
      ],
      cons: [
        '死谷风险：如果BTC恰好停在两个行权价之间，你会面临最大亏损。',
        '复杂性高：需要精确计算比例。'
      ]
    }
  },
  {
    id: 'strap',
    name: '多头条式组合 (Strap)',
    category: StrategyCategory.BULLISH,
    description: '买入1份Put，买入2份Call。看多波动率但更看涨。',
    setup: '买入 1x Put + 买入 2x Call (同Strike)',
    riskProfile: '风险有限，收益无限 (上涨赚双倍)。',
    idealScenario: '变盘在即，且向上突破概率大。',
    legs: [
      { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 }
    ],
    detailedAnalysis: {
      explanation: '这是跨式策略（Straddle）的变体。你买入跨式（同时买涨买跌），但你加倍了买涨的份数。这意味着你认为会有大波动，且更大概率是暴涨。如果暴跌，靠Put也能回本；如果暴涨，双倍Call让你赚翻。',
      pros: [
        '方向性与波动率结合：既赌波动，又赌方向。',
        '上行爆发力强。'
      ],
      cons: [
        '成本极高：要买3张期权，权利金支出巨大。',
        '如果横盘：会死得很惨，三张期权的时间价值一起归零。'
      ]
    }
  },
  {
    id: 'cash-secured-put',
    name: '备兑看跌/现金担保卖普 (Cash Secured Put)',
    category: StrategyCategory.BULLISH,
    description: '卖出Put并持有现金。意在低价接盘或赚权利金。',
    setup: '卖出 Put',
    riskProfile: '风险较大 (接盘后继续跌)，收益固定。',
    idealScenario: '横盘或微涨，愿意低位买币。',
    legs: [
      { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.025 }
    ],
    detailedAnalysis: {
      explanation: '巴菲特最爱策略。你准备好钱想在9万买币，现在价格10万。你与其挂单傻等，不如卖出一张9万的Put。如果跌到9万，你如愿买入（成本还是9万减权利金）；如果没跌到，你白赚权利金。',
      pros: [
        '比挂单买入更优：降低实际买入成本。',
        '高胜率：牛市中极佳的现金流策略。'
      ],
      cons: [
        '踏空风险：如果BTC直接飞了，你只赚了点小钱。',
        '接飞刀：如果BTC直接崩到5万，你必须按9万接盘。'
      ]
    }
  },

  // ==========================================
  // BEARISH STRATEGIES
  // ==========================================
  {
    id: 'long-put',
    name: '买入看跌期权 (Long Put)',
    category: StrategyCategory.BEARISH,
    description: '基础做空策略。支付权利金，获得高价卖出的权利。',
    setup: '买入 Put',
    riskProfile: '风险有限，收益巨大 (直到归零)。',
    idealScenario: 'BTC大幅下跌。',
    legs: [
      { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.03 }
    ],
    detailedAnalysis: {
      explanation: '当你认为币价会崩盘时买入。与做空合约不同，买Put不需要保证金，不会爆仓。如果价格归零，你的收益最大化。',
      pros: [
        '不会爆仓：最大损失已锁定。',
        '以小博大：利用杠杆做空。'
      ],
      cons: [
        '时间损耗：如果不跌或跌得慢，期权价值会归零。',
        '胜率低：长期来看市场倾向于上涨。'
      ]
    }
  },
  {
    id: 'bear-put-spread',
    name: '熊市看跌价差 (Bear Put Spread)',
    category: StrategyCategory.BEARISH,
    description: '买入高价Put，卖出低价Put。降低做空成本。',
    setup: '买入 Put A + 卖出 Put B (Strike A > B)',
    riskProfile: '风险有限，收益有限。',
    idealScenario: 'BTC温和下跌。',
    legs: [
      { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
      { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: '你觉得会跌，但不会跌穿地心。买入Put的同时卖出一个更低价的Put。卖出的Put不仅降低了成本，也止盈了你的策略——如果跌破低行权价，你的收益不再增加。',
      pros: [
        '成本可控：比单纯买Put便宜。',
        '明确的目标价：适合有具体目标点位的做空。'
      ],
      cons: [
        '收益封顶：如果真的发生黑天鹅（如FTX暴雷），你错过了后续的大部分利润。'
      ]
    }
  },
  {
    id: 'bear-call-spread',
    name: '熊市看涨价差 (Bear Call Spread)',
    category: StrategyCategory.BEARISH,
    description: '卖出低价Call，买入高价Call保护。做空赚取权利金。',
    setup: '卖出 Call A + 买入 Call B (Strike A < B)',
    riskProfile: '风险有限，收益有限 (净权利金)。',
    idealScenario: 'BTC下跌或横盘 (不涨破卖出价)。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.03 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.15, premiumRatio: 0.01 }
    ],
    detailedAnalysis: {
      explanation: '这是一个“信用价差”策略。你认为价格不会涨过某个点（阻力位）。于是你卖出该位置的Call，并买入更高位的Call防止暴涨打爆你。只要价格不涨破阻力位，权利金全收。',
      pros: [
        '高胜率：只要不涨就能赚钱。',
        '风险锁定：即便暴涨，买入的Call会保护你。'
      ],
      cons: [
        '盈亏比差：通常是“赚小钱，亏大钱”（虽然亏损有限，但绝对值可能高于盈利）。'
      ]
    }
  },
  {
    id: 'put-ratio-backspread',
    name: '看跌比例反向价差 (Put Ratio Backspread)',
    category: StrategyCategory.BEARISH,
    description: '卖出1份高价Put，买入2份低价Put。',
    setup: '卖出 1x ITM Put + 买入 2x OTM Put',
    riskProfile: '上行风险有限，下行收益巨大。',
    idealScenario: '极度看跌，防范崩盘。',
    legs: [
      { type: 'Put', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.06 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.025 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.025 }
    ],
    detailedAnalysis: {
      explanation: '看涨比例价差的镜像版。卖出一张贵的Put，买入两张便宜的Put。如果价格微跌，可能亏损；但如果价格崩盘，双倍的Put让你收益翻倍。',
      pros: [
        '做空黑天鹅的利器。',
        '如果反而大涨：可能还有小赚（如果是Net Credit构建）。'
      ],
      cons: [
        '如果价格停在两个行权价之间，会遭受最大损失。'
      ]
    }
  },
  {
    id: 'strip',
    name: '空头条式组合 (Strip)',
    category: StrategyCategory.BEARISH,
    description: '买入1份Call，买入2份Put。看多波动率但更看跌。',
    setup: '买入 1x Call + 买入 2x Put (同Strike)',
    riskProfile: '风险有限，收益无限 (下跌赚双倍)。',
    idealScenario: '变盘在即，且向下破位概率大。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 },
      { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 },
      { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.04 }
    ],
    detailedAnalysis: {
      explanation: '跨式策略的看跌加强版。你认为市场要大变盘，且大概率是暴跌。买入两份Put和一份Call。',
      pros: [
        '暴跌时收益极高。',
        '如果判断错误反而暴涨，Call也能挽回部分损失甚至盈利。'
      ],
      cons: [
        '成本极高：三份权利金。',
        '横盘必死。'
      ]
    }
  },
  {
    id: 'naked-call',
    name: '裸卖看涨 (Naked Call)',
    category: StrategyCategory.BEARISH,
    description: '直接卖出Call。风险极高。',
    setup: '卖出 Call',
    riskProfile: '收益有限，风险无限。',
    idealScenario: '坚决看跌或横盘。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: '没有现货保护直接卖Call。这是机构或高净值玩家的赌博。如果BTC涨破行权价，你需要去市场高价买币赔给对手，理论上BTC可以涨到无限高，你的亏损也就是无限大。',
      pros: [
        '胜率高：大概率赚权利金。'
      ],
      cons: [
        '毁灭性风险：一次暴涨可能导致破产。',
        '资金占用大：交易所要求巨额保证金。'
      ]
    }
  },

  // ==========================================
  // NEUTRAL STRATEGIES
  // ==========================================
  {
    id: 'short-straddle',
    name: '卖出跨式 (Short Straddle)',
    category: StrategyCategory.NEUTRAL,
    description: '卖出ATM Call和Put。做空波动率，赌价格不动。',
    setup: '卖出 ATM Call + 卖出 ATM Put',
    riskProfile: '收益巨大 (双份权利金)，风险无限。',
    idealScenario: 'BTC价格死死钉在行权价。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.05 },
      { type: 'Put', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.05 }
    ],
    detailedAnalysis: {
      explanation: '最激进的做空波动率策略。你认为市场彻底死寂。同时卖出平值Call和Put，收取最肥厚的权利金。只要价格不偏离太远，你就是赢家。',
      pros: [
        '权利金收入最高：ATM期权时间价值最大。',
        '时间衰减极快。'
      ],
      cons: [
        '一旦出方向（大涨或大跌），亏损无限且迅速。',
        '管理难度极大。'
      ]
    }
  },
  {
    id: 'short-strangle',
    name: '卖出宽跨式 (Short Strangle)',
    category: StrategyCategory.NEUTRAL,
    description: '卖出OTM Call和Put。比跨式安全一点，容错空间更大。',
    setup: '卖出 OTM Call + 卖出 OTM Put',
    riskProfile: '收益有限，风险无限。',
    idealScenario: 'BTC在一定区间内震荡。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 },
      { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: '相比卖跨式，你把卖出的行权价拉得更开（虚值）。这样收到的权利金变少了，但是你可以容忍BTC有一定幅度的波动。只要BTC不涨破上面、不跌破下面，你都赚钱。',
      pros: [
        '胜率比卖跨式更高：获利区间更宽。',
        '容错率尚可。'
      ],
      cons: [
        '黑天鹅依然致命：如果突破区间，风险依然是无限的。'
      ]
    }
  },
  {
    id: 'iron-condor',
    name: '铁鹰式 (Iron Condor)',
    category: StrategyCategory.NEUTRAL,
    description: '卖出宽跨式 + 买入更远期权做保护。最受欢迎的震荡策略。',
    setup: '卖出 OTM Call/Put + 买入 深OTM Call/Put',
    riskProfile: '风险有限，收益有限。',
    idealScenario: 'BTC在宽幅区间内震荡。',
    legs: [
      { type: 'Put', action: 'Sell', strikeOffset: 0.90, premiumRatio: 0.02 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.85, premiumRatio: 0.01 },
      { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.15, premiumRatio: 0.01 }
    ],
    detailedAnalysis: {
      explanation: '这是卖出宽跨式（Short Strangle）的“带套版”。为了防止黑天鹅导致无限亏损，你在两边更远的地方各买一个期权作为保险。这样你的最大亏损被锁定了，睡得着觉。',
      pros: [
        '风险严格受控：最稳健的中性策略。',
        '不需要预测方向。'
      ],
      cons: [
        '收益减少：买保险花掉了一部分权利金。',
        '四条腿交易成本高。'
      ]
    }
  },
  {
    id: 'iron-butterfly',
    name: '铁蝶式 (Iron Butterfly)',
    category: StrategyCategory.NEUTRAL,
    description: '卖出跨式 + 买入保护。追求最大化权利金的有限风险策略。',
    setup: '卖出 ATM Call/Put + 买入 OTM Call/Put',
    riskProfile: '风险有限，收益较高 (相对铁鹰)。',
    idealScenario: 'BTC精准停留在现价。',
    legs: [
      { type: 'Put', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.04 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.90, premiumRatio: 0.01 },
      { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.04 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.10, premiumRatio: 0.01 }
    ],
    detailedAnalysis: {
      explanation: '这是卖出跨式（Short Straddle）的“带套版”。你卖出平值期权收最多的钱，然后在两边买保险。相比铁鹰，它的获利区间更窄，但潜在最大收益更高。',
      pros: [
        '高收益潜力：由于卖出的是ATM，权利金丰厚。',
        '风险受控。'
      ],
      cons: [
        '获利难度大：价格稍微一动，利润回撤很快。'
      ]
    }
  },
  {
    id: 'long-call-butterfly',
    name: '买入看涨蝶式 (Long Call Butterfly)',
    category: StrategyCategory.NEUTRAL,
    description: '利用三个行权价构建“利润尖塔”。低成本博取精准点位。',
    setup: '买入 1x 低Call + 卖出 2x 中Call + 买入 1x 高Call',
    riskProfile: '风险极低，收益有限但倍率高。',
    idealScenario: 'BTC到期时精准停在中间行权价。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.06 },
      { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.035 }, // Sell 2x
      { type: 'Call', action: 'Sell', strikeOffset: 1.00, premiumRatio: 0.035 },
      { type: 'Call', action: 'Buy', strikeOffset: 1.05, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: '非常便宜的策略。你支付很少的钱构建一个组合。如果到期时价格正好停在中间卖出的行权价上，你会获得几十倍的收益。这通常用于押注价格会回归均值或停留在某个整数关口（Max Pain）。',
      pros: [
        '成本极低：通常只需要支付一点点权利金。',
        '盈亏比极高：投入1块钱可能赚10块钱。'
      ],
      cons: [
        '中奖率低：需要价格非常精准地落在目标位。',
        '如果在区间外：也就是稍微涨多点或跌多点，就会亏损全部本金（虽然本金很少）。'
      ]
    }
  },
  {
    id: 'short-guts',
    name: '卖出内陷宽跨式 (Short Guts)',
    category: StrategyCategory.NEUTRAL,
    description: '卖出ITM Call和ITM Put。极度激进的做空波动率。',
    setup: '卖出 ITM Call + 卖出 ITM Put',
    riskProfile: '收益巨大，风险无限。',
    idealScenario: 'BTC价格回归到两行权价中间。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 0.95, premiumRatio: 0.08 },
      { type: 'Put', action: 'Sell', strikeOffset: 1.05, premiumRatio: 0.08 }
    ],
    detailedAnalysis: {
      explanation: '这比卖跨式更疯狂。你卖出的都是实值（ITM）期权，权利金极其昂贵。这通常用于你认为目前的价格不仅会横盘，而且会收敛到中间值。',
      pros: [
        '巨额权利金：比任何策略收到的钱都多。'
      ],
      cons: [
        '流动性差：深实值期权通常点差大。',
        '极度危险：任何大幅波动都会造成巨亏。'
      ]
    }
  },

  // ==========================================
  // VOLATILITY STRATEGIES
  // ==========================================
  {
    id: 'long-straddle',
    name: '买入跨式 (Long Straddle)',
    category: StrategyCategory.VOLATILITY,
    description: '买入ATM Call和Put。赌大变盘，方向不限。',
    setup: '买入 Call + 买入 Put (同Strike)',
    riskProfile: '风险有限 (权利金)，收益无限。',
    idealScenario: 'BTC发生剧烈暴涨或暴跌。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 },
      { type: 'Put', action: 'Buy', strikeOffset: 1.00, premiumRatio: 0.05 }
    ],
    detailedAnalysis: {
      explanation: '经典做多波动率策略。ETF通过前夕、减半前后常用。你双边下注，只要波动大到能覆盖两边的权利金，你就赚了。',
      pros: [
        '不用猜方向。',
        '如果出现单边大行情，收益无限。'
      ],
      cons: [
        '成本贵：双份ATM权利金很贵。',
        'Theta损耗：每天都在双倍失血，如果行情磨叽，心态容易崩。'
      ]
    }
  },
  {
    id: 'long-strangle',
    name: '买入宽跨式 (Long Strangle)',
    category: StrategyCategory.VOLATILITY,
    description: '买入OTM Call和Put。成本低，但需要更大波动。',
    setup: '买入 OTM Call + 买入 OTM Put',
    riskProfile: '风险有限，收益无限。',
    idealScenario: 'BTC发生超大幅度波动。',
    legs: [
      { type: 'Call', action: 'Buy', strikeOffset: 1.10, premiumRatio: 0.02 },
      { type: 'Put', action: 'Buy', strikeOffset: 0.90, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: '跨式的便宜版本。买虚值期权。因为便宜，所以你可以买更多份数，或者亏损更少。但也意味着盈亏平衡点更远，需要更大的事件驱动。',
      pros: [
        '低成本博黑天鹅。'
      ],
      cons: [
        '胜率极低：大部分时间虚值期权都会归零。'
      ]
    }
  },

  // ==========================================
  // INCOME / HEDGE STRATEGIES
  // ==========================================
  {
    id: 'covered-call',
    name: '备兑看涨 (Covered Call)',
    category: StrategyCategory.INCOME,
    description: '持币卖Call。币本位增强收益神器。',
    setup: '持有现货 + 卖出 Call',
    riskProfile: '下行风险同现货，上行收益封顶。',
    idealScenario: 'BTC慢牛或横盘。',
    legs: [
      { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.03 }
    ],
    detailedAnalysis: {
      explanation: '矿工和囤币党必备。你有BTC，顺便卖个Call赚利息。如果没涨到行权价，利息白赚；如果涨到了，就按行权价止盈卖币。',
      pros: [
        '增强收益：年化通常可达10%-30%。',
        '降低持仓成本。'
      ],
      cons: [
        '卖飞风险：大牛市中容易踏空主升浪。'
      ]
    }
  },
  {
    id: 'protective-put',
    name: '保护性看跌 (Protective Put)',
    category: StrategyCategory.INCOME,
    description: '持币买Put。给现货买保险。',
    setup: '持有现货 + 买入 Put',
    riskProfile: '最大亏损锁定，上行收益无限。',
    idealScenario: '看好长期但担心短期黑天鹅。',
    legs: [
       { type: 'Put', action: 'Buy', strikeOffset: 0.95, premiumRatio: 0.03 }
    ],
    detailedAnalysis: {
      explanation: '这就相当于给BTC买车险。无论市场怎么跌，你的资产价值底线是保住的。',
      pros: [
        '睡安稳觉：无惧任何利空。',
        '不限制上涨空间。'
      ],
      cons: [
        '持续成本：保险费也是一笔不小的开支，会拖累长期持有收益。'
      ]
    }
  },
  {
    id: 'collar',
    name: '领口策略 (Collar)',
    category: StrategyCategory.INCOME,
    description: '持币 + 买Put保险 + 卖Call回血。低成本对冲。',
    setup: '持有现货 + 买入 Put + 卖出 Call',
    riskProfile: '风险有限，收益有限。',
    idealScenario: '担心下跌，但觉得也不会大涨。',
    legs: [
      { type: 'Put', action: 'Buy', strikeOffset: 0.90, premiumRatio: 0.02 },
      { type: 'Call', action: 'Sell', strikeOffset: 1.10, premiumRatio: 0.02 }
    ],
    detailedAnalysis: {
      explanation: '这是保护性Put的进阶版。你觉得买Put保险太贵了，于是你同时卖出一个Call。用卖Call收到的钱去支付买Put的钱。通常可以做到“零成本对冲”。代价是你的上涨空间被Call封顶了，下跌风险被Put兜底了。你的资产波动被限制在一个“领口”内。',
      pros: [
        '低成本甚至零成本保险。',
        '极佳的资产保值方案。'
      ],
      cons: [
        '收益封顶：同样面临卖飞风险。'
      ]
    }
  }
];