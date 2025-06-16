
'use client'

import React from 'react'
import { WSJArticleCard } from './wsj-article-card'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  publishedAt: string | Date
  imageUrl: string
  tags: string[]
  viewCount: number
}

interface WSJArticleGridProps {
  articles: Article[]
  maxArticles?: number
}

export function WSJArticleGrid({ articles, maxArticles = 20 }: WSJArticleGridProps) {
  const displayArticles = articles.slice(0, maxArticles)
  
  if (displayArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">記事が見つかりませんでした。</p>
      </div>
    )
  }

  // WSJ風のレイアウト構成
  const heroArticle = displayArticles[0]
  const secondaryArticles = displayArticles.slice(1, 4)
  const remainingArticles = displayArticles.slice(4)

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section>
        <WSJArticleCard article={heroArticle} variant="hero" />
      </section>

      {/* Secondary Articles */}
      {secondaryArticles.length > 0 && (
        <section className="border-b border-gray-300 pb-8 mb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryArticles.map((article, index) => (
              <WSJArticleCard 
                key={article.id} 
                article={article} 
                variant="large" 
                index={index}
              />
            ))}
          </div>
        </section>
      )}

      {/* Remaining Articles Grid */}
      {remainingArticles.length > 0 && (
        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6">
            {remainingArticles.map((article, index) => (
              <WSJArticleCard 
                key={article.id} 
                article={article} 
                variant="medium" 
                index={index}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
