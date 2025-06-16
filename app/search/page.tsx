
'use client'

import { useState, useEffect } from 'react'
import { Search, Clock, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface Article {
  id: number
  title: string
  excerpt: string
  slug: string
  category: string
  publishedAt: string
  readTime: number
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [popularArticles, setPopularArticles] = useState<Article[]>([])

  // 人気記事を取得
  useEffect(() => {
    const fetchPopularArticles = async () => {
      try {
        const response = await fetch('/api/articles/popular')
        if (response.ok) {
          const articles = await response.json()
          setPopularArticles(articles.slice(0, 6))
        }
      } catch (error) {
        console.error('人気記事の取得に失敗しました:', error)
      }
    }

    fetchPopularArticles()
  }, [])

  // 検索実行
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch(`/api/articles?search=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const articles = await response.json()
        setSearchResults(articles)
      } else {
        setSearchResults([])
      }
    } catch (error) {
      console.error('検索に失敗しました:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'business':
        return 'bg-blue-100 text-blue-800'
      case 'technology':
        return 'bg-green-100 text-green-800'
      case 'money':
        return 'bg-purple-100 text-purple-800'
      case 'life':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">記事検索</h1>
          <p className="text-lg text-gray-600">
            キーワードを入力して、お探しの記事を見つけましょう
          </p>
        </div>

        {/* 検索フォーム */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="記事のタイトルやキーワードを入力..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || !searchQuery.trim()}
              className="h-12 px-8 bg-black text-white hover:bg-gray-800"
            >
              {isLoading ? '検索中...' : '検索'}
            </Button>
          </div>
        </form>

        {/* 検索結果 */}
        {hasSearched && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              検索結果 ({searchResults.length}件)
            </h2>
            
            {searchResults.length > 0 ? (
              <div className="grid gap-6">
                {searchResults.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={getCategoryColor(article.category)}>
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}分で読める
                        </div>
                      </div>
                      
                      <Link href={`/articles/${article.slug}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {formatDate(article.publishedAt)}
                        </span>
                        <Link href={`/articles/${article.slug}`}>
                          <Button variant="outline" size="sm">
                            記事を読む
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  検索結果が見つかりませんでした
                </h3>
                <p className="text-gray-600">
                  別のキーワードで検索してみてください
                </p>
              </div>
            )}
          </div>
        )}

        {/* 人気記事 */}
        {!hasSearched && popularArticles.length > 0 && (
          <div>
            <div className="flex items-center mb-6">
              <TrendingUp className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">人気記事</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {popularArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}分で読める
                      </div>
                    </div>
                    
                    <Link href={`/articles/${article.slug}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {formatDate(article.publishedAt)}
                      </span>
                      <Link href={`/articles/${article.slug}`}>
                        <Button variant="outline" size="sm">
                          記事を読む
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
