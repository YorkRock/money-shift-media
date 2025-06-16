
# Vercel完全自動化デプロイガイド - money-shift.jp

## 🚀 ワンクリックデプロイ準備完了

このプロジェクトは **money-shift.jp** での完全自動化デプロイ用に最適化されています。

### 📋 設定済み項目

✅ **ドメイン**: money-shift.jp  
✅ **プロジェクト名**: msmedia32's projects  
✅ **配信元メール**: shift@money-shift.jp  
✅ **Vercel設定**: 完全最適化済み  
✅ **データベース**: Prisma + PostgreSQL  
✅ **認証システム**: NextAuth.js  
✅ **メール機能**: Nodemailer + SMTP  

---

## 🔧 デプロイ前に設定が必要な項目

### 1. データベース設定
```bash
DATABASE_URL="postgres://username:password@hostname:port/database?sslmode=require"
```
**推奨**: Vercel Postgres または Supabase

### 2. 認証設定
```bash
NEXTAUTH_SECRET="your-secret-key-here-32-characters-minimum"
```
**生成方法**: `openssl rand -base64 32`

### 3. SMTP設定（メール送信用）
**推奨サービス**: SendGrid（無料枠あり）
```bash
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
```

### 4. 管理者アカウント（オプション）
```bash
ADMIN_USERNAME="your-admin-username"
ADMIN_PASSWORD="your-secure-password"
ADMIN_EMAIL="admin@money-shift.jp"
```

---

## 📝 Vercelでの設定手順

### Step 1: プロジェクトをVercelにインポート
1. Vercelダッシュボードにアクセス
2. 「New Project」をクリック
3. GitHubリポジトリを選択
4. プロジェクト名: `msmedia32-money-shift`

### Step 2: 環境変数を設定
Vercelの「Settings」→「Environment Variables」で以下を設定：

```bash
# 必須項目
DATABASE_URL=postgres://...
NEXTAUTH_SECRET=your-secret-key
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-api-key

# オプション（デフォルト値使用可）
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@money-shift.jp
```

### Step 3: ドメイン設定
1. 「Settings」→「Domains」
2. `money-shift.jp` を追加
3. DNS設定でVercelのIPを指定

### Step 4: デプロイ実行
1. 「Deploy」ボタンをクリック
2. 自動ビルド・デプロイが開始
3. 完了後、`https://money-shift.jp` でアクセス可能

---

## 🎯 デプロイ後の確認事項

### ✅ 基本機能チェック
- [ ] サイトが正常に表示される
- [ ] 記事一覧が表示される
- [ ] カテゴリページが動作する
- [ ] 検索機能が動作する

### ✅ 管理機能チェック
- [ ] `/admin/login` でログイン可能
- [ ] 記事管理画面が表示される
- [ ] メルマガ管理画面が表示される

### ✅ メール機能チェック
- [ ] テストメール送信が成功する
- [ ] メルマガ登録が動作する
- [ ] 配信スケジュールが設定できる

---

## 🔧 推奨SMTP設定

### SendGrid（推奨）
- **無料枠**: 月100通
- **設定簡単**: APIキーのみ
- **高い到達率**: 企業向け

```bash
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="SG.your-api-key"
```

### Resend（代替案）
- **無料枠**: 月3,000通
- **開発者向け**: 簡単API

```bash
SMTP_HOST="smtp.resend.com"
SMTP_PORT="587"
SMTP_USER="resend"
SMTP_PASSWORD="re_your-api-key"
```

---

## 🚨 トラブルシューティング

### ビルドエラーが発生した場合
1. 環境変数が正しく設定されているか確認
2. `DATABASE_URL` の形式が正しいか確認
3. Vercelのログを確認

### メール送信ができない場合
1. SMTP設定を確認
2. APIキーが有効か確認
3. 送信元ドメインの認証設定を確認

### 管理画面にログインできない場合
1. `ADMIN_USERNAME` と `ADMIN_PASSWORD` を確認
2. データベースに管理者アカウントが作成されているか確認

---

## 📞 サポート

**プロジェクト**: msmedia32's projects  
**メール**: shift@money-shift.jp  
**ドメイン**: money-shift.jp  

---

## 🎉 デプロイ完了後

デプロイが完了したら、以下のURLでサイトにアクセスできます：

- **メインサイト**: https://money-shift.jp
- **管理画面**: https://money-shift.jp/admin/login
- **メルマガ登録**: https://money-shift.jp/newsletter

**デフォルト管理者アカウント**:
- ユーザー名: `admin`
- パスワード: `admin123`

⚠️ **セキュリティ**: 本番環境では必ずパスワードを変更してください。
