// Footer.tsx
import React from 'react'
import AppLogo from '@/components/app-logo-icon'

const linkClass =
  'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 font-dm-sans transition-colors'

export const Footer = () => {
  return (
    <footer className="w-full py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="flex justify-center">
            <AppLogo className="w-24 h-24" />
          </a>
          <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 py-16 mb-10 border-b border-gray-200 dark:border-white/10">
            <li><a href="/" className={linkClass}>Home</a></li>
            <li><a href="#features" className={linkClass}>Features</a></li>
            <li><a href="#how-it-works" className={linkClass}>How It Works</a></li>
            <li><a href="#contact" className={linkClass}>Contact</a></li>
          </ul>
          <span className="text-lg font-lexend text-gray-500 text-center block">
            ©<a href="/">Reziq</a> 2026, All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}