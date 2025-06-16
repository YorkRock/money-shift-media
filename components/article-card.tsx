
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
  featured?: boolean
  compact?: boolean
  index?: number
}

const categoryColors = {
  BUSINESS: 'text-[#027EBE]',
  TECHNOLOGY: 'text-[#027EBE]',
  MONEY: 'text-[#027EBE]',
  LIFE: 'text-[#027EBE]',
}

const categoryLabels = {
  BUSINESS: 'ビジネス',
  TECHNOLOGY: 'テクノロジー',
  MONEY: 'マネー',
  LIFE: 'ライフ',
}

export function ArticleCard({ article, featured = false, compact = false, index = 0 }: ArticleCardProps) {
  const categoryColor = categoryColors[article.category as keyof typeof categoryColors] || 'text-[#222222]'
  const categoryLabel = categoryLabels[article.category as keyof typeof categoryLabels] || article.category

  if (compact) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group bg-white border border-gray-300 overflow-hidden hover:border-[#027EBE] transition-colors"
      >
        <Link href={`/articles/${article.slug}`}>
          <div className="flex gap-4 p-4">
            <div className="relative w-24 h-16 bg-gray-100 flex-shrink-0">
              {article.imageUrl ? (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white flex items-center justify-center border border-gray-300">
                  <div className="text-[#222222] text-center">
                    <div className="text-base">📰</div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <span className={`${categoryColor} text-[10px] font-normal`}>
                  {categoryLabel}
                </span>
              </div>
              <h3 className="font-bold text-black group-hover:text-[#027EBE] transition-colors line-clamp-2 text-[14px] leading-[18px] mb-2">
                {article.title}
              </h3>
              <div className="flex items-center text-[10px] text-[#222222] font-normal">
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{article.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group bg-white border border-gray-300 overflow-hidden hover:border-[#027EBE] transition-colors ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <Link href={`/articles/${article.slug}`}>
        <div className={`relative ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'} bg-gray-100`}>
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-white flex items-center justify-center border border-gray-300">
              <div className="text-[#222222] text-center">
                <div className="text-3xl mb-2">📰</div>
                <div className="text-[12px] font-normal">画像なし</div>
              </div>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className={`${categoryColor} bg-white border border-gray-300 px-3 py-1 text-[12px] font-normal`}>
              {categoryLabel}
            </span>
          </div>
        </div>

        <div className={`p-4 ${featured ? 'md:p-6' : ''}`}>
          <h2 className={`font-bold text-black group-hover:text-[#027EBE] transition-colors line-clamp-2 ${
            featured ? 'text-[18px] md:text-[22px] mb-3 leading-tight' : 'text-[16px] mb-2 leading-[20px]'
          }`}>
            {article.title}
          </h2>

          {article.excerpt && (
            <p className={`text-[#111111] line-clamp-3 font-normal ${featured ? 'text-[12px] mb-4 leading-[18px]' : 'text-[12px] mb-3 leading-[18px]'}`}>
              {article.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between text-[12px] text-[#222222] font-normal">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(article.publishedAt), {
                    addSuffix: true,
                    locale: ja,
                  })}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{article.viewCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
