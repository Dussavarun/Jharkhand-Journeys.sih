'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SignInModal from '../components/SignIn';
import SignUpModal from '../components/Signup';
import UserProfileDropdown from '../components/UserProfile';

export default function LandingPage() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing auth token on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/auth/me', { 
        withCredentials: true 
      });
      setUser(response.data.user);
    } catch (error) {
      // User is not authenticated, which is fine for landing page
      console.log('Not authenticated');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const handleModalClose = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    // Refresh auth status after successful login/signup
    checkAuthStatus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-orange-50">
      {/* Navigation Bar */}
      <nav className="relative z-50 bg-white/90 backdrop-blur-md border-b border-emerald-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-orange-600 bg-clip-text text-transparent">
                Jharkhand Tourism
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#destinations" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Destinations</a>
              <a href="#culture" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Culture</a>
              <a href="#eco-tours" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Eco Tours</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">About</a>
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-3">
              {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-green-300 animate-pulse"></div>
              ) : user ? (
                <UserProfileDropdown user={user} onLogout={handleLogout} />
              ) : (
                <>
                  <button
                    onClick={() => setShowSignIn(true)}
                    className="px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setShowSignUp(true)}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-orange-900/20"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl animate-bounce"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-orange-600 bg-clip-text text-transparent">
                Discover Jharkhand
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto leading-relaxed">
              Smart Digital Platform for Eco & Cultural Tourism
            </p>
            
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Explore pristine forests, ancient temples, vibrant tribal culture, and sustainable tourism experiences in the heart of India. Plan your perfect eco-cultural journey with our intelligent platform.
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Eco Adventures</h3>
                <p className="text-gray-600">Sustainable wildlife safaris, nature walks, and eco-lodges in pristine forests</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m0 0v15a2 2 0 01-2 2H9a2 2 0 01-2-2V4m0 0V2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Cultural Heritage</h3>
                <p className="text-gray-600">Ancient temples, tribal art, traditional festivals, and authentic cultural experiences</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-teal-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Planning</h3>
                <p className="text-gray-600">AI-powered itineraries, real-time guides, and personalized recommendations</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                Explore Destinations
              </button>
              <button className="px-8 py-4 bg-white/90 hover:bg-white text-gray-800 font-semibold rounded-2xl shadow-xl border border-emerald-200 transform hover:scale-105 transition-all duration-300">
                Plan Your Journey
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <SignInModal 
        isOpen={showSignIn} 
        onClose={handleModalClose}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      
      <SignUpModal 
        isOpen={showSignUp} 
        onClose={handleModalClose}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </div>
  );
}