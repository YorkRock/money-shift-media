
'use client';

import React from 'react';
import { ArticleCard } from './article-card';
import { FeaturedArticleCard } from './featured-article-card';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string | Date;
  imageUrl: string;
  tags: string[];
  viewCount: number;
}

interface ArticleGridLayoutProps {
  articles: Article[];
  maxArticles?: number;
}

export function ArticleGridLayout({ articles, maxArticles = 20 }: ArticleGridLayoutProps) {
  // 記事数を制限
  const displayArticles = articles.slice(0, maxArticles);
  
  if (displayArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">記事が見つかりませんでした。</p>
      </div>
    );
  }

  // メイン記事（1段目）
  const mainArticle = displayArticles[0];
  
  // サブ記事（2段目）- 2-3記事
  const subArticles = displayArticles.slice(1, 4);
  
  // 残りの記事（3段目以降）
  const remainingArticles = displayArticles.slice(4);
  
  // 3記事、2記事のパターンをランダムに配置
  const createRandomLayout = (articles: Article[]) => {
    const layouts = [];
    let currentIndex = 0;
    
    while (currentIndex < articles.length) {
      // ランダムに3記事または2記事を選択
      const isThreeColumn = Math.random() > 0.5;
      const itemsToTake = isThreeColumn ? 3 : 2;
      const rowArticles = articles.slice(currentIndex, currentIndex + itemsToTake);
      
      if (rowArticles.length > 0) {
        layouts.push({
          type: isThreeColumn ? 'three' : 'two',
          articles: rowArticles
        });
      }
      
      currentIndex += itemsToTake;
    }
    
    return layouts;
  };

  const randomLayouts = createRandomLayout(remainingArticles);

  return (
    <div className="space-y-8">
      {/* 1段目: メイン記事 */}
      <section className="mb-12">
        <FeaturedArticleCard article={mainArticle} />
      </section>

      {/* 2段目: サブ記事 */}
      {subArticles.length > 0 && (
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* 3段目以降: ランダムパターン */}
      {randomLayouts.map((layout, index) => (
        <section key={index} className="mb-8">
          <div 
            className={`grid gap-6 ${
              layout.type === 'three' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 md:grid-cols-2'
            }`}
          >
            {layout.articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
