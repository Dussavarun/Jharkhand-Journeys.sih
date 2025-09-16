// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import axios from 'axios';
// import SignInModal from '../components/SignIn';
// import SignUpModal from '../components/Signup';
// import UserProfileDropdown from '../components/UserProfile';

// const NAV_ITEMS = [
//   { name: 'Home', href: '/' },
//   { name: 'Destinations', href: '/destinations' },
//   { name: 'Handicrafts', href: '/handicrafts' },
//   { name: 'Marketplace', href: '/marketplace' },
//   { name: 'Guides', href: '/guides' },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [showSignUp, setShowSignUp] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const btnRef = useRef(null);
//   const menuRef = useRef(null);

//   // Check for existing auth token on component mount
//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   useEffect(() => {
//     const onKey = (e) => e.key === 'Escape' && setOpen(false);
//     const onClick = (e) => {
//       if (!open) return;
//       const t = e.target;
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(t) &&
//         btnRef.current &&
//         !btnRef.current.contains(t)
//       ) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener('keydown', onKey);
//     document.addEventListener('click', onClick);
//     return () => {
//       document.removeEventListener('keydown', onKey);
//       document.removeEventListener('click', onClick);
//     };
//   }, [open]);

//   const checkAuthStatus = async () => {
//     try {
//       const response = await axios.get('/api/auth/me', { 
//         withCredentials: true 
//       });
//       setUser(response.data.user);
//     } catch (error) {
//       // User is not authenticated
//       console.log('Not authenticated');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   const handleSwitchToSignUp = () => {
//     setShowSignIn(false);
//     setShowSignUp(true);
//   };

//   const handleSwitchToSignIn = () => {
//     setShowSignUp(false);
//     setShowSignIn(true);
//   };

//   const handleModalClose = () => {
//     setShowSignIn(false);
//     setShowSignUp(false);
//     // Refresh auth status after successful login/signup
//     checkAuthStatus();
//   };

//   const isActive = (href) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

//   return (
//     <>
//       <header className="sticky top-0 z-50">
//         <nav
//           className="bg-white/80 dark:bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-b border-neutral-200/60 dark:border-neutral-800 shadow-sm"
//           aria-label="Primary"
//         >
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="flex h-16 items-center justify-between">
//               {/* Brand */}
//               <div className="flex items-center gap-2">
//                 <div className="bg-gradient-to-br from-green-600 to-emerald-700 w-10 h-10 rounded-full grid place-items-center">
//                   <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                     <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd" />
//                   </svg>
//                   <span className="sr-only">Jharkhand Journeys</span>
//                 </div>
//                 <Link
//                   href="/"
//                   className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent"
//                 >
//                   Jharkhand Journeys
//                 </Link>
//               </div>

//               {/* Desktop nav */}
//               <div className="hidden md:flex items-center gap-6">
//                 {NAV_ITEMS.map((item) => (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     className={[
//                       'inline-flex items-center gap-1 text-sm font-medium transition-colors',
//                       'hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/30 rounded-sm px-1 py-1',
//                       isActive(item.href) ? 'text-green-700' : 'text-neutral-700 dark:text-neutral-300',
//                     ].join(' ')}
//                   >
//                     {item.name}
//                     {isActive(item.href) && <span className="ml-1 h-1 w-1 rounded-full bg-green-700" aria-hidden="true" />}
//                   </Link>
//                 ))}

//                 {/* Auth / CTA */}
//                 <div className="flex items-center gap-3 pl-2">
//                   {isLoading ? (
//                     <div className="w-8 h-8 rounded-full bg-green-300 animate-pulse"></div>
//                   ) : user ? (
//                     <UserProfileDropdown user={user} onLogout={handleLogout} />
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => setShowSignIn(true)}
//                         className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/30 rounded-sm px-1 py-1"
//                       >
//                         Sign In
//                       </button>
//                       <button
//                         onClick={() => setShowSignUp(true)}
//                         className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-green-700 hover:to-emerald-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40"
//                       >
//                         Sign Up
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div className="md:hidden">
//                 <button
//                   ref={btnRef}
//                   type="button"
//                   className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40"
//                   aria-label="Open main menu"
//                   aria-haspopup="true"
//                   aria-expanded={open}
//                   aria-controls="mobile-menu"
//                   onClick={() => setOpen((v) => !v)}
//                 >
//                   {open ? (
//                     <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} aria-hidden="true">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   ) : (
//                     <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} aria-hidden="true">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div
//             id="mobile-menu"
//             ref={menuRef}
//             className={[
//               'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
//               open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
//             ].join(' ')}
//           >
//             <div className="bg-white/95 dark:bg-neutral-950/90 border-t border-neutral-200/60 dark:border-neutral-800 backdrop-blur">
//               <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
//                 <div className="flex flex-col gap-3">
//                   {NAV_ITEMS.map((item) => (
//                     <Link
//                       key={item.href}
//                       href={item.href}
//                       onClick={() => setOpen(false)}
//                       className={[
//                         'flex items-center justify-between rounded-md px-3 py-2 text-base font-medium',
//                         isActive(item.href) ? 'text-green-700 bg-green-50' : 'text-neutral-800 hover:bg-neutral-100',
//                       ].join(' ')}
//                     >
//                       <span>{item.name}</span>
//                       {isActive(item.href) ? (
//                         <span className="h-1.5 w-1.5 rounded-full bg-green-700" aria-hidden="true" />
//                       ) : null}
//                     </Link>
//                   ))}

