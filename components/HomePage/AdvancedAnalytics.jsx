import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  FaChartLine, 
  FaUsers, 
  FaCoins, 
  FaFire, 
  FaLock,
  FaWallet,
  FaExchangeAlt,
  FaBolt,
  FaGlobe,
  FaShieldAlt,
  FaRocket,
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import { 
  HiOutlineSparkles,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineTrendingUp,
  HiOutlineTrendingDown
} from "react-icons/hi";
import { BsGraphUpArrow, BsLightning, BsPeople } from "react-icons/bs";

const AdvancedAnalytics = ({ isDarkMode, contractInfo, tokenBalance }) => {
  // State management
  const [activeChart, setActiveChart] = useState('price');
  const [timeframe, setTimeframe] = useState('24h');
  const [isLive, setIsLive] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [isVisible, setIsVisible] = useState({});
  const [counters, setCounters] = useState({});
  // Remove particles state as it was causing infinite loops
  // const [particles, setParticles] = useState([]);
  
  // Refs for animations
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const observerRef = useRef(null);
  const animationRef = useRef(null);
  const intervalRef = useRef(null);

  // Environment variables
  const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "Default Token";
  const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL || "DTK";
  const PER_TOKEN_USD_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE || "0.01";

  // Theme variables
  const bgColor = isDarkMode ? "bg-[#0E0B12]" : "bg-[#F5F7FA]";
  const cardBg = isDarkMode ? "bg-[#13101A]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const secondaryTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderColor = isDarkMode ? "border-gray-800/30" : "border-gray-200/50";
  const glowColor = isDarkMode ? "shadow-fuchsia-500/20" : "shadow-fuchsia-500/10";

  // Generate deterministic mock data to avoid hydration mismatch
  const generateMockData = useMemo(() => {
    return (type, points = 50) => {
      const data = [];
      let baseValue = type === 'price' ? parseFloat(PER_TOKEN_USD_PRICE) : 1000;
      
      for (let i = 0; i < points; i++) {
        const timestamp = Date.now() - (points - i) * 60000;
        // Use deterministic values based on index to avoid hydration mismatch
        const seed = (i * 1234567) % 1000000;
        const volatility = type === 'price' ? 0.1 : 0.05;
        const change = ((seed / 500000) - 1) * volatility;
        baseValue = Math.max(0, baseValue * (1 + change));
        
        data.push({
          timestamp,
          value: baseValue,
          volume: (seed % 1000000),
          change: change * 100
        });
      }
      return data;
    };
  }, [PER_TOKEN_USD_PRICE]);

  // Real-time metrics data - memoized to prevent hydration issues
  const realTimeMetrics = useMemo(() => [
    {
      id: 'totalSupply',
      label: 'Total Supply',
      value: '1,000,000',
      change: '+0.00%',
      trend: 'neutral',
      icon: <FaCoins className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      description: `Total ${TOKEN_SYMBOL} tokens in circulation`,
      chart: generateMockData('supply', 30)
    },
    {
      id: 'currentPrice',
      label: 'Current Price',
      value: `${PER_TOKEN_USD_PRICE}`,
      change: '+12.5%',
      trend: 'up',
      icon: <HiOutlineCurrencyDollar className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      description: 'Live token price with 24h change',
      chart: generateMockData('price', 30)
    },
    {
      id: 'marketCap',
      label: 'Market Cap',
      value: '$2.5M',
      change: '+8.7%',
      trend: 'up',
      icon: <FaChartLine className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      description: 'Total market capitalization',
      chart: generateMockData('market', 30)
    },
    {
      id: 'totalHolders',
      label: 'Total Holders',
      value: '15,847',
      change: '+156',
      trend: 'up',
      icon: <FaUsers className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      description: 'Unique wallet addresses holding tokens',
      chart: generateMockData('holders', 30)
    },
    {
      id: 'tradingVolume',
      label: '24h Volume',
      value: '$567K',
      change: '-2.3%',
      trend: 'down',
      icon: <FaExchangeAlt className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500',
      description: '24-hour trading volume',
      chart: generateMockData('volume', 30)
    },
    {
      id: 'burnedTokens',
      label: 'Tokens Burned',
      value: '25,000',
      change: '+500',
      trend: 'up',
      icon: <FaFire className="w-6 h-6" />,
      color: 'from-red-500 to-orange-500',
      description: 'Total tokens permanently removed',
      chart: generateMockData('burned', 30)
    },
    {
      id: 'stakedTokens',
      label: 'Staked Tokens',
      value: '340K',
      change: '+2.1%',
      trend: 'up',
      icon: <FaLock className="w-6 h-6" />,
      color: 'from-teal-500 to-green-500',
      description: 'Tokens locked in staking contracts',
      chart: generateMockData('staked', 30)
    },
    {
      id: 'transactions',
      label: '24h Transactions',
      value: '2,847',
      change: '+15.2%',
      trend: 'up',
      icon: <BsLightning className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      description: 'Total transactions in last 24 hours',
      chart: generateMockData('transactions', 30)
    }
  ], [TOKEN_SYMBOL, PER_TOKEN_USD_PRICE, generateMockData]);

  // Advanced features data
  const advancedFeatures = [
    {
      title: "AI-Powered Analytics",
      description: "Machine learning algorithms analyze market trends and predict optimal trading opportunities.",
      icon: <HiOutlineSparkles className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-500",
      progress: 85,
      status: "active"
    },
    {
      title: "Cross-Chain Bridge",
      description: "Seamlessly transfer tokens across multiple blockchain networks with minimal fees.",
      icon: <FaGlobe className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
      progress: 67,
      status: "developing"
    },
    {
      title: "Quantum Security",
      description: "Next-generation encryption ensuring your assets remain secure against future threats.",
      icon: <FaShieldAlt className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      progress: 92,
      status: "active"
    },
    {
      title: "Lightning Network",
      description: "Ultra-fast micropayments with sub-second confirmation times and near-zero fees.",
      icon: <FaBolt className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-500",
      progress: 78,
      status: "beta"
    }
  ];

  // Counter animation function
  const animateCounter = (targetValue, duration = 2000) => {
    const startValue = 0;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;
    
    const counter = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(counter);
      }
      setCounters(prev => ({ ...prev, [targetValue]: Math.floor(currentValue) }));
    }, 16);
  };

  // Intersection Observer setup
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
          
          if (entry.isIntersecting && entry.target.dataset.counter) {
            const targetValue = parseInt(entry.target.dataset.counter);
            animateCounter(targetValue);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  // Auto-rotate metrics
  useEffect(() => {
    if (isLive) {
      intervalRef.current = setInterval(() => {
        setCurrentMetric(prev => (prev + 1) % realTimeMetrics.length);
      }, 3000 / animationSpeed);
    }
    return () => clearInterval(intervalRef.current);
  }, [isLive, animationSpeed, realTimeMetrics.length]);

  // Canvas particle animation - fixed to prevent infinite loops
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particleCount = 50; // Reduced for better performance

    let animationFrameId;
    let currentParticles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles only once
    const initParticles = () => {
      currentParticles = [];
      for (let i = 0; i < particleCount; i++) {
        currentParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() * 60 + 280, // Purple to pink range
        });
      }
    };

    initParticles();

    const animate = () => {
      if (!canvas.width || !canvas.height) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      currentParticles.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX * animationSpeed;
        particle.y += particle.speedY * animationSpeed;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
        ctx.fill();

        // Draw connections (limited for performance)
        if (index < 20) { // Only connect first 20 particles
          currentParticles.slice(index + 1, index + 5).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${(1 - distance / 80) * 0.1})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [animationSpeed]); // Only depend on animationSpeed

  // Mini chart component
  const MiniChart = ({ data, color, height = 60 }) => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 200;
      const y = height - ((item.value - Math.min(...data.map(d => d.value))) / 
        (Math.max(...data.map(d => d.value)) - Math.min(...data.map(d => d.value)))) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width="200" height={height} className="absolute bottom-0 right-0 opacity-30">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDarkMode ? "#BD26D3" : "#7C3AED"} />
            <stop offset="100%" stopColor={isDarkMode ? "#9333EA" : "#EC4899"} />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke={`url(#gradient-${color})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <HiOutlineTrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <HiOutlineTrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 rounded-full bg-gray-500"></div>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-500/20';
      case 'developing': return 'text-yellow-500 bg-yellow-500/20';
      case 'beta': return 'text-blue-500 bg-blue-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  return (
    <div className={`${bgColor} relative overflow-hidden py-20`}>
      {/* Background Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ zIndex: 1 }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-20 left-10 w-72 h-72 ${
          isDarkMode ? 'bg-fuchsia-500/10' : 'bg-fuchsia-500/5'
        } rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-20 right-10 w-72 h-72 ${
          isDarkMode ? 'bg-purple-600/10' : 'bg-purple-600/5'
        } rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div 
          id="analytics-header" 
          className={`text-center mb-16 animate-on-scroll transition-all duration-1000 ${
            isVisible['analytics-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block p-2 px-4 rounded-full bg-gradient-to-r from-fuchsia-500/10 to-purple-600/10 mb-6">
            <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">
              Real-Time Analytics
            </p>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-6`}>
            Advanced <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">Insights</span>
          </h2>
          <p className={`${secondaryTextColor} text-lg max-w-3xl mx-auto mb-8`}>
            Monitor real-time metrics, analyze market trends, and discover advanced features 
            powered by cutting-edge blockchain technology.
          </p>
          
          {/* Control Panel */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                isLive 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                  : isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'
              } transition-all duration-300 hover:scale-105`}
            >
              {isLive ? <FaPause className="w-4 h-4 mr-2" /> : <FaPlay className="w-4 h-4 mr-2" />}
              {isLive ? 'Live' : 'Paused'}
            </button>
            
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${secondaryTextColor}`}>Speed:</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className={`text-sm ${textColor} font-medium`}>{animationSpeed}x</span>
            </div>

            <div className="flex rounded-lg overflow-hidden border border-gray-300">
              {['24h', '7d', '30d', '1y'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    timeframe === period
                      ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white'
                      : isDarkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-Time Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {realTimeMetrics.map((metric, index) => (
            <div
              key={metric.id}
              id={`metric-${index}`}
              data-counter="1000"
              className={`animate-on-scroll transition-all duration-1000 delay-${index * 100} ${
                isVisible[`metric-${index}`] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
              }`}
            >
              <div className={`${cardBg} p-6 rounded-2xl border ${borderColor} hover:shadow-2xl ${glowColor} transition-all duration-500 hover:scale-105 group relative overflow-hidden cursor-pointer`}
                   onClick={() => setExpandedCard(expandedCard === metric.id ? null : metric.id)}>
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Mini Chart Background */}
                <MiniChart data={metric.chart} color={metric.color} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`text-transparent bg-clip-text bg-gradient-to-r ${metric.color}`}>
                        {metric.icon}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-500' : 
                        metric.trend === 'down' ? 'text-red-500' : 
                        secondaryTextColor
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className={`text-sm font-medium ${secondaryTextColor} mb-2`}>
                    {metric.label}
                  </h3>
                  
                  <div className={`text-3xl font-bold ${textColor} mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${metric.color} transition-all duration-300`}>
                    {metric.value}
                  </div>
                  
                  {/* Expandable Description */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    expandedCard === metric.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className={`${secondaryTextColor} text-sm leading-relaxed pt-2 border-t ${borderColor}`}>
                      {metric.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Metric Highlight */}
        <div 
          id="featured-metric"
          className={`animate-on-scroll transition-all duration-1000 ${
            isVisible['featured-metric'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className={`${cardBg} p-8 rounded-3xl border ${borderColor} mb-16 relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 to-purple-600/5"></div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 mb-6 animate-pulse">
                {realTimeMetrics[currentMetric]?.icon}
              </div>
              <h3 className={`text-2xl font-bold ${textColor} mb-2`}>
                {realTimeMetrics[currentMetric]?.label}
              </h3>
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600 mb-4">
                {realTimeMetrics[currentMetric]?.value}
              </div>
              <p className={`${secondaryTextColor} text-lg max-w-2xl mx-auto`}>
                {realTimeMetrics[currentMetric]?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div 
          id="advanced-features"
          className={`animate-on-scroll transition-all duration-1000 ${
            isVisible['advanced-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-4xl font-bold ${textColor} mb-6`}>
              Advanced <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">Features</span>
            </h3>
            <p className={`${secondaryTextColor} text-lg max-w-3xl mx-auto`}>
              Cutting-edge technology features that set {TOKEN_NAME} apart from traditional cryptocurrencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => (
              <div
                key={index}
                className={`${cardBg} p-8 rounded-2xl border ${borderColor} hover:shadow-2xl transition-all duration-500 hover:scale-105 group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`}>
                        {feature.icon}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                      {feature.status.charAt(0).toUpperCase() + feature.status.slice(1)}
                    </div>
                  </div>
                  
                  <h4 className={`text-xl font-bold ${textColor} mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${feature.color} transition-all duration-300`}>
                    {feature.title}
                  </h4>
                  
                  <p className={`${secondaryTextColor} leading-relaxed mb-6`}>
                    {feature.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${secondaryTextColor}`}>Development Progress</span>
                      <span className={`text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}>
                        {feature.progress}%
                      </span>
                    </div>
                    <div className={`w-full h-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <div 
                        className={`h-full bg-gradient-to-r ${feature.color} rounded-full transition-all duration-1000 ease-out relative`}
                        style={{ width: isVisible['advanced-features'] ? `${feature.progress}%` : '0%' }}
                      >
                        <div className="absolute inset-0 bg-white/20 shimmer-effect"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .shimmer-effect {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>
    </div>
  );
};

export default AdvancedAnalytics;