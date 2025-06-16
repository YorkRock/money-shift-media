
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Business', href: '/business' },
  { name: 'Technology', href: '/technology' },
  { name: 'Money', href: '/money' },
  { name: 'Life', href: '/life' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-300">
      {/* WSJ Style Container */}
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - SHIFT with WSJ Style */}
          <Link href="/" className="flex items-center">
            <div className="text-3xl font-bold text-black tracking-tight font-serif">
              SHIFT
            </div>
          </Link>

          {/* Desktop Navigation - WSJ Style */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-black hover:text-blue-600 font-medium transition-colors uppercase tracking-wide"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side buttons - WSJ Style */}
          <div className="flex items-center space-x-4">
            <Link href="/search">
              <Button variant="ghost" size="sm" className="hidden lg:flex text-black hover:text-blue-600 text-xs uppercase tracking-wide font-medium">
                記事検索
              </Button>
            </Link>
            <Link href="/newsletter">
              <Button 
                size="sm" 
                className="hidden lg:flex bg-black text-white hover:bg-gray-800 px-4 py-2 text-xs uppercase tracking-wide font-medium"
              >
                Subscribe
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-300 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-black hover:text-blue-600 font-medium text-sm uppercase tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/search"
                className="block px-3 py-2 text-black hover:text-blue-600 font-medium text-sm uppercase tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                記事検索
              </Link>
              <Link
                href="/newsletter"
                className="block px-3 py-2 text-black hover:text-blue-600 font-medium text-sm uppercase tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                Subscribe
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
