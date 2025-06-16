
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Eye } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useEffect, useState } from 'react'

interface Article {
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

interface RelatedArticlesProps {
  currentArticleId: string
  category: string
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

export function RelatedArticles({ currentArticleId, category }: RelatedArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await fetch(`/api/articles?category=${category}&exclude=${currentArticleId}&limit=12`)
        if (response.ok) {
          const data = await response.json()
          setArticles(data)
        }
      } catch (error) {
        console.error('Failed to fetch related articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedArticles()
  }, [currentArticleId, category])

  if (loading) {
    return (
      <div className="mt-12 pt-8 border-t border-gray-300">
        <h3 className="text-[18px] font-bold text-black mb-6">おすすめ記事</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-gray-100 animate-pulse">
              <div className="aspect-[16/10] bg-gray-200 mb-3"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 mb-2"></div>
                <div className="h-3 bg-gray-200 w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-300">
      <h3 className="text-[18px] font-bold text-black mb-6">おすすめ記事</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.map((article, index) => {
          const categoryColor = categoryColors[article.category as keyof typeof categoryColors] || 'text-[#222222]'
          const categoryLabel = categoryLabels[article.category as keyof typeof categoryLabels] || article.category

          return (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-white border border-gray-300 overflow-hidden hover:border-[#027EBE] transition-colors"
            >
              <Link href={`/articles/${article.slug}`}>
                <div className="relative aspect-[16/10] bg-gray-100">
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
                        <div className="text-2xl mb-1">📰</div>
                        <div className="text-[10px] font-normal">画像なし</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className={`${categoryColor} bg-white border border-gray-300 px-2 py-1 text-[10px] font-normal`}>
                      {categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <h4 className="font-bold text-black group-hover:text-[#027EBE] transition-colors line-clamp-2 text-[12px] leading-[16px] mb-2">
                    {article.title}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] text-[#222222] font-normal">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(article.publishedAt), {
                          addSuffix: true,
                          locale: ja,
                        })}
                      </span>
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
        })}
      </div>
    </div>
  )
}
