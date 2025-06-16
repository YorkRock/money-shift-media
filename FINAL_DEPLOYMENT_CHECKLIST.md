
# 最終デプロイチェックリスト - money-shift.jp

## 🎯 完全自動化デプロイ準備完了

### ✅ 設定済み項目

#### プロジェクト設定
- [x] **ドメイン**: money-shift.jp
- [x] **プロジェクト名**: msmedia32's projects  
- [x] **配信元メール**: shift@money-shift.jp
- [x] **サイト名**: SHIFT
- [x] **運営者情報**: フッターに表示済み

#### 技術設定
- [x] **Vercel設定**: 最適化済み
- [x] **環境変数**: テンプレート作成済み
- [x] **データベース**: Prisma + PostgreSQL
- [x] **認証**: NextAuth.js
- [x] **メール機能**: Nodemailer + SMTP
- [x] **自動記事更新**: Cronジョブ設定済み
- [x] **メルマガ配信**: スケジュール機能付き

#### コンテンツ
- [x] **サンプル記事**: 5記事作成済み
- [x] **投資シミュレーター**: 4種類実装済み
- [x] **管理画面**: 完全機能実装
- [x] **メルマガ機能**: 登録・配信システム

---

## 🔧 デプロイ時に設定が必要な環境変数

### 必須項目（4つ）
```bash
DATABASE_URL="postgres://username:password@hostname:port/database?sslmode=require"
NEXTAUTH_SECRET="your-32-character-secret-key"
SMTP_HOST="smtp.sendgrid.net"
SMTP_PASSWORD="your-sendgrid-api-key"
```

### オプション項目（デフォルト値使用可）
```bash
SMTP_PORT="587"
SMTP_USER="apikey"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
ADMIN_EMAIL="admin@money-shift.jp"
```

---

## 📋 Vercelデプロイ手順

### Step 1: プロジェクトインポート
1. Vercelダッシュボードにアクセス
2. 「New Project」→ GitHubリポジトリ選択
3. プロジェクト名: `msmedia32-money-shift`

### Step 2: 環境変数設定
Settings → Environment Variables で以下を設定：

**必須項目**:
- `DATABASE_URL`: Vercel Postgres接続文字列
- `NEXTAUTH_SECRET`: `openssl rand -base64 32` で生成
- `SMTP_HOST`: `smtp.sendgrid.net`
- `SMTP_PASSWORD`: SendGrid APIキー

**オプション項目**:
- `ADMIN_USERNAME`: カスタム管理者名（デフォルト: admin）
- `ADMIN_PASSWORD`: カスタムパスワード（デフォルト: admin123）
- `ADMIN_EMAIL`: 管理者メール（デフォルト: admin@money-shift.jp）

### Step 3: ドメイン設定
1. Settings → Domains
2. `money-shift.jp` を追加
3. DNS設定でVercelのCNAMEを指定

### Step 4: デプロイ実行
1. 「Deploy」ボタンクリック
2. 自動ビルド・マイグレーション実行
3. 完了後、サイトアクセス可能

---

## 🎉 デプロイ完了後の確認

### 基本機能テスト
- [ ] https://money-shift.jp でサイト表示
- [ ] 記事一覧・詳細ページ表示
- [ ] カテゴリページ動作
- [ ] 投資シミュレーター動作
- [ ] メルマガ登録フォーム動作

### 管理機能テスト
- [ ] https://money-shift.jp/admin/login でログイン
- [ ] 記事管理画面表示・操作
- [ ] メルマガ管理画面表示
- [ ] テストメール送信成功

### メール機能テスト
- [ ] 管理画面からテストメール送信
- [ ] メルマガ登録確認メール受信
- [ ] 配信スケジュール設定

---

## 🚨 推奨SMTP設定

### SendGrid（推奨）
**無料枠**: 月100通まで無料

1. **アカウント作成**: https://sendgrid.com
2. **APIキー取得**: Settings → API Keys → Create API Key
3. **ドメイン認証**: Settings → Sender Authentication
4. **環境変数設定**:
   ```bash
   SMTP_HOST="smtp.sendgrid.net"
   SMTP_PORT="587"
   SMTP_USER="apikey"
   SMTP_PASSWORD="SG.your-api-key"
   ```

### Resend（代替案）
**無料枠**: 月3,000通まで無料

1. **アカウント作成**: https://resend.com
2. **APIキー取得**: Dashboard → API Keys
3. **環境変数設定**:
   ```bash
   SMTP_HOST="smtp.resend.com"
   SMTP_PORT="587"
   SMTP_USER="resend"
   SMTP_PASSWORD="re_your-api-key"
   ```

---

## 🔐 セキュリティ設定

### 本番環境での必須変更
- [ ] 管理者パスワード変更（admin123 → 強固なパスワード）
- [ ] NEXTAUTH_SECRET を本番用に生成
- [ ] SMTP APIキーの適切な権限設定

### 推奨セキュリティ設定
- [ ] Vercelの2FA有効化
- [ ] データベースの定期バックアップ設定
- [ ] 環境変数の定期更新

---

## 📞 サポート・連絡先

**プロジェクト**: msmedia32's projects  
**ドメイン**: money-shift.jp  
**メール**: shift@money-shift.jp  

**デフォルト管理者アカウント**:
- URL: https://money-shift.jp/admin/login
- ユーザー名: admin
- パスワード: admin123

⚠️ **重要**: 本番環境では必ずパスワードを変更してください

---

## 🎊 デプロイ完了

すべての設定が完了すると、以下のURLでサービスが利用可能になります：

- **メインサイト**: https://money-shift.jp
- **管理画面**: https://money-shift.jp/admin
- **投資シミュレーター**: https://money-shift.jp/money/simulators
- **メルマガ登録**: https://money-shift.jp/newsletter

**自動機能**:
- 6時間ごとの記事自動更新
- 5分ごとのメルマガ配信チェック
- データベース自動バックアップ

🚀 **デプロイ成功をお祈りしています！**
