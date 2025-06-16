
import { PrismaClient } from '@prisma/client'
import { massiveArticleData } from '../lib/seed-data-massive'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting to seed database with massive article data...')
  
  // 既存の記事を削除
  await prisma.article.deleteMany({})
  console.log('Deleted existing articles')

  // 新しい記事データを挿入
  for (const articleData of massiveArticleData) {
    await prisma.article.create({
      data: {
        title: articleData.title,
        slug: articleData.slug,
        content: articleData.content,
        excerpt: articleData.excerpt,
        category: articleData.category as Category,
        author: articleData.author,
        imageUrl: articleData.imageUrl,
        tags: articleData.tags,
        isPublished: articleData.isPublished,
        viewCount: articleData.viewCount,
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // 過去30日間のランダムな日付
      }
    })
  }

  console.log(`Seeded ${massiveArticleData.length} articles`)
  
  // 記事数を確認
  const articleCount = await prisma.article.count()
  console.log(`Total articles in database: ${articleCount}`)
  
  // カテゴリ別記事数を確認
  const categoryStats = await prisma.article.groupBy({
    by: ['category'],
    _count: {
      id: true
    }
  })
  
  console.log('Articles by category:')
  categoryStats.forEach((stat: any) => {
    console.log(`${stat.category}: ${stat._count.id} articles`)
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
