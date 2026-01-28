/**
 * Shared constants and data structures used across the application
 */

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Demo', href: '/demo' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Market Insights', href: '/market-insights' },
  { name: 'About', href: '/about' },
] as const;

export const FOOTER_SECTIONS = [
  {
    title: 'Platform',
    links: [
      { label: 'Live Demo', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Download App', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Market Blog', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Trading Guide', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Risk Disclaimer', href: '#' },
    ],
  },
] as const;

export const HERO_STATS = [
  { value: 94, suffix: '%', label: 'Signal Accuracy' },
  { value: 24, suffix: 'M+', label: 'Volume Analyzed' },
  { value: 12, suffix: 'k+', label: 'Active Traders' },
  { value: '24/7', suffix: '', label: 'AI Monitoring' },
] as const;

export const TESTIMONIALS = [
  {
    quote: "Temto saved me from the last crash. The \"Sell\" signal fired 2 hours before the drop.",
    stat: "+18% portfolio growth in 3 months",
    name: "Alex M.",
    role: "Day Trader",
  },
  {
    quote: "I used to stare at charts for 10 hours. Now I just wait for the notification. Pure Freedom",
    stat: "+30% portfolio growth in 2 months",
    name: "Sarah K.",
    role: "Swing Trader",
  },
  {
    quote: "The accuracy on Altcoins is insane. The Navigator package pays for itself in one trade.",
    stat: "+45% portfolio growth in 1 month",
    name: "Davide R.",
    role: "Pro Subscriber",
  },
] as const;

export const FEATURES = [
  {
    title: "Zero Emotions, Pure Data",
    description: "Eliminate the panic selling and FOMO buying",
  },
  {
    title: "Always Awake",
    description: "Our AI scans thousands of market signals 24/7 while you sleep",
  },
  {
    title: "Be the First to Move",
    description: "Get instant alerts directly on your dashboard or via email the second the trend shifts.",
  },
] as const;

export const WHY_CHOOSE_FEATURES = [
  {
    title: "Built for volatile markets",
    text: "Designed specifically for fast-moving crypto conditions, not static indicators.",
  },
  {
    title: "AI trained on historical data",
    text: "Signals are generated using millions of past market scenarios.",
  },
  {
    title: "Reduce emotional trading",
    text: "Clear signals help remove fear, doubt, and impulsive decisions.",
  },
  {
    title: "Clarity over complexity",
    text: "No cluttered charts. Just actionable insights when they matter.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: "Step 1",
    title: "We Scan",
    text: "Millions of historical patterns and live price movements are analyzed per second.",
  },
  {
    step: "Step 2",
    title: "You Get Notified",
    text: 'A precise "Buy" or "Sell" signal drops into your feed, generated purely by momentum and probability.',
  },
  {
    step: "Step 3",
    title: "You Execute & Profit",
    text: "Make your move on your favorite exchange with the confidence of an institutional trader.",
  },
] as const;

export const FAQ_DATA = [
  {
    question: "Is my API Key safe?",
    answer: "Read the full analysis based on on-chain data and volume metrics.",
  },
  {
    question: "What is the historical win rate?",
    answer: "Our AI 'Navigator' model has maintained a 78-84% win rate over the last 18 months across major pairs.",
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can abandon ship at any time. Your access will remain until the end of the billing cycle.",
  },
  {
    question: "Do you support scalping?",
    answer: "Yes, the 'Captain' tier provides 15-minute timeframe signals specifically designed for scalpers.",
  },
] as const;

export const PRICING_PLANS = [
  {
    title: "The Scout",
    price: "$29",
    period: "/mo",
    description: "Perfect for beginners sticking to the major safe harbors.",
    features: [
      "BTC & ETH Signals Only",
      "Daily Trend Analysis",
      "Email Alerts",
      "Up to 20 signals per day",
    ],
    button: "Start Scouting",
    variant: "outline" as const,
  },
  {
    title: "The Navigator",
    price: "$79",
    period: "/mo",
    description: "For active traders ready to brave the altcoin waves.",
    features: [
      "Top 20 Altcoins",
      "Real-time 4H & 1H Signals",
      "Volatility Warnings",
      "Plus everything on \"The Scout\"",
    ],
    button: "Become a Navigator",
    variant: "primary" as const,
    popular: true,
  },
  {
    title: "The Captain",
    price: "$129",
    period: "/mo",
    description: "Full command of the market with institutional-grade data.",
    features: [
      "All Market Pairs",
      "15-Min Scalping Signals",
      "API Access",
      "Gem Finder (Low Cap)",
      "Plus everything on \"The Scout\"",
    ],
    button: "Take Command",
    variant: "muted" as const,
  },
] as const;

export const MARKET_ARTICLES = [
  {
    image: "/images/bitcoinImage.png",
    category: "MARKET TREND",
    categoryColor: "bg-[var(--category-red)] text-red-500",
    title: "Bitcoin tests critical support at 62k amidst macro fears",
    description: "Read the full analysis based on on-chain data and volume metrics.",
  },
  {
    image: "/images/solanaImage.png",
    category: "ALTCOIN ALERT",
    categoryColor: "bg-[var(--category-green)] text-green-500",
    title: "Solana activity surges 200%: is Alt season starting?",
    description: "Read the full analysis based on on-chain data and volume metrics.",
  },
  {
    image: "/images/goldenCrossImage.png",
    category: "EDUCATION",
    categoryColor: "bg-[var(--category-blue)] text-blue-500",
    title: "Understanding the \"Golden Cross\" strategy in volatile waters",
    description: "Read the full analysis based on on-chain data and volume metrics.",
  },
] as const;
