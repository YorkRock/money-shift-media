
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  Play, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  Mail,
  FileText,
  Activity,
  RefreshCw
} from 'lucide-react';

interface AutomationLog {
  type: string;
  status: string;
  message: string;
  timestamp: string;
}

export default function AutomationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [lastCheck, setLastCheck] = useState<string>('');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    // 実際の実装では、ログを保存・取得する仕組みが必要
    setLastCheck(new Date().toLocaleString('ja-JP'));
  };

  const executeManualAction = async (action: string) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/cron/scheduler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-cron-secret-key'
        },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(`${action === 'update_articles' ? '記事更新' : 'メルマガ配信'}を実行しました`);
        
        // ログに追加
        const newLog: AutomationLog = {
          type: action,
          status: 'success',
          message: data.result?.message || '手動実行完了',
          timestamp: new Date().toISOString()
        };
        setLogs(prev => [newLog, ...prev.slice(0, 9)]);
      } else {
        const data = await response.json();
        setError(data.error || '実行に失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const checkScheduler = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/cron/scheduler', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer your-cron-secret-key'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('スケジューラーの状態を確認しました');
        setLastCheck(new Date().toLocaleString('ja-JP'));
        
        // 結果をログに追加
        if (data.results) {
          const newLogs = data.results.map((result: any) => ({
            type: result.type,
            status: result.status,
            message: result.message,
            timestamp: result.timestamp
          }));
          setLogs(prev => [...newLogs, ...prev.slice(0, 10 - newLogs.length)]);
        }
      } else {
        setError('スケジューラーの確認に失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const getJSTTime = () => {
    const now = new Date();
    const jstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return jstTime.toLocaleString('ja-JP');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-600">成功</Badge>;
      case 'error':
        return <Badge variant="destructive">エラー</Badge>;
      case 'no_action':
        return <Badge variant="outline">待機中</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article_update':
      case 'update_articles':
        return <FileText className="h-4 w-4" />;
      case 'newsletter_send':
      case 'send_newsletter':
        return <Mail className="h-4 w-4" />;
      case 'check':
        return <Activity className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'article_update':
      case 'update_articles':
        return '記事更新';
      case 'newsletter_send':
      case 'send_newsletter':
        return 'メルマガ配信';
      case 'check':
        return 'スケジュール確認';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">自動化設定</h1>
          <p className="text-gray-600 mt-2">
            記事更新とメール配信の自動化を管理します
          </p>
        </div>
        
        <Button 
          onClick={checkScheduler}
          disabled={isLoading}
          variant="outline"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          状態確認
        </Button>
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

      {/* 現在時刻表示 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">現在時刻（日本時間）</p>
                <p className="text-2xl font-bold text-gray-900">{getJSTTime()}</p>
              </div>
            </div>
            {lastCheck && (
              <div className="text-right">
                <p className="text-sm text-gray-500">最終確認</p>
                <p className="text-sm font-medium">{lastCheck}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 自動化スケジュール */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              記事自動更新
            </CardTitle>
            <CardDescription>
              毎日決まった時間に記事を自動更新します
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">実行時刻（日本時間）</span>
                <Badge variant="outline">自動実行</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>朝の更新</span>
                  <span className="font-mono">06:00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>昼の更新</span>
                  <span className="font-mono">11:30</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>夕方の更新</span>
                  <span className="font-mono">17:30</span>
                </div>
              </div>
              <Separator />
              <Button 
                onClick={() => executeManualAction('update_articles')}
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                <Play className="mr-2 h-4 w-4" />
                手動実行
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              メルマガ自動配信
            </CardTitle>
            <CardDescription>
              毎朝決まった時間にメルマガを自動配信します
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">実行時刻（日本時間）</span>
                <Badge variant="outline">自動実行</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>朝の配信</span>
                  <span className="font-mono">07:00</span>
                </div>
              </div>
              <Separator />
              <Button 
                onClick={() => executeManualAction('send_newsletter')}
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                <Play className="mr-2 h-4 w-4" />
                手動実行
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 実行ログ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            実行ログ
          </CardTitle>
          <CardDescription>
            自動化機能の実行履歴を表示します
          </CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">実行ログがありません</h3>
              <p className="mt-1 text-sm text-gray-500">
                自動化機能が実行されるとここに表示されます
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(log.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {getTypeName(log.type)}
                      </span>
                      {getStatusBadge(log.status)}
                    </div>
                    <p className="text-sm text-gray-600">{log.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(log.timestamp).toLocaleString('ja-JP')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 設定情報 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            設定情報
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">記事自動更新</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 毎日3回実行（6:00, 11:30, 17:30 JST）</li>
                <li>• 1-2記事をランダムに追加</li>
                <li>• 既存記事のビューカウント更新</li>
                <li>• 重複チェック機能付き</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">メルマガ自動配信</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 毎朝7:00に自動配信（JST）</li>
                <li>• 人気記事の自動選択</li>
                <li>• カテゴリ別最新記事の紹介</li>
                <li>• 配信ログの自動記録</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
