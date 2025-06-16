
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Eye, User, ArrowRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

interface FeaturedArticleCardProps {
  article: {
    id: string
    title: string
    slug: string
    excerpt?: string | null
    content: string
    category: string
    author: string
    publishedAt: Date
    viewCount: number
    imageUrl?: string | null
  }
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

// Function to create a summary from content if excerpt is not available
function createSummary(content: string, excerpt?: string | null): string {
  if (excerpt) return excerpt
  
  // Remove HTML tags and get first 120 characters
  const plainText = content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ').trim()
  return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText
}

export function FeaturedArticleCard({ article, index = 0 }: FeaturedArticleCardProps) {
  const categoryColor = categoryColors[article.category as keyof typeof categoryColors] || 'text-[#222222]'
  const categoryLabel = categoryLabels[article.category as keyof typeof categoryLabels] || article.category
  const summary = createSummary(article.content, article.excerpt)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white border border-gray-300 overflow-hidden hover:border-[#027EBE] transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] bg-gray-100">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
          <span className={`${categoryColor} bg-white border border-gray-300 px-3 py-1 text-[10px] font-normal`}>
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-black group-hover:text-[#027EBE] transition-colors line-clamp-2 text-[16px] leading-[20px] mb-3">
          {article.title}
        </h3>

        <p className="text-[#111111] line-clamp-3 font-normal text-[12px] mb-4 leading-[18px]">
          {summary}
        </p>

        <div className="flex items-center justify-between text-[10px] text-[#222222] font-normal mb-4">
          <div className="flex items-center space-x-3">
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

        <Link href={`/articles/${article.slug}`}>
          <div className="flex items-center justify-between text-[#027EBE] hover:text-[#025a8a] transition-colors">
            <span className="text-[12px] font-normal">詳細を読む</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </motion.article>
  )
}
