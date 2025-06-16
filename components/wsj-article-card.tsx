
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Eye, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    slug: string
    excerpt?: string | null
    category: string
    author: string
    publishedAt: Date
    viewCount: number
    imageUrl?: string | null
  }
  variant?: 'hero' | 'large' | 'medium' | 'small' | 'list'
  index?: number
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

export function WSJArticleCard({ article, variant = 'medium', index = 0 }: ArticleCardProps) {
  const categoryColor = categoryColors[article.category as keyof typeof categoryColors] || 'bg-gray-600'
  const categoryLabel = categoryLabels[article.category as keyof typeof categoryLabels] || article.category

  // Hero variant (メイン記事)
  if (variant === 'hero') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group border-b border-gray-300 pb-8 mb-8"
      >
        <Link href={`/articles/${article.slug}`}>
          {/* モバイル: 縦並び、タブレット以上: 横並び */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* 画像部分 - 左側（デスクトップ）、上部（モバイル） */}
            <div className="w-full md:w-2/5 lg:w-[45%]">
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden rounded-sm">
                {article.imageUrl ? (
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">📰</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* テキスト部分 - 右側（デスクトップ）、下部（モバイル） */}
            <div className="flex-1 md:w-3/5 lg:w-[55%] flex flex-col justify-center">
              <div className="mb-4">
                <span className={`${categoryColor} text-white text-xs font-bold px-3 py-1 uppercase tracking-wider`}>
                  {categoryLabel}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black group-hover:text-blue-600 transition-colors mb-4 leading-tight">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="text-gray-700 text-base leading-relaxed mb-6 line-clamp-3 md:line-clamp-4">
                  {article.excerpt}
                </p>
              )}
              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {formatDistanceToNow(new Date(article.publishedAt), {
                      addSuffix: true,
                      locale: ja,
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{article.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  // Large variant
  if (variant === 'large') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group border-b border-gray-200 pb-6 mb-6"
      >
        <Link href={`/articles/${article.slug}`}>
          <div className="relative aspect-[16/9] bg-gray-100 mb-4 overflow-hidden">
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
              <span className={`${categoryColor} text-white text-xs font-bold px-2 py-1 uppercase tracking-wide`}>
                {categoryLabel}
              </span>
            </div>
          </div>
          <h2 className="text-xl font-bold text-black group-hover:text-blue-600 transition-colors mb-3 leading-tight line-clamp-2">
            {article.title}
          </h2>
          {article.excerpt && (
            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center text-xs text-gray-500 space-x-3">
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(article.publishedAt), {
                addSuffix: true,
                locale: ja,
              })}
            </span>
            <span>•</span>
            <span>{article.viewCount.toLocaleString()}</span>
          </div>
        </Link>
      </motion.article>
    )
  }

  // Medium variant (デフォルト)
  if (variant === 'medium') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group border-b border-gray-200 pb-6 mb-6"
      >
        <Link href={`/articles/${article.slug}`}>
          <div className="relative aspect-[16/9] bg-gray-100 mb-4 overflow-hidden">
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
              <span className={`${categoryColor} text-white text-xs font-bold px-2 py-1 uppercase tracking-wide`}>
                {categoryLabel}
              </span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-black group-hover:text-blue-600 transition-colors mb-3 leading-tight line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center text-xs text-gray-500 space-x-2">
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(article.publishedAt), {
                addSuffix: true,
                locale: ja,
              })}
            </span>
            <span>•</span>
            <span>{article.viewCount.toLocaleString()}</span>
          </div>
        </Link>
      </motion.article>
    )
  }

  // List variant (サイドバー用)
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group border-b border-gray-100 pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0"
    >
      <Link href={`/articles/${article.slug}`}>
        <h4 className="font-medium text-black group-hover:text-blue-600 transition-colors line-clamp-3 text-sm leading-tight mb-2">
          {article.title}
        </h4>
        <div className="flex items-center text-xs text-gray-500 space-x-2">
          <span className={`${categoryColor} text-white px-1 py-0.5 text-xs uppercase tracking-wide`}>
            {categoryLabel}
          </span>
          <span>•</span>
          <span>{article.viewCount.toLocaleString()}</span>
        </div>
      </Link>
    </motion.article>
  )
}
