"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
const Navbar = () => { 
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col items-start mt-40 ml-40 space-y-6">
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
        >
          Sign In
        </button>

        <button
          onClick={() => router.push('/signup')}
          className="px-6 py-3 border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-100 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
    </div>
  )
}

export default Navbar
