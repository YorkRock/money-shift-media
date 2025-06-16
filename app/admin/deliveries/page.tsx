
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function DeliveriesPage() {
  const [email, setEmail] = useState('yoshipen@gmail.com');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/send-test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subject,
          content,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(`テストメールを送信しました: ${email}`);
        setSubject('');
        setContent('');
      } else {
        const data = await response.json();
        setError(data.error || 'メール送信に失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (type: string) => {
    switch (type) {
      case 'welcome':
        setSubject('【オウンドメディア】ご登録ありがとうございます');
        setContent(`いつもオウンドメディアをご利用いただき、ありがとうございます。

この度は、メールマガジンにご登録いただき、誠にありがとうございます。

今後、以下のような情報を定期的にお届けいたします：
• ビジネスの最新トレンド
• テクノロジーの動向
• 投資・資産運用の情報
• ライフスタイルに関する記事

ご質問やご要望がございましたら、お気軽にお問い合わせください。

今後ともよろしくお願いいたします。

オウンドメディア編集部`);
        break;
      case 'newsletter':
        setSubject('【週刊】オウンドメディア - 今週の注目記事');
        setContent(`今週のオウンドメディアから、注目の記事をお届けします。

■ 今週のハイライト
• AI技術の最新動向と企業への影響
• 2024年の投資戦略：分散投資の重要性
• リモートワーク時代の生産性向上術

■ 人気記事ランキング
1. デジタル変革を成功させる5つのポイント
2. 暗号資産投資の基礎知識
3. 健康的なワークライフバランスの作り方

詳細は以下のリンクからご覧ください：
https://localhost:3000

次回の配信もお楽しみに！

オウンドメディア編集部`);
        break;
      case 'update':
        setSubject('【重要】サイトアップデートのお知らせ');
        setContent(`いつもオウンドメディアをご利用いただき、ありがとうございます。

この度、サイトの機能向上のため、以下のアップデートを実施いたします：

■ 新機能
• 記事検索機能の強化
• カテゴリ別フィルタリング
• お気に入り記事の保存機能

■ 改善点
• ページ読み込み速度の向上
• モバイル表示の最適化
• ユーザビリティの改善

アップデート期間中、一時的にサービスがご利用いただけない場合がございます。
ご不便をおかけいたしますが、ご理解のほどよろしくお願いいたします。

オウンドメディア編集部`);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">メール配信</h1>
        <p className="text-gray-600 mt-2">
          テストメールの送信と配信管理を行います
        </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* メール作成フォーム */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                テストメール送信
              </CardTitle>
              <CardDescription>
                指定したメールアドレスにテストメールを送信します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendTestEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">送信先メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="test@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">件名</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="メールの件名"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">本文</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="メールの本文を入力してください"
                    rows={12}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      送信中...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      テストメール送信
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* クイック入力 */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>テンプレート</CardTitle>
              <CardDescription>
                よく使用されるメールテンプレートです
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickFill('welcome')}
              >
                <Mail className="mr-2 h-4 w-4" />
                ウェルカムメール
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickFill('newsletter')}
              >
                <Mail className="mr-2 h-4 w-4" />
                週刊ニュースレター
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickFill('update')}
              >
                <Mail className="mr-2 h-4 w-4" />
                アップデート通知
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>配信統計</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">今日の配信</span>
                  <span className="font-medium">0件</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">今週の配信</span>
                  <span className="font-medium">0件</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">総配信数</span>
                  <span className="font-medium">0件</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 配信履歴プレビュー */}
      <Card>
        <CardHeader>
          <CardTitle>最近の配信履歴</CardTitle>
          <CardDescription>
            最近送信されたメールの履歴です
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Mail className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">配信履歴がありません</h3>
            <p className="mt-1 text-sm text-gray-500">
              テストメールを送信すると、ここに履歴が表示されます
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
