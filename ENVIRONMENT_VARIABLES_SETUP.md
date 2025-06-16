
# 環境変数設定ガイド - money-shift.jp

## 🔧 Vercel環境変数設定

### 必須環境変数

#### 1. データベース設定
```bash
DATABASE_URL="postgres://username:password@hostname:port/database?sslmode=require"
```

**推奨データベースサービス**:
- **Vercel Postgres** (推奨): Vercel内で完結
- **Supabase**: 無料枠が豊富
- **PlanetScale**: MySQL互換

#### 2. 認証設定
```bash
NEXTAUTH_SECRET="your-32-character-secret-key"
```

**生成方法**:
```bash
# ターミナルで実行
openssl rand -base64 32
```

#### 3. メール送信設定
```bash
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
```

---

## 📧 SMTP設定詳細

### SendGrid設定（推奨）

1. **SendGridアカウント作成**
   - https://sendgrid.com にアクセス
   - 無料アカウントを作成（月100通まで無料）

2. **APIキー取得**
   - ダッシュボード → Settings → API Keys
   - 「Create API Key」をクリック
   - Full Access を選択
   - APIキーをコピー

3. **ドメイン認証**
   - Settings → Sender Authentication
   - Domain Authentication を設定
   - `money-shift.jp` を認証

4. **環境変数設定**
   ```bash
   SMTP_HOST="smtp.sendgrid.net"
   SMTP_PORT="587"
   SMTP_USER="apikey"
   SMTP_PASSWORD="SG.your-copied-api-key"
   ```

### Resend設定（代替案）

1. **Resendアカウント作成**
   - https://resend.com にアクセス
   - 無料アカウントを作成（月3,000通まで無料）

2. **APIキー取得**
   - ダッシュボード → API Keys
   - 「Create API Key」をクリック

3. **環境変数設定**
   ```bash
   SMTP_HOST="smtp.resend.com"
   SMTP_PORT="587"
   SMTP_USER="resend"
   SMTP_PASSWORD="re_your-api-key"
   ```

---

## 🗄️ データベース設定詳細

### Vercel Postgres（推奨）

1. **Vercelダッシュボード**
   - プロジェクト → Storage → Create Database
   - Postgres を選択

2. **接続情報取得**
   - 作成後、「.env.local」タブをクリック
   - `DATABASE_URL` をコピー

3. **環境変数設定**
   ```bash
   DATABASE_URL="postgres://default:password@host:5432/verceldb?sslmode=require"
   ```

### Supabase設定

1. **Supabaseプロジェクト作成**
   - https://supabase.com にアクセス
   - 新しいプロジェクトを作成

2. **接続情報取得**
   - Settings → Database
   - Connection string をコピー

3. **環境変数設定**
   ```bash
   DATABASE_URL="postgresql://postgres:password@host:5432/postgres?sslmode=require"
   ```

---

## 👤 管理者アカウント設定

### デフォルト設定
```bash
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
ADMIN_EMAIL="admin@money-shift.jp"
```

### カスタム設定（推奨）
```bash
ADMIN_USERNAME="your-username"
ADMIN_PASSWORD="your-secure-password"
ADMIN_EMAIL="your-email@money-shift.jp"
```

**パスワード要件**:
- 8文字以上
- 英数字を含む
- 特殊文字推奨

---

## 🔐 セキュリティ設定

### NEXTAUTH_SECRET生成
```bash
# 方法1: OpenSSL
openssl rand -base64 32

# 方法2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 方法3: オンラインツール
# https://generate-secret.vercel.app/32
```

### 環境変数の安全な管理
- 本番環境とステージング環境で異なる値を使用
- APIキーは定期的に更新
- 不要になった環境変数は削除

---

## 📋 Vercel設定手順

### 1. 環境変数追加
1. Vercelダッシュボード → プロジェクト選択
2. Settings → Environment Variables
3. 以下の変数を追加:

```bash
# 必須項目
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-secret-key
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-smtp-password

# オプション項目
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_EMAIL=admin@money-shift.jp
```

### 2. 環境別設定
- **Production**: 本番用の値
- **Preview**: テスト用の値
- **Development**: 開発用の値

### 3. 設定確認
- 「Save」後、自動的に再デプロイが実行される
- ログでエラーがないか確認

---

## ✅ 設定チェックリスト

### データベース
- [ ] `DATABASE_URL` が正しく設定されている
- [ ] データベースに接続できる
- [ ] マイグレーションが実行されている

### 認証
- [ ] `NEXTAUTH_SECRET` が32文字以上
- [ ] 管理画面にログインできる

### メール
- [ ] SMTP設定が正しい
- [ ] テストメール送信が成功する
- [ ] 送信元ドメインが認証されている

### セキュリティ
- [ ] 本番環境でデフォルトパスワードを変更
- [ ] APIキーが適切に設定されている
- [ ] 不要な環境変数が削除されている

---

## 🚨 トラブルシューティング

### よくあるエラー

#### 1. データベース接続エラー
```
Error: P1001: Can't reach database server
```
**解決方法**:
- `DATABASE_URL` の形式を確認
- データベースサーバーが起動しているか確認
- ファイアウォール設定を確認

#### 2. SMTP認証エラー
```
Error: Invalid login: 535 Authentication failed
```
**解決方法**:
- APIキーが正しいか確認
- SMTP設定を再確認
- 送信元ドメインの認証状態を確認

#### 3. NextAuth設定エラー
```
Error: Please define a NEXTAUTH_SECRET environment variable
```
**解決方法**:
- `NEXTAUTH_SECRET` が設定されているか確認
- 32文字以上の文字列か確認

---

## 📞 サポート情報

**プロジェクト**: msmedia32's projects  
**ドメイン**: money-shift.jp  
**メール**: shift@money-shift.jp  

**参考リンク**:
- [Vercel環境変数ドキュメント](https://vercel.com/docs/concepts/projects/environment-variables)
- [NextAuth.js設定ガイド](https://next-auth.js.org/configuration/options)
- [SendGrid設定ガイド](https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs)
