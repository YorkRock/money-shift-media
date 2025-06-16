
# データベース設定ガイド

このドキュメントでは、Vercel Postgresを使用したデータベースの設定手順を詳しく説明します。

## 📋 概要

このプロジェクトでは以下のデータベーステーブルを使用します：

- **articles**: 記事データ
- **subscribers**: ニュースレター購読者
- **newsletters**: 配信済みニュースレター
- **admins**: 管理者アカウント
- **delivery_logs**: 配信ログ
- **newsletter_schedules**: 配信スケジュール
- **simulation_results**: シミュレーション結果

---

## 🗄️ Step 1: Vercel Postgresの作成

### 1-1. データベースの作成
1. Vercelプロジェクトダッシュボードにアクセス
2. 「Storage」タブをクリック
3. 「Create Database」を選択
4. 「Postgres」を選択
5. 以下の設定を入力：
   - **Database Name**: `media-database`
   - **Region**: `Tokyo (nrt1)`（日本の場合）
6. 「Create」をクリック

### 1-2. 接続情報の確認
1. 作成されたデータベースをクリック
2. 「Settings」タブを選択
3. 「Connection Pooling」で接続情報を確認
4. `DATABASE_URL`をコピー

---

## ⚙️ Step 2: 環境変数の設定

### 2-1. DATABASE_URLの設定
1. Vercelプロジェクトの「Settings」→「Environment Variables」
2. 新しい環境変数を追加：
   - **Name**: `DATABASE_URL`
   - **Value**: コピーした接続文字列
   - **Environment**: Production, Preview, Development全てにチェック

### 2-2. 接続文字列の形式
```
postgres://username:password@hostname:port/database?sslmode=require
```

---

## 🔧 Step 3: Prismaの設定確認

### 3-1. schema.prismaの確認
プロジェクトの`prisma/schema.prisma`ファイルが以下の設定になっていることを確認：

```prisma
generator client {
    provider = "prisma-client-js"
    binaryTargets = ["native", "linux-musl-arm64-openssl-3.0.x"]
}

datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
}
```

### 3-2. 必要なテーブル構造
以下のテーブルが定義されています：

#### Articles（記事）
- id: 記事ID
- title: タイトル
- slug: URL用スラッグ
- content: 本文
- excerpt: 抜粋
- category: カテゴリ（BUSINESS, TECHNOLOGY, MONEY, LIFE）
- author: 著者
- publishedAt: 公開日時
- viewCount: 閲覧数
- imageUrl: 画像URL
- tags: タグ配列

#### Subscribers（購読者）
- id: 購読者ID
- email: メールアドレス
- name: 名前
- isActive: アクティブ状態
- subscribedAt: 購読開始日時

#### その他のテーブル
- Newsletter: 配信済みニュースレター
- Admin: 管理者アカウント
- DeliveryLog: 配信ログ
- NewsletterSchedule: 配信スケジュール

---

## 🚀 Step 4: データベースの初期化

### 4-1. マイグレーションの実行

#### 方法1: Vercel CLI使用（推奨）
```bash
# Vercel CLIのインストール
npm i -g vercel

# プロジェクトにログイン
vercel login

# プロジェクトにリンク
vercel link

# マイグレーション実行
vercel env pull .env.local
npx prisma migrate deploy
```

#### 方法2: GitHub Actions使用
1. リポジトリに`.github/workflows/deploy.yml`を作成
2. 以下の内容を追加：

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 4-2. シードデータの投入
```bash
npx prisma db seed
```

---

## 📊 Step 5: データベースの確認

### 5-1. Vercelダッシュボードでの確認
1. Vercel Postgresダッシュボードにアクセス
2. 「Data」タブを選択
3. 以下のテーブルが作成されていることを確認：
   - articles
   - subscribers
   - newsletters
   - admins
   - delivery_logs
   - newsletter_schedules
   - simulation_results

### 5-2. サンプルデータの確認
以下のクエリでデータを確認：

```sql
-- 記事数の確認
SELECT COUNT(*) FROM articles;

-- カテゴリ別記事数
SELECT category, COUNT(*) FROM articles GROUP BY category;

-- 管理者アカウントの確認
SELECT username FROM admins;
```

---

## 🔐 Step 6: セキュリティ設定

### 6-1. 接続制限
- Vercel Postgresは自動的にSSL接続を要求
- IPアドレス制限は不要（Vercelプロジェクトからのみアクセス可能）

### 6-2. バックアップ設定
1. Vercel Postgresダッシュボードで「Backups」タブを確認
2. 自動バックアップが有効になっていることを確認
3. 必要に応じて手動バックアップを実行

---

## 🛠️ Step 7: メンテナンス

### 7-1. 定期的なタスク
- **データベースサイズの監視**: 月1回
- **バックアップの確認**: 週1回
- **パフォーマンスの監視**: 日次

### 7-2. スケールアップ
データベースの使用量が増加した場合：
1. Vercel Postgresダッシュボードで使用量を確認
2. 必要に応じてプランをアップグレード
3. 接続プールの設定を調整

---

## 🚨 トラブルシューティング

### よくある問題と解決方法

#### 1. 接続エラー
```
Error: P1001: Can't reach database server
```
**解決方法**:
- `DATABASE_URL`の形式を確認
- SSL接続が有効になっているか確認
- Vercelプロジェクトからのアクセスか確認

#### 2. マイグレーションエラー
```
Error: Migration failed
```
**解決方法**:
- データベースが空であることを確認
- 権限が正しく設定されているか確認
- 既存のマイグレーションファイルを削除して再実行

#### 3. シードデータエラー
```
Error: Unique constraint failed
```
**解決方法**:
- 既存のデータを削除してから再実行
- シードスクリプトの重複チェック機能を確認

#### 4. パフォーマンス問題
**症状**: クエリが遅い
**解決方法**:
- インデックスの追加を検討
- クエリの最適化
- 接続プールの設定調整

---

## 📞 サポート

### Vercel Postgresサポート
- ドキュメント: https://vercel.com/docs/storage/vercel-postgres
- コミュニティ: https://github.com/vercel/vercel/discussions
- サポートチケット: https://vercel.com/support

### Prismaサポート
- ドキュメント: https://www.prisma.io/docs
- コミュニティ: https://github.com/prisma/prisma/discussions

---

## 📝 チェックリスト

デプロイ前の確認事項：

- [ ] Vercel Postgresが作成されている
- [ ] `DATABASE_URL`が正しく設定されている
- [ ] マイグレーションが正常に実行されている
- [ ] シードデータが投入されている
- [ ] 全てのテーブルが作成されている
- [ ] 管理者アカウントが作成されている
- [ ] バックアップ設定が有効になっている
- [ ] 接続テストが成功している

これで、データベースの設定は完了です！
