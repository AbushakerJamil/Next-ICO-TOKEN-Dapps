import React from "react";
import { 
  FaTwitter, 
  FaTelegram, 
  FaDiscord, 
  FaGithub, 
  FaMedium,
  FaLinkedin,
  FaArrowUp,
  FaShieldAlt,
  FaRocket,
  FaUsers,
  FaCode
} from "react-icons/fa";
import { 
  HiOutlineMail, 
  HiOutlineDocumentText,
  HiOutlineInformationCircle 
} from "react-icons/hi";
import { BsDiscord, BsTelegram } from "react-icons/bs";

const Footer = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();
  
  // Environment variables (same as your HeroSection)
  const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "Default Token";
  const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL || "DTK";
  const BLOCKCHAIN = process.env.NEXT_PUBLIC_BLOCKCHAIN || "Polygon";

  // Theme variables
  const bgColor = isDarkMode ? "bg-[#0E0B12]" : "bg-[#F5F7FA]";
  const cardBg = isDarkMode ? "bg-[#13101A]" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const secondaryTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const borderColor = isDarkMode ? "border-gray-800/30" : "border-gray-200/50";
  const hoverBg = isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100";

  const socialLinks = [
    {
      name: "Twitter",
      icon: <FaTwitter className="w-5 h-5" />,
      url: "#",
      color: "hover:text-blue-400"
    },
    {
      name: "Telegram",
      icon: <BsTelegram className="w-5 h-5" />,
      url: "#",
      color: "hover:text-blue-500"
    },
    {
      name: "Discord",
      icon: <BsDiscord className="w-5 h-5" />,
      url: "#",
      color: "hover:text-indigo-500"
    },
    {
      name: "GitHub",
      icon: <FaGithub className="w-5 h-5" />,
      url: "#",
      color: "hover:text-gray-600"
    },
    {
      name: "Medium",
      icon: <FaMedium className="w-5 h-5" />,
      url: "#",
      color: "hover:text-green-500"
    }
  ];

  const quickLinks = [
    { name: "How to Buy", url: "#how-to-buy" },
    { name: "Tokenomics", url: "#tokenomics" },
    { name: "Roadmap", url: "#roadmap" },
    { name: "FAQ", url: "#faq" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", url: "#privacy" },
    { name: "Terms of Service", url: "#terms" },
    { name: "Cookie Policy", url: "#cookies" },
    { name: "Disclaimer", url: "#disclaimer" }
  ];

  const features = [
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Secure & Audited",
      description: "Smart contracts audited by leading security firms"
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Fast Transactions",
      description: "Lightning-fast transactions on Polygon network"
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: "Community Driven",
      description: "Governed by our vibrant community of holders"
    },
    {
      icon: <FaCode className="w-6 h-6" />,
      title: "Open Source",
      description: "Fully transparent and open-source development"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`relative ${bgColor} border-t ${borderColor} overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? "bg-gradient-to-t from-[#0E0B12] via-[#13101A]/50 to-transparent"
            : "bg-gradient-to-t from-[#F5F7FA] via-white/50 to-transparent"
        }`}></div>
        
        {/* Animated particles background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
            isDarkMode 
              ? "bg-gradient-to-br from-fuchsia-500/10 to-purple-600/10"
              : "bg-gradient-to-br from-fuchsia-500/5 to-purple-600/5"
          } blur-3xl animate-pulse`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${
            isDarkMode 
              ? "bg-gradient-to-br from-indigo-500/10 to-teal-400/10"
              : "bg-gradient-to-br from-indigo-500/5 to-teal-400/5"
          } blur-3xl animate-pulse`} style={{ animationDelay: "2s" }}></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 flex items-center justify-center">
                  <img 
                    src="/logo.png" 
                    alt={TOKEN_SYMBOL}
                    className="w-8 h-8"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${textColor} bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600`}>
                    {TOKEN_NAME}
                  </h3>
                  <p className={`text-sm ${secondaryTextColor}`}>{TOKEN_SYMBOL} Token</p>
                </div>
              </div>
              
              <p className={`${secondaryTextColor} text-sm leading-relaxed mb-6`}>
                Revolutionizing decentralized finance through innovative blockchain technology. 
                Join our community and be part of the future.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`p-2 rounded-lg ${
                      isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                    } ${secondaryTextColor} ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={`text-lg font-semibold ${textColor} mb-6 relative`}>
                Quick Links
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded"></span>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className={`${secondaryTextColor} hover:${textColor} transition-colors duration-200 flex items-center group`}
                    >
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className={`text-lg font-semibold ${textColor} mb-6 relative`}>
                Resources
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded"></span>
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#whitepaper" className={`${secondaryTextColor} hover:${textColor} transition-colors duration-200 flex items-center group`}>
                    <HiOutlineDocumentText className="w-4 h-4 mr-3 opacity-60 group-hover:opacity-100" />
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a href="#audit" className={`${secondaryTextColor} hover:${textColor} transition-colors duration-200 flex items-center group`}>
                    <FaShieldAlt className="w-4 h-4 mr-3 opacity-60 group-hover:opacity-100" />
                    Audit Report
                  </a>
                </li>
                <li>
                  <a href="#docs" className={`${secondaryTextColor} hover:${textColor} transition-colors duration-200 flex items-center group`}>
                    <FaCode className="w-4 h-4 mr-3 opacity-60 group-hover:opacity-100" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#support" className={`${secondaryTextColor} hover:${textColor} transition-colors duration-200 flex items-center group`}>
                    <HiOutlineMail className="w-4 h-4 mr-3 opacity-60 group-hover:opacity-100" />
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className={`text-lg font-semibold ${textColor} mb-6 relative`}>
                Legal
                <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded"></span>
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      className={`${secondaryTextColor} hover:${textColor} transition-colors duration-200 flex items-center group`}
                    >
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features Section */}
          <div className={`border-t border-b ${borderColor} py-12 my-12`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className={`text-center p-6 rounded-xl ${
                  isDarkMode ? "bg-gray-800/20" : "bg-gray-50"
                } hover:scale-105 transition-transform duration-300`}>
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-fuchsia-500/20 to-purple-600/20 text-fuchsia-500 mb-4`}>
                    {feature.icon}
                  </div>
                  <h5 className={`text-lg font-semibold ${textColor} mb-2`}>
                    {feature.title}
                  </h5>
                  <p className={`${secondaryTextColor} text-sm`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className={`${cardBg} rounded-2xl p-8 mb-12 border ${borderColor} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 to-purple-600/5"></div>
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h4 className={`text-2xl font-bold ${textColor} mb-4`}>
                Stay Updated
              </h4>
              <p className={`${secondaryTextColor} mb-6`}>
                Get the latest news and updates about {TOKEN_NAME} token directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-1 px-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                      : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                  } focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent`}
                />
                <button className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t ${borderColor} py-6`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <p className={`${secondaryTextColor} text-sm`}>
                  © {currentYear} {TOKEN_NAME}. All rights reserved.
                </p>
                <div className="flex items-center space-x-4 text-xs">
                  <span className={`${secondaryTextColor} flex items-center`}>
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Built on {BLOCKCHAIN}
                  </span>
                </div>
              </div>
              
              {/* Scroll to top button */}
              {/* <button
                onClick={scrollToTop}
                className={`p-2 rounded-lg ${
                  isDarkMode ? "bg-gray-800/50 hover:bg-gray-700/50" : "bg-gray-100 hover:bg-gray-200"
                } ${secondaryTextColor} hover:text-fuchsia-500 transition-all duration-300 hover:scale-110 group`}
                aria-label="Scroll to top"
              >
                <FaArrowUp className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;