//                   <div className="mt-2">
//                     {isLoading ? (
//                       <div className="w-full h-10 rounded-md bg-green-300 animate-pulse"></div>
//                     ) : user ? (
//                       <div className="px-3 py-2">
//                         <UserProfileDropdown user={user} onLogout={handleLogout} />
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-2 gap-3">
//                         <button
//                           onClick={() => {
//                             setShowSignIn(true);
//                             setOpen(false);
//                           }}
//                           className="inline-flex items-center justify-center rounded-md border border-green-600/30 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
//                         >
//                           Sign In
//                         </button>
//                         <button
//                           onClick={() => {
//                             setShowSignUp(true);
//                             setOpen(false);
//                           }}
//                           className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-green-700 hover:to-emerald-700"
//                         >
//                           Sign Up
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* Modals */}
//       <SignInModal 
//         isOpen={showSignIn} 
//         onClose={handleModalClose}
//         onSwitchToSignUp={handleSwitchToSignUp}
//       />
      
//       <SignUpModal 
//         isOpen={showSignUp} 
//         onClose={handleModalClose}
//         onSwitchToSignIn={handleSwitchToSignIn}
//       />
//     </>
//   );
// }'
"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import SignInModal from '../components/SignIn';
import SignUpModal from '../components/Signup';
import UserProfileDropdown from '../components/UserProfile';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Destinations', href: '/destinations' },
  { name: 'Handicrafts', href: '/handicrafts' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Guides', href: '/guides' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Check for existing auth token on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onClick = (e) => {
      if (!open) return;
      const t = e.target;
      if (
        menuRef.current &&
        !menuRef.current.contains(t) &&
        btnRef.current &&
        !btnRef.current.contains(t)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/auth/me', { 
        withCredentials: true 
      });
      setUser(response.data.user);
    } catch (error) {
      // User is not authenticated
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

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <>
      <header className="sticky top-0 z-50">
        <nav
          className="bg-white/80 dark:bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-b border-neutral-200/60 dark:border-neutral-800 shadow-sm"
          aria-label="Primary"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Brand */}
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-green-600 to-emerald-700 w-10 h-10 rounded-full grid place-items-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16z" clipRule="evenodd" />
                  </svg>
                  <span className="sr-only">Jharkhand Journeys</span>
                </div>
                <Link
                  href="/"
                  className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent"
                >
                  Jharkhand Journeys
                </Link>
              </div>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-6">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      'inline-flex items-center gap-1 text-sm font-medium transition-colors',
                      'hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/30 rounded-sm px-1 py-1',
                      isActive(item.href) ? 'text-green-700' : 'text-neutral-700 dark:text-neutral-300',
                    ].join(' ')}
                  >
                    {item.name}
                    {isActive(item.href) && <span className="ml-1 h-1 w-1 rounded-full bg-green-700" aria-hidden="true" />}
                  </Link>
                ))}

                {/* Auth / CTA */}
                <div className="flex items-center gap-3 pl-2">
                  {isLoading ? (
                    <div className="w-8 h-8 rounded-full bg-green-300 animate-pulse"></div>
                  ) : user ? (
                    <UserProfileDropdown user={user} onLogout={handleLogout} />
                  ) : (
                    <>
                      <button
                        onClick={() => setShowSignIn(true)}
                        className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/30 rounded-sm px-1 py-1"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => setShowSignUp(true)}
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-green-700 hover:to-emerald-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="md:hidden">
                <button
                  ref={btnRef}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40"
                  aria-label="Open main menu"
                  aria-haspopup="true"
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  onClick={() => setOpen((v) => !v)}
                >
                  {open ? (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div
            id="mobile-menu"
            ref={menuRef}
            className={[
              'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
              open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0',
            ].join(' ')}
          >
            <div className="bg-white/95 dark:bg-neutral-950/90 border-t border-neutral-200/60 dark:border-neutral-800 backdrop-blur">
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-3">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={[
                        'flex items-center justify-between rounded-md px-3 py-2 text-base font-medium',
                        isActive(item.href) ? 'text-green-700 bg-green-50' : 'text-neutral-800 hover:bg-neutral-100',
                      ].join(' ')}
                    >
                      <span>{item.name}</span>
                      {isActive(item.href) ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-green-700" aria-hidden="true" />
                      ) : null}
                    </Link>
                  ))}

                  <div className="mt-2">
                    {isLoading ? (
                      <div className="w-full h-10 rounded-md bg-green-300 animate-pulse"></div>
                    ) : user ? (
                      <div className="px-3 py-2">
                        {/* Mobile User Profile - Simple Layout */}
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{user.name || 'User'}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Mobile User Actions */}
                        <div className="mt-3 space-y-2">
                          <button 
                            onClick={() => setOpen(false)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile Settings
                          </button>
                          
                          <button 
                            onClick={() => setOpen(false)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            My Bookings
                          </button>
                          
                          <button 
                            onClick={() => setOpen(false)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                          </button>
                          
                          <button 
                            onClick={() => {
                              handleLogout();
                              setOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            setShowSignIn(true);
                            setOpen(false);
                          }}
                          className="inline-flex items-center justify-center rounded-md border border-green-600/30 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => {
                            setShowSignUp(true);
                            setOpen(false);
                          }}
                          className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-green-700 hover:to-emerald-700"
                        >
                          Sign Up
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

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
    </>
  );
}