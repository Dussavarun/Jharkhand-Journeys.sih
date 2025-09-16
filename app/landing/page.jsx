'use client';

import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroImages = [
    {
      title: "Ancient Temples",
      subtitle: "Sacred heritage of centuries",
      bg: "from-amber-900/80 via-orange-800/70 to-red-900/60"
    },
    {
      title: "Tribal Culture",
      subtitle: "Living traditions of indigenous communities",
      bg: "from-emerald-900/80 via-green-800/70 to-teal-900/60"
    },
    {
      title: "Wildlife Sanctuaries",
      subtitle: "Pristine forests teeming with life",
      bg: "from-green-900/80 via-emerald-800/70 to-cyan-900/60"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Hero Section with Dynamic Background */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Dynamic Background Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroImages[currentSlide].bg} transition-all duration-1000`} />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full blur-sm" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 text-center max-w-6xl mx-auto px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/90 font-medium">Experience Authentic Jharkhand</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-200 via-emerald-300 to-cyan-200 bg-clip-text text-transparent animate-gradient-x">
              Land of Forests
            </span>
            <br />
            <span className="text-white/90 text-4xl md:text-6xl font-light">
              & Ancient Wisdom
            </span>
          </h1>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-white/80 mb-6 leading-relaxed">
              Journey through mystical forests, discover age-old tribal traditions, 
              and witness the raw beauty of India's mineral-rich heartland
            </p>
            
            <div className="flex items-center justify-center gap-8 text-white/70">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>32 Tribal Communities</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>29% Forest Cover</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Ancient Heritage</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
            <button className="group px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/30 transform hover:scale-105 transition-all duration-300">
              Watch Stories
              <svg className="inline-block w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Culture & Ecosystem Showcase */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-emerald-900/30 to-amber-900/20">
        {/* Section Header */}
        <div className="text-center mb-20 px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent">
              Cultural Tapestry
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Immerse yourself in the living heritage of 32 indigenous tribes, 
            each with their unique traditions, languages, and artistry
          </p>
        </div>

        {/* Interactive Culture Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Santal Traditions",
                description: "Ancient dance forms and harvest festivals",
                icon: "🎭",
                color: "from-orange-500/20 to-red-500/20",
                border: "border-orange-500/30"
              },
              {
                title: "Ho Craftsmanship", 
                description: "Intricate metalwork and pottery",
                icon: "🏺",
                color: "from-amber-500/20 to-yellow-500/20",
                border: "border-amber-500/30"
              },
              {
                title: "Munda Heritage",
                description: "Sacred groves and nature worship",
                icon: "🌳",
                color: "from-emerald-500/20 to-green-500/20",
                border: "border-emerald-500/30"
              },
              {
                title: "Oraon Artistry",
                description: "Colorful textiles and bamboo crafts",
                icon: "🎨",
                color: "from-purple-500/20 to-pink-500/20",
                border: "border-purple-500/30"
              }
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`p-8 rounded-3xl bg-gradient-to-br ${item.color} backdrop-blur-sm border ${item.border} hover:scale-105 transform transition-all duration-300 hover:shadow-2xl`}>
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                  <div className="mt-6 flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Explore Culture</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="relative py-32 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent">
                Living Ecosystem
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From the Chota Nagpur Plateau to the Damodar Valley, 
              discover biodiversity hotspots and conservation success stories
            </p>
          </div>

          {/* Ecosystem Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { number: "40%", label: "Mineral Deposits", subtitle: "Of India's total reserves" },
              { number: "200+", label: "Bird Species", subtitle: "Including rare migrants" },
              { number: "85", label: "Mammal Species", subtitle: "Tigers, elephants, leopards" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-block p-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 group-hover:bg-white/10 transition-all duration-300">
                  <div className="text-5xl font-bold text-emerald-300 mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold text-white mb-1">{stat.label}</div>
                  <div className="text-sm text-white/60">{stat.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Destinations */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Betla National Park",
                type: "Wildlife Sanctuary",
                highlight: "Royal Bengal Tigers",
                image: "🐅"
              },
              {
                title: "Netarhat Hill Station", 
                type: "Sunrise Point",
                highlight: "Queen of Chotanagpur",
                image: "🌄"
              },
              {
                title: "Hundru Falls",
                type: "Natural Wonder", 
                highlight: "98-meter waterfall",
                image: "🌊"
              }
            ].map((destination, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-black/40 to-emerald-900/40 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative p-8 h-80 flex flex-col justify-end">
                  <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    {destination.image}
                  </div>
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm font-medium rounded-full border border-emerald-500/30">
                      {destination.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{destination.title}</h3>
                  <p className="text-emerald-200 font-medium">{destination.highlight}</p>
                  
                  <button className="mt-4 flex items-center text-white/80 hover:text-white group-hover:translate-x-2 transition-all duration-300">
                    <span className="text-sm font-medium">Discover More</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-r from-amber-900 via-orange-800 to-red-900">
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Begin Your
            <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent"> Sacred Journey</span>
          </h2>
          
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Connect with nature, honor ancient wisdom, and create memories 
            that will resonate through generations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl shadow-2xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Plan Your Adventure</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
            
            <button className="px-10 py-5 border-2 border-white/30 text-white font-bold rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transform hover:scale-105 transition-all duration-300">
              Connect with Locals
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}