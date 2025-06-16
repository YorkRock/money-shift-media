
import { WSJLayout } from '@/components/wsj-layout'
import { WSJArticleGrid } from '@/components/wsj-article-grid'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

async function getMoneyArticles() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles?category=MONEY&limit=20`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error('Failed to fetch');
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error('Error fetching money articles:', error);
    return [];
  }
}

export default async function MoneyPage() {
  const articles = await getMoneyArticles()
  
  return (
    <WSJLayout>
      {/* Category Header */}
      <div className="border-b border-gray-300 pb-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Money</h1>
            <p className="text-sm text-gray-600">投資、資産形成、金融市場の分析</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Articles</p>
            <p className="text-lg font-bold text-black">{articles.length}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-6">
          <Link href="/money" className="text-sm font-medium text-black border-b-2 border-red-600 pb-1">
            All Money
          </Link>
          <Link href="/money/simulators" className="text-sm text-gray-600 hover:text-black transition-colors">
            Simulators
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-black transition-colors">
            Latest
          </Link>
        </div>
        <Link href="/">
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-300 text-gray-600 hover:text-black hover:border-black text-xs uppercase tracking-wide"
          >
            View All
          </Button>
        </Link>
      </div>

      {/* Articles with WSJ Layout */}
      <div className="py-6">
        <WSJArticleGrid articles={articles} maxArticles={20} />
      </div>

      {/* Article Count Display */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Showing {articles.length} articles
        </p>
      </div>
    </WSJLayout>
  )
}
