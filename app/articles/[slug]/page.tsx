
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Eye, User, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { RelatedArticles } from '@/components/related-articles'
import { WSJLayout } from '@/components/wsj-layout'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

async function getArticleBySlug(slug: string) {
  try {
    // Get all articles from main API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles?limit=100`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const articles = await response.json();
    
    // Find the article by slug
    const article = articles.find((a: any) => a.slug === slug && a.isPublished);
    
    return article || null;
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
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

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const categoryColor = categoryColors[article.category as keyof typeof categoryColors] || 'text-[#222222]'
  const categoryLabel = categoryLabels[article.category as keyof typeof categoryLabels] || article.category

  // Process content to remove image placeholders and create clean text layout
  const processContent = (content: string) => {
    // Remove image break placeholders completely
    const cleanContent = content.replace(/%%IMAGE_BREAK_\d+%%/g, '')
    
    // Split into paragraphs and process
    const paragraphs = cleanContent.split('\n').filter(p => p.trim())
    const elements: JSX.Element[] = []
    
    paragraphs.forEach((paragraph, index) => {
      const trimmedParagraph = paragraph.trim()
      
      if (trimmedParagraph.startsWith('## ')) {
        // Heading
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold mt-10 mb-6 text-black leading-tight">
            {trimmedParagraph.replace('## ', '')}
          </h2>
        )
      } else if (trimmedParagraph.startsWith('### ')) {
        // Sub-heading
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-semibold mt-8 mb-4 text-black leading-tight">
            {trimmedParagraph.replace('### ', '')}
          </h3>
        )
      } else if (trimmedParagraph) {
        // Regular paragraph
        elements.push(
          <p key={`p-${index}`} className="mb-6 leading-relaxed text-base text-gray-800 font-normal">
            {trimmedParagraph}
          </p>
        )
      }
    })
    
    return elements
  }

  return (
    <WSJLayout showSidebar={false}>
      <article className="py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex items-center text-xs text-gray-500 space-x-2">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${article.category.toLowerCase()}`} className="hover:text-black transition-colors">
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-black">{article.title.substring(0, 50)}...</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="mb-12 border-b border-gray-200 pb-8">
          <div className="mb-4">
            <span className={`bg-${article.category === 'BUSINESS' ? 'blue' : article.category === 'TECHNOLOGY' ? 'green' : article.category === 'MONEY' ? 'red' : 'purple'}-600 text-white text-xs font-medium px-2 py-1 uppercase tracking-wide`}>
              {categoryLabel}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight font-serif">
            {article.title}
          </h1>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-8">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="font-medium">By</span>
                <span className="text-black font-medium">{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDistanceToNow(new Date(article.publishedAt), {
                    addSuffix: true,
                    locale: ja,
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{article.viewCount.toLocaleString()} views</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-gray-600 hover:text-black hover:border-black text-xs"
              >
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="relative aspect-[16/9] bg-gray-100 mb-8">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </header>

        {/* Article Content - WSJ Style Typography */}
        <div className="article-content max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="text-lg leading-relaxed text-gray-800 font-serif">
              {processContent(article.content)}
            </div>
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-bold text-black mb-4 uppercase tracking-wide">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        <div className="mt-16">
          <RelatedArticles currentArticleId={article.id} category={article.category} />
        </div>

        {/* Newsletter CTA - WSJ Style */}
        <div className="mt-16 p-8 bg-gray-50 border border-gray-200 text-center">
          <h3 className="text-xl font-bold text-black mb-3 uppercase tracking-wide">
            Stay Informed
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            毎朝7時に厳選された記事3本をお送りします
          </p>
          <Link href="/newsletter">
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-sm font-medium uppercase tracking-wide transition-colors">
              Subscribe
            </Button>
          </Link>
        </div>
      </article>
    </WSJLayout>
  )
}
