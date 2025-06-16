
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Eye, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  category: string
  author: string
  publishedAt: Date | string
  viewCount: number
  imageUrl?: string | null
}

interface CustomCategoryLayoutProps {
  articles: Article[]
  maxArticles?: number
}

const categoryColors = {
  BUSINESS: 'bg-blue-600',
  TECHNOLOGY: 'bg-green-600',
  MONEY: 'bg-red-600',
  LIFE: 'bg-purple-600',
}

const categoryLabels = {
  BUSINESS: 'ビジネス',
  TECHNOLOGY: 'テクノロジー',
  MONEY: 'マネー',
  LIFE: 'ライフ',
}

export function CustomCategoryLayout({ articles, maxArticles = 20 }: CustomCategoryLayoutProps) {
  const displayArticles = articles.slice(0, maxArticles)
  
  if (displayArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">記事が見つかりませんでした。</p>
      </div>
    )
  }

  // 記事を分割：最初の3記事は特別レイアウト、残りは通常グリッド
  const featuredArticle = displayArticles[0]
  const sideArticles = displayArticles.slice(1, 3)
  const gridArticles = displayArticles.slice(3)

  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || 'bg-gray-600'
  }

  const getCategoryLabel = (category: string) => {
    return categoryLabels[category as keyof typeof categoryLabels] || category
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return formatDistanceToNow(dateObj, {
      addSuffix: true,
      locale: ja,
    })
  }

  return (
    <div className="space-y-8">
      {/* Featured Section - 特別レイアウト */}
      <section className="mb-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* 左側：大きな記事 (1.5倍サイズ) */}
          <div className="lg:col-span-2">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group h-full"
            >
              <Link href={`/articles/${featuredArticle.slug}`}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative aspect-[16/9] bg-gray-100 rounded-t-lg overflow-hidden">
                    {featuredArticle.imageUrl ? (
                      <Image
                        src={featuredArticle.imageUrl}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                        <span className="text-gray-400 text-4xl">📰</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`${getCategoryColor(featuredArticle.category)} text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide`}>
                        {getCategoryLabel(featuredArticle.category)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-xl lg:text-2xl font-bold text-black group-hover:text-blue-600 transition-colors mb-3 leading-tight line-clamp-3">
                      {featuredArticle.title}
                    </h2>
                    {featuredArticle.excerpt && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {featuredArticle.excerpt}
                      </p>
                    )}
                    <div className="flex items-center text-xs text-gray-500 space-x-4 mt-auto">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{featuredArticle.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(featuredArticle.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{featuredArticle.viewCount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          </div>

          {/* 右側：縦に2記事 */}
          <div className="space-y-6">
            {sideArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                className="group h-full"
              >
                <Link href={`/articles/${article.slug}`}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative aspect-[16/9] bg-gray-100 rounded-t-lg overflow-hidden">
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                          <span className="text-gray-400 text-2xl">📰</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className={`${getCategoryColor(article.category)} text-white text-xs font-medium px-2 py-1 rounded-full uppercase tracking-wide`}>
                          {getCategoryLabel(article.category)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors mb-2 leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500 space-x-3 mt-auto">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{formatDate(article.publishedAt)}</span>
                        <span>•</span>
                        <span>{article.viewCount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 残りの記事：通常のグリッドレイアウト */}
      {gridArticles.length > 0 && (
        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gridArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.05 }}
                className="group"
              >
                <Link href={`/articles/${article.slug}`}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative aspect-[16/9] bg-gray-100 rounded-t-lg overflow-hidden">
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                          <span className="text-gray-400 text-xl">📰</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className={`${getCategoryColor(article.category)} text-white text-xs font-medium px-2 py-1 rounded-full uppercase tracking-wide`}>
                          {getCategoryLabel(article.category)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-base font-bold text-black group-hover:text-blue-600 transition-colors mb-2 leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500 space-x-2 mt-auto">
                        <span className="truncate">{article.author}</span>
                        <span>•</span>
                        <span>{article.viewCount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
