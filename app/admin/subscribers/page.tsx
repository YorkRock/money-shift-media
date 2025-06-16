
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Trash2, Mail, UserCheck, UserX } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  subscribedAt: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/subscribers');
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      } else {
        setError('購読者の読み込みに失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newEmail,
          name: newName,
        }),
      });

      if (response.ok) {
        setSuccess('購読者を追加しました');
        setNewEmail('');
        setNewName('');
        setIsAddDialogOpen(false);
        loadSubscribers();
      } else {
        const data = await response.json();
        setError(data.error || '購読者の追加に失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('この購読者を削除しますか？')) return;

    try {
      const response = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('購読者を削除しました');
        loadSubscribers();
      } else {
        setError('購読者の削除に失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !currentStatus,
        }),
      });

      if (response.ok) {
        setSuccess('購読者のステータスを更新しました');
        loadSubscribers();
      } else {
        setError('ステータスの更新に失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">購読者管理</h1>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">購読者管理</h1>
          <p className="text-gray-600 mt-2">
            メールマガジンの購読者を管理します
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              購読者追加
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新しい購読者を追加</DialogTitle>
              <DialogDescription>
                メールアドレスと名前を入力してください
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubscriber} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">名前</Label>
                <Input
                  id="name"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="山田太郎"
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
                <Button type="submit">追加</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総購読者数</p>
                <p className="text-2xl font-bold text-gray-900">{subscribers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">アクティブ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscribers.filter(s => s.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserX className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">非アクティブ</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscribers.filter(s => !s.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 購読者リスト */}
      <Card>
        <CardHeader>
          <CardTitle>購読者一覧</CardTitle>
          <CardDescription>
            登録されている購読者の一覧です
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subscribers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">購読者がいません</h3>
              <p className="mt-1 text-sm text-gray-500">
                最初の購読者を追加してください
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{subscriber.email}</p>
                      {subscriber.name && (
                        <p className="text-sm text-gray-500">{subscriber.name}</p>
                      )}
                      <p className="text-xs text-gray-400">
                        登録日: {new Date(subscriber.subscribedAt).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={subscriber.isActive ? 'default' : 'secondary'}>
                      {subscriber.isActive ? 'アクティブ' : '非アクティブ'}
                    </Badge>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(subscriber.id, subscriber.isActive)}
                    >
                      {subscriber.isActive ? (
                        <UserX className="h-4 w-4" />
                      ) : (
                        <UserCheck className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteSubscriber(subscriber.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
