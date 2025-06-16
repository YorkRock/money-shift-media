
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  isPublished: boolean;
  viewCount: number;
  imageUrl: string;
  tags: string[];
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // フォーム状態
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    author: '',
    imageUrl: '',
    tags: '',
    isPublished: true
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const response = await fetch('/api/admin/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
      } else {
        setError('記事の読み込みに失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      author: '',
      imageUrl: '',
      tags: '',
      isPublished: true
    });
    setEditingArticle(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const url = editingArticle 
        ? `/api/admin/articles/${editingArticle.id}`
        : '/api/admin/articles';
      
      const method = editingArticle ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        }),
      });

      if (response.ok) {
        setSuccess(editingArticle ? '記事を更新しました' : '記事を追加しました');
        resetForm();
        setIsAddDialogOpen(false);
        loadArticles();
      } else {
        const data = await response.json();
        setError(data.error || '記事の保存に失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    }
  };

  const handleEdit = (article: Article) => {
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      category: article.category,
      author: article.author,
      imageUrl: article.imageUrl,
      tags: article.tags.join(', '),
      isPublished: article.isPublished
    });
    setEditingArticle(article);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('この記事を削除しますか？')) return;

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('記事を削除しました');
        loadArticles();
      } else {
        setError('記事の削除に失敗しました');
      }
    } catch (error) {
      setError('ネットワークエラーが発生しました');
    }
  };

  const handleTogglePublish = async (article: Article) => {
    try {
      const response = await fetch(`/api/admin/articles/${article.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isPublished: !article.isPublished
        }),
      });

      if (response.ok) {
        setSuccess('記事のステータスを更新しました');
        loadArticles();
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
        <h1 className="text-3xl font-bold text-gray-900">記事管理</h1>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-24 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold text-gray-900">記事管理</h1>
          <p className="text-gray-600 mt-2">
            サイトの記事を管理します
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              記事追加
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingArticle ? '記事を編集' : '新しい記事を追加'}
              </DialogTitle>
              <DialogDescription>
                記事の詳細情報を入力してください
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">タイトル *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="記事のタイトル"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">カテゴリ *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="カテゴリを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BUSINESS">ビジネス</SelectItem>
                      <SelectItem value="TECHNOLOGY">テクノロジー</SelectItem>
                      <SelectItem value="MONEY">マネー</SelectItem>
                      <SelectItem value="LIFE">ライフ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="author">著者</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="編集部"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="excerpt">概要</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    placeholder="記事の概要"
                    rows={2}
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="content">本文 *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="記事の本文"
                    rows={6}
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="imageUrl">画像URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    placeholder="https://i.ytimg.com/vi/jWCXc32OIUY/maxresdefault.jpg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tags">タグ（カンマ区切り）</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="タグ1, タグ2, タグ3"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="isPublished">公開する</Label>
                </div>
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
                  {editingArticle ? '更新' : '追加'}
                </Button>
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
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総記事数</p>
                <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">公開済み</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => a.isPublished).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <EyeOff className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">下書き</p>
                <p className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => !a.isPublished).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 記事リスト */}
      <Card>
        <CardHeader>
          <CardTitle>記事一覧</CardTitle>
          <CardDescription>
            登録されている記事の一覧です
          </CardDescription>
        </CardHeader>
        <CardContent>
          {articles.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">記事がありません</h3>
              <p className="mt-1 text-sm text-gray-500">
                最初の記事を追加してください
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      <Badge variant={article.isPublished ? 'default' : 'secondary'}>
                        {article.isPublished ? '公開' : '下書き'}
                      </Badge>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{article.excerpt}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>著者: {article.author}</span>
                      <span>閲覧数: {article.viewCount}</span>
                      <span>公開日: {new Date(article.publishedAt).toLocaleDateString('ja-JP')}</span>
                    </div>
                    {article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {article.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(article)}
                    >
                      {article.isPublished ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
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
