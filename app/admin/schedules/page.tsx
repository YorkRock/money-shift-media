
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Clock, Send, X, CheckCircle, AlertCircle } from 'lucide-react';

interface Schedule {
  id: string;
  subject: string;
  content: string;
  scheduledAt: string;
  status: 'PENDING' | 'SENT' | 'CANCELLED';
  createdAt: string;
  articleIds: string[];
}

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // フォーム状態
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    scheduledAt: '',
    articleIds: []
  });

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      const response = await fetch('/api/admin/newsletter-schedule');
      if (response.ok) {
        const data = await response.json();
        setSchedules(data.schedules || []);
      } else {
        setError('スケジュールの読み込みに失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      content: '',
      scheduledAt: '',
      articleIds: []
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 日時の検証
    const scheduledDate = new Date(formData.scheduledAt);
    const now = new Date();
    
    if (scheduledDate <= now) {
      setError('配信日時は現在時刻より後に設定してください');
      return;
    }

    try {
      const response = await fetch('/api/admin/newsletter-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('配信スケジュールを作成しました');
        resetForm();
        setIsAddDialogOpen(false);
        loadSchedules();
      } else {
        const data = await response.json();
        setError(data.error || 'スケジュールの作成に失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    }
  };

  const handleQuickFill = (type: string) => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const defaultTime = tomorrow.toISOString().slice(0, 16);

    switch (type) {
      case 'daily':
        setFormData({
          ...formData,
          subject: '【日刊】オウンドメディア - 今日の注目記事',
          content: `今日のオウンドメディアから、注目の記事をお届けします。

■ 本日のハイライト
• 最新のビジネストレンド
• テクノロジーの動向
• 投資・資産運用情報

詳細は以下のリンクからご覧ください：
https://localhost:3000

オウンドメディア編集部`,
          scheduledAt: defaultTime
        });
        break;
      case 'weekly':
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        setFormData({
          ...formData,
          subject: '【週刊】オウンドメディア - 今週の総まとめ',
          content: `今週のオウンドメディアから、人気記事をまとめてお届けします。

■ 今週のベスト記事
• 週間アクセスランキング
• 注目のトピック
• 読者からの反響

来週もお楽しみに！

オウンドメディア編集部`,
          scheduledAt: nextWeek.toISOString().slice(0, 16)
        });
        break;
      case 'special':
        setFormData({
          ...formData,
          subject: '【特別号】重要なお知らせ',
          content: `いつもオウンドメディアをご利用いただき、ありがとうございます。

■ 特別なお知らせ
• 新機能のリリース
• キャンペーン情報
• イベントのご案内

詳細は以下をご確認ください：
https://localhost:3000

オウンドメディア編集部`,
          scheduledAt: defaultTime
        });
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">配信待ち</Badge>;
      case 'SENT':
        return <Badge variant="default" className="bg-green-600">配信済み</Badge>;
      case 'CANCELLED':
        return <Badge variant="secondary">キャンセル</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const isScheduledInPast = (scheduledAt: string) => {
    return new Date(scheduledAt) <= new Date();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">配信スケジュール</h1>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">配信スケジュール</h1>
          <p className="text-gray-600 mt-2">
            メール配信の予約とスケジュール管理を行います
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              配信予約
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>新しい配信を予約</DialogTitle>
              <DialogDescription>
                配信する内容と日時を設定してください
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">件名 *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="メールの件名"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="scheduledAt">配信日時 *</Label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) => setFormData({...formData, scheduledAt: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">本文 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="メールの本文"
                  rows={8}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  キャンセル
                </Button>
                <Button type="submit">
                  配信予約
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* クイック作成 */}
      <Card>
        <CardHeader>
          <CardTitle>クイック作成</CardTitle>
          <CardDescription>
            よく使用される配信パターンから選択できます
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start"
              onClick={() => {
                handleQuickFill('daily');
                setIsAddDialogOpen(true);
              }}
            >
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="font-medium">日刊配信</span>
              </div>
              <span className="text-sm text-gray-500">毎日の注目記事をお届け</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start"
              onClick={() => {
                handleQuickFill('weekly');
                setIsAddDialogOpen(true);
              }}
            >
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="font-medium">週刊配信</span>
              </div>
              <span className="text-sm text-gray-500">週間まとめをお届け</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start"
              onClick={() => {
                handleQuickFill('special');
                setIsAddDialogOpen(true);
              }}
            >
              <div className="flex items-center mb-2">
                <Send className="mr-2 h-4 w-4" />
                <span className="font-medium">特別配信</span>
              </div>
              <span className="text-sm text-gray-500">重要なお知らせ</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">配信待ち</p>
                <p className="text-2xl font-bold text-gray-900">
                  {schedules.filter(s => s.status === 'PENDING').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">配信済み</p>
                <p className="text-2xl font-bold text-gray-900">
                  {schedules.filter(s => s.status === 'SENT').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <X className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">キャンセル</p>
                <p className="text-2xl font-bold text-gray-900">
                  {schedules.filter(s => s.status === 'CANCELLED').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* スケジュール一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>配信スケジュール一覧</CardTitle>
          <CardDescription>
            予約されている配信の一覧です
          </CardDescription>
        </CardHeader>
        <CardContent>
          {schedules.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">配信スケジュールがありません</h3>
              <p className="mt-1 text-sm text-gray-500">
                最初の配信を予約してください
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {schedules
                .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
                .map((schedule) => (
                <div
                  key={schedule.id}
                  className={`p-4 border rounded-lg ${
                    isScheduledInPast(schedule.scheduledAt) && schedule.status === 'PENDING'
                      ? 'border-red-200 bg-red-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-gray-900">{schedule.subject}</h3>
                        {getStatusBadge(schedule.status)}
                        {isScheduledInPast(schedule.scheduledAt) && schedule.status === 'PENDING' && (
                          <Badge variant="destructive">期限切れ</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {schedule.content.substring(0, 100)}...
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          配信予定: {new Date(schedule.scheduledAt).toLocaleString('ja-JP')}
                        </span>
                        <span>
                          作成日: {new Date(schedule.createdAt).toLocaleDateString('ja-JP')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {schedule.status === 'PENDING' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
