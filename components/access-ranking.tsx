
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

interface RankingArticle {
  id: string
  title: string
  slug: string
  viewCount: number
}

export function AccessRanking() {
  const [articles, setArticles] = useState<RankingArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularArticles = async () => {
      try {
        const response = await fetch('/api/articles/popular')
        if (response.ok) {
          const data = await response.json()
          setArticles(data)
        }
      } catch (error) {
        console.error('Failed to fetch popular articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularArticles()
  }, [])

  if (loading) {
    return (
      <div className="bg-white">
        <div className="border-b border-gray-300 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-red-600" />
            <h3 className="text-sm font-bold text-black uppercase tracking-wide">Most Read</h3>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex gap-3">
              <span className="text-lg font-bold text-gray-400 min-w-[24px]">{num}</span>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="border-b border-gray-300 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-red-600" />
          <h3 className="text-sm font-bold text-black uppercase tracking-wide">Most Read</h3>
        </div>
      </div>
      
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={article.id} className="flex gap-3 items-start group">
            <span className={`text-lg font-bold min-w-[24px] mt-0.5 ${
              index === 0 ? 'text-red-600' : 
              index === 1 ? 'text-orange-500' : 
              index === 2 ? 'text-yellow-600' : 
              'text-gray-400'
            }`}>
              {index + 1}
            </span>
            <Link 
              href={`/articles/${article.slug}`}
              className="text-sm text-black hover:text-blue-600 transition-colors leading-tight line-clamp-3 group-hover:underline"
            >
              {article.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
