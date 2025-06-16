
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Mail, CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';

interface DeliveryLog {
  id: string;
  email: string;
  subject: string;
  content: string;
  status: 'SENT' | 'FAILED' | 'PENDING';
  sentAt: string;
  errorMessage?: string;
}

export default function LogsPage() {
  const [logs, setLogs] = useState<DeliveryLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<DeliveryLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, statusFilter]);

  const loadLogs = async () => {
    try {
      const response = await fetch('/api/admin/delivery-logs');
      if (response.ok) {
        const data = await response.json();
        setLogs(data.deliveryLogs || []);
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterLogs = () => {
    let filtered = logs;

    // ステータスフィルター
    if (statusFilter !== 'all') {
      filtered = filtered.filter(log => log.status === statusFilter);
    }

    // 検索フィルター
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SENT':
        return <Badge variant="default" className="bg-green-600">送信済み</Badge>;
      case 'FAILED':
        return <Badge variant="destructive">送信失敗</Badge>;
      case 'PENDING':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">送信中</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SENT':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return <Mail className="h-4 w-4 text-gray-400" />;
    }
  };

  const stats = {
    total: logs.length,
    sent: logs.filter(log => log.status === 'SENT').length,
    failed: logs.filter(log => log.status === 'FAILED').length,
    pending: logs.filter(log => log.status === 'PENDING').length
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">配信ログ</h1>
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">配信ログ</h1>
        <p className="text-gray-600 mt-2">
          メール配信の履歴と統計情報を確認できます
        </p>
      </div>

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総配信数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">送信成功</p>
                <p className="text-2xl font-bold text-gray-900">{stats.sent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">送信失敗</p>
                <p className="text-2xl font-bold text-gray-900">{stats.failed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">送信中</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* フィルター */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            フィルター
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="メールアドレスまたは件名で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="ステータス" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="SENT">送信済み</SelectItem>
                  <SelectItem value="FAILED">送信失敗</SelectItem>
                  <SelectItem value="PENDING">送信中</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
            >
              クリア
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 配信ログ一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>配信履歴</CardTitle>
          <CardDescription>
            {filteredLogs.length > 0 
              ? `${filteredLogs.length}件の配信履歴が見つかりました`
              : '配信履歴がありません'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {logs.length === 0 ? '配信履歴がありません' : '検索条件に一致する履歴がありません'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {logs.length === 0 
                  ? 'メールを送信すると、ここに履歴が表示されます'
                  : '検索条件を変更してお試しください'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getStatusIcon(log.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-gray-900 truncate">{log.subject}</p>
                          {getStatusBadge(log.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">宛先: {log.email}</p>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {log.content.substring(0, 150)}...
                        </p>
                        {log.errorMessage && (
                          <p className="text-sm text-red-600 mt-1">
                            エラー: {log.errorMessage}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm text-gray-500">
                        {new Date(log.sentAt).toLocaleString('ja-JP')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 成功率 */}
      {logs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>配信統計</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>配信成功率</span>
                  <span>{stats.total > 0 ? Math.round((stats.sent / stats.total) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${stats.total > 0 ? (stats.sent / stats.total) * 100 : 0}%`
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.sent}</p>
                  <p className="text-sm text-gray-600">成功</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                  <p className="text-sm text-gray-600">失敗</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                  <p className="text-sm text-gray-600">処理中</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
