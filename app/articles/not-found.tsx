
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WSJLayout } from '@/components/wsj-layout'

export default function ArticleNotFound() {
  return (
    <WSJLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">記事が見つかりません</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            お探しの記事は存在しないか、削除された可能性があります。
          </p>
          <div className="space-x-4">
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-800">
                ホームに戻る
              </Button>
            </Link>
            <Link href="/business">
              <Button variant="outline">
                ビジネス記事を見る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </WSJLayout>
  )
}
