import React, { useState, useEffect, useRef } from "react";
import { 
  FaShieldAlt, 
  FaRocket, 
  FaUsers, 
  FaCode,
  FaChartLine,
  FaLock,
  FaGlobe,
  FaCoins,
  FaMedal,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaQuestionCircle,
  FaPlay,
  FaPause
} from "react-icons/fa";
import { 
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineShield,
  HiOutlineTrendingUp 
} from "react-icons/hi";
import { 
  BsGraphUp, 
  BsShield, 
  BsPeople,
  BsGear 
} from "react-icons/bs";

const MiddlePage = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Environment variables
  const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "Default Token";
  const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL || "DTK";
  const TOKEN_SUPPLY = process.env.NEXT_PUBLIC_TOKEN_SUPPLY || "1,000,000";
  const BLOCKCHAIN = process.env.NEXT_PUBLIC_BLOCKCHAIN || "Polygon";

  // Theme variables
  const bgColor = isDarkMode ? "bg-[#0E0B12]" : "bg-[#F5F7FA]";
  const cardBg = isDarkMode ? "bg-[#13101A]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const secondaryTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderColor = isDarkMode ? "border-gray-800/30" : "border-gray-200/50";
  const hoverBg = isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100";

  // Intersection Observer for animations
  const observerRef = useRef();
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observerRef.current?.observe(el));
  }, []);

  // Auto-slide for roadmap
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % roadmapData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Features data
  const features = [
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Military-Grade Security",
      description: "Multi-signature wallets and smart contract audits ensure your investments are protected by industry-leading security protocols.",
      color: "from-red-500 to-orange-500",
      stats: "99.9% Uptime"
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Lightning Fast Transactions",
      description: "Experience near-instant transactions with minimal gas fees on our optimized blockchain infrastructure.",
      color: "from-blue-500 to-cyan-500",
      stats: "<2s Average"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Community Governance",
      description: "Every token holder has a voice in shaping the future through our decentralized autonomous organization.",
      color: "from-green-500 to-teal-500",
      stats: "10K+ Members"
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Yield Generation",
      description: "Earn passive income through staking, liquidity mining, and our innovative reward mechanisms.",
      color: "from-purple-500 to-pink-500",
      stats: "Up to 15% APY"
    }
  ];

  // Tokenomics data
  const tokenomics = [
    { label: "Presale", percentage: 40, color: "from-fuchsia-500 to-purple-600", amount: "400,000" },
    { label: "Liquidity", percentage: 25, color: "from-blue-500 to-cyan-500", amount: "250,000" },
    { label: "Marketing", percentage: 15, color: "from-green-500 to-teal-500", amount: "150,000" },
    { label: "Development", percentage: 10, color: "from-orange-500 to-red-500", amount: "100,000" },
    { label: "Team", percentage: 5, color: "from-indigo-500 to-purple-500", amount: "50,000" },
    { label: "Advisors", percentage: 5, color: "from-pink-500 to-rose-500", amount: "50,000" }
  ];

  // Roadmap data
  const roadmapData = [
    {
      phase: "Phase 1",
      title: "Foundation & Launch",
      quarter: "Q1 2024",
      status: "completed",
      items: [
        "Smart Contract Development",
        "Security Audit Completion",
        "Presale Launch",
        "Community Building"
      ]
    },
    {
      phase: "Phase 2",
      title: "Market Expansion",
      quarter: "Q2 2024",
      status: "current",
      items: [
        "DEX Listings",
        "Partnership Agreements",
        "Mobile App Beta",
        "Staking Platform"
      ]
    },
    {
      phase: "Phase 3",
      title: "Ecosystem Growth",
      quarter: "Q3 2024",
      status: "upcoming",
      items: [
        "NFT Marketplace",
        "Cross-chain Bridge",
        "Governance Platform",
        "Major CEX Listings"
      ]
    },
    {
      phase: "Phase 4",
      title: "Global Adoption",
      quarter: "Q4 2024",
      status: "planned",
      items: [
        "Enterprise Solutions",
        "Global Partnerships",
        "Advanced DeFi Features",
        "Ecosystem Expansion"
      ]
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: "What is " + TOKEN_NAME + " token?",
      answer: TOKEN_NAME + " is a revolutionary cryptocurrency designed to power decentralized applications and provide sustainable yield generation opportunities for holders."
    },
    {
      question: "How can I buy " + TOKEN_SYMBOL + " tokens?",
      answer: "You can purchase " + TOKEN_SYMBOL + " tokens during our presale by connecting your wallet and selecting your preferred payment method (ETH, USDT, or BNB)."
    },
    {
      question: "What blockchain is " + TOKEN_NAME + " built on?",
      answer: TOKEN_NAME + " is built on " + BLOCKCHAIN + " blockchain, ensuring fast transactions, low fees, and high security standards."
    },
    {
      question: "Is there a minimum purchase amount?",
      answer: "Yes, the minimum purchase amount is $10 worth of tokens. There is no maximum limit, allowing both small and large investors to participate."
    },
    {
      question: "When will tokens be available for trading?",
      answer: "Tokens will be available for trading immediately after the presale ends and liquidity is added to major decentralized exchanges."
    },
    {
      question: "How is the project audited for security?",
      answer: "Our smart contracts have been audited by multiple reputable security firms including CertiK and Hacken to ensure maximum security for investors."
    }
  ];

  // Team data
  const teamMembers = [
    {
      name: "Alex Thompson",
      role: "CEO & Founder",
      image: "/team/ceo.jpg",
      bio: "Former blockchain architect at major fintech companies with 10+ years in cryptocurrency development.",
      social: { twitter: "#", linkedin: "#" }
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "/team/cto.jpg", 
      bio: "Smart contract expert and former security researcher specializing in DeFi protocols.",
      social: { twitter: "#", linkedin: "#" }
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Marketing",
      image: "/team/marketing.jpg",
      bio: "Growth strategist with successful track record in scaling blockchain projects to millions of users.",
      social: { twitter: "#", linkedin: "#" }
    },
    {
      name: "Emma Johnson",
      role: "Lead Developer",
      image: "/team/dev.jpg",
      bio: "Full-stack developer with expertise in blockchain integration and decentralized application development.",
      social: { twitter: "#", linkedin: "#" }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-500/20';
      case 'current': return 'text-blue-500 bg-blue-500/20';
      case 'upcoming': return 'text-yellow-500 bg-yellow-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  return (
    <div className={`${bgColor} relative overflow-hidden`}>
      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div 
            id="features-header" 
            className={`text-center mb-16 animate-on-scroll transition-all duration-1000 ${
              isVisible['features-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block p-2 px-4 rounded-full bg-gradient-to-r from-fuchsia-500/10 to-purple-600/10 mb-6">
              <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">
                Why Choose {TOKEN_NAME}
              </p>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-6`}>
              Built for the <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">Future</span>
            </h2>
            <p className={`${secondaryTextColor} text-lg max-w-3xl mx-auto`}>
              Experience next-generation cryptocurrency with cutting-edge technology, 
              unmatched security, and community-driven governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                id={`feature-${index}`}
                className={`animate-on-scroll transition-all duration-1000 delay-${index * 200} ${
                  isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className={`${cardBg} p-8 rounded-2xl border ${borderColor} hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className={`relative z-10`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} bg-opacity-20 text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className={`text-xl font-bold ${textColor} mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${feature.color}`}>
                      {feature.title}
                    </h3>
                    <p className={`${secondaryTextColor} mb-4 leading-relaxed`}>
                      {feature.description}
                    </p>
                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${feature.color} bg-opacity-20`}>
                      <span className={`text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r ${feature.color}`}>
                        {feature.stats}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 to-purple-600/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div 
            id="tokenomics-header"
            className={`text-center mb-16 animate-on-scroll transition-all duration-1000 ${
              isVisible['tokenomics-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-6`}>
              Token <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">Distribution</span>
            </h2>
            <p className={`${secondaryTextColor} text-lg max-w-3xl mx-auto`}>
              Transparent and strategic token allocation designed for sustainable growth and community benefit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Pie Chart Visual */}
            <div 
              id="tokenomics-chart"
              className={`animate-on-scroll transition-all duration-1000 delay-200 ${
                isVisible['tokenomics-chart'] ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-purple-600/20 animate-spin-slow"></div>
                <div className={`absolute inset-4 ${cardBg} rounded-full flex items-center justify-center shadow-2xl`}>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${textColor} mb-2`}>
                      {TOKEN_SUPPLY}
                    </div>
                    <div className={`${secondaryTextColor} text-sm`}>
                      Total Supply
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution List */}
            <div 
              id="tokenomics-list"
              className={`animate-on-scroll transition-all duration-1000 delay-400 ${
                isVisible['tokenomics-list'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="space-y-6">
                {tokenomics.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50/5 to-gray-100/5 hover:from-gray-50/10 hover:to-gray-100/10 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color}`}></div>
                      <div>
                        <div className={`font-semibold ${textColor}`}>{item.label}</div>
                        <div className={`text-sm ${secondaryTextColor}`}>{item.amount} {TOKEN_SYMBOL}</div>
                      </div>
                    </div>
                    <div className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                      {item.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div 
            id="roadmap-header"
            className={`text-center mb-16 animate-on-scroll transition-all duration-1000 ${
              isVisible['roadmap-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-6`}>
              Development <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">Roadmap</span>
            </h2>
            <p className={`${secondaryTextColor} text-lg max-w-3xl mx-auto mb-8`}>
              Our strategic roadmap outlines the journey from concept to global adoption.
            </p>
            
            {/* Playback Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:shadow-lg transition-all duration-300`}
              >
                {isPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
              </button>
              <div className="flex space-x-2">
                {roadmapData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600' 
                        : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {roadmapData.map((phase, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className={`${cardBg} p-8 rounded-2xl border ${borderColor} hover:shadow-2xl transition-all duration-300`}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className={`text-2xl font-bold ${textColor} mb-2`}>{phase.phase}</h3>
                        <h4 className={`text-xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600`}>
                          {phase.title}
                        </h4>
                      </div>
                      <div className="text-right">
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(phase.status)}`}>
                          {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                        </div>
                        <div className={`${secondaryTextColor} text-sm mt-2`}>{phase.quarter}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-3">
                          <FaCheckCircle className={`w-4 h-4 ${
                            phase.status === 'completed' ? 'text-green-500' :
                            phase.status === 'current' ? 'text-blue-500' : 
                            'text-gray-500'
                          }`} />
                          <span className={`${secondaryTextColor}`}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-indigo-500/5 to-teal-400/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div 
            id="team-header"
            className={`text-center mb-16 animate-on-scroll transition-all duration-1000 ${
              isVisible['team-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-6`}>
              Meet Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">Team</span>
            </h2>
            <p className={`${secondaryTextColor} text-lg max-w-3xl mx-auto`}>
              Industry experts and blockchain pioneers working together to revolutionize decentralized finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                id={`team-${index}`}
                className={`animate-on-scroll transition-all duration-1000 delay-${index * 100} ${
                  isVisible[`team-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className={`${cardBg} p-6 rounded-2xl border ${borderColor} hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center group`}>
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 p-1 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-full h-full rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-2xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  </div>
                  <h4 className={`text-xl font-bold ${textColor} mb-2`}>{member.name}</h4>
                  <p className="text-fuchsia-500 font-medium mb-4">{member.role}</p>
                  <p className={`${secondaryTextColor} text-sm leading-relaxed`}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div 
            id="faq-header"
            className={`text-center mb-16 animate-on-scroll transition-all duration-1000 ${
              isVisible['faq-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className={`text-4xl md:text-5xl font-bold ${textColor} mb-6`}>
              Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">Questions</span>
            </h2>
            <p className={`${secondaryTextColor} text-lg max-w-3xl mx-auto`}>
              Get answers to the most common questions about {TOKEN_NAME} token and our ecosystem.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <div
                key={index}
                id={`faq-${index}`}
                className={`animate-on-scroll transition-all duration-1000 delay-${index * 100} ${
                  isVisible[`faq-${index}`] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
              >
                <div className={`${cardBg} border ${borderColor} rounded-2xl mb-4 overflow-hidden hover:shadow-lg transition-all duration-300`}>
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className={`w-full p-6 text-left flex items-center justify-between ${hoverBg} transition-colors duration-200`}
                  >
                    <h4 className={`text-lg font-semibold ${textColor} pr-4`}>{faq.question}</h4>
                    <div className={`transform transition-transform duration-300 ${expandedFaq === index ? 'rotate-45' : ''}`}>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-4 h-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-600"></div>
                        <div className={`absolute w-0.5 h-4 bg-gradient-to-b from-fuchsia-500 to-purple-600 transition-opacity duration-300 ${expandedFaq === index ? 'opacity-0' : 'opacity-100'}`}></div>
                      </div>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 pt-0">
                      <p className={`${secondaryTextColor} leading-relaxed`}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .delay-200 { animation-delay: 200ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>
    </div>
  );
};

export default MiddlePage;