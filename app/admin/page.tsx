
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Mail, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  subscribers: number;
  articles: number;
  deliveries: number;
  schedules: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    subscribers: 0,
    articles: 0,
    deliveries: 0,
    schedules: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // 購読者数を取得
      const subscribersResponse = await fetch('/api/admin/subscribers');
      const subscribersData = await subscribersResponse.json();
      
      // 記事数を取得
      const articlesResponse = await fetch('/api/admin/articles');
      const articlesData = await articlesResponse.json();
      
      // 配信ログを取得
      const logsResponse = await fetch('/api/admin/delivery-logs');
      const logsData = await logsResponse.json();
      
      // スケジュールを取得
      const schedulesResponse = await fetch('/api/admin/newsletter-schedule');
      const schedulesData = await schedulesResponse.json();

      setStats({
        subscribers: subscribersData.subscribers?.length || 0,
        articles: articlesData.total || 0,
        deliveries: logsData.deliveryLogs?.length || 0,
        schedules: schedulesData.schedules?.length || 0
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: '購読者数',
      value: stats.subscribers,
      description: '登録済みの購読者',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/admin/subscribers'
    },
    {
      title: '記事数',
      value: stats.articles,
      description: '公開済みの記事',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/admin/articles'
    },
    {
      title: '配信実績',
      value: stats.deliveries,
      description: 'メール配信回数',
      icon: Mail,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/admin/logs'
    },
    {
      title: '配信予定',
      value: stats.schedules,
      description: 'スケジュール済み',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      href: '/admin/schedules'
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
        <div className="text-sm text-gray-500">
          最終更新: {new Date().toLocaleString('ja-JP')}
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-sm text-gray-500">{card.description}</p>
                  </div>
                  <div className={`p-3 rounded-full ${card.bgColor}`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              メール配信
            </CardTitle>
            <CardDescription>
              購読者にメールを配信します
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Link href="/admin/deliveries" className="flex-1">
                <Button className="w-full">
                  テスト配信
                </Button>
              </Link>
              <Link href="/admin/schedules" className="flex-1">
                <Button variant="outline" className="w-full">
                  配信予約
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              コンテンツ管理
            </CardTitle>
            <CardDescription>
              記事と購読者を管理します
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Link href="/admin/articles" className="flex-1">
                <Button className="w-full">
                  記事管理
                </Button>
              </Link>
              <Link href="/admin/subscribers" className="flex-1">
                <Button variant="outline" className="w-full">
                  購読者管理
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 最近の活動 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            最近の活動
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">システム起動</span>
              <span className="text-sm text-gray-500">{new Date().toLocaleString('ja-JP')}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600">管理画面アクセス</span>
              <span className="text-sm text-gray-500">{new Date().toLocaleString('ja-JP')}</span>
            </div>
            <div className="text-center py-4">
              <Link href="/admin/logs">
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  詳細ログを見る
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
