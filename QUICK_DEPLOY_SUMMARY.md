
# 🚀 money-shift.jp ワンクリックデプロイガイド

## 📋 設定済み項目

✅ **ドメイン**: money-shift.jp  
✅ **プロジェクト**: msmedia32's projects  
✅ **メール**: shift@money-shift.jp  
✅ **全機能**: 実装・テスト完了  

---

## ⚡ 30分でデプロイ完了

### 1. 必要なサービス準備（10分）

#### データベース（Vercel Postgres推奨）
1. Vercelダッシュボード → Storage → Create Database → Postgres
2. 接続文字列をコピー

#### メール送信（SendGrid推奨）
1. https://sendgrid.com でアカウント作成
2. Settings → API Keys → Create API Key
3. APIキーをコピー

### 2. Vercelデプロイ（15分）

#### プロジェクトインポート
1. Vercelダッシュボード → New Project
2. GitHubリポジトリ選択
3. プロジェクト名: `msmedia32-money-shift`

#### 環境変数設定（必須4項目のみ）
```bash
DATABASE_URL="postgres://..."          # Vercel Postgresから
NEXTAUTH_SECRET="$(openssl rand -base64 32)"  # ターミナルで生成
SMTP_HOST="smtp.sendgrid.net"
SMTP_PASSWORD="SG.your-api-key"       # SendGridから
```

#### ドメイン設定
1. Settings → Domains → Add `money-shift.jp`
2. DNS設定でVercelのCNAMEを指定

### 3. 動作確認（5分）

- [ ] https://money-shift.jp でサイト表示
- [ ] https://money-shift.jp/admin/login でログイン（admin/admin123）
- [ ] 管理画面からテストメール送信

---

## 🎯 デプロイ後すぐに利用可能

### 📰 メディア機能
- 記事管理・公開システム
- カテゴリ別記事表示
- 検索・タグ機能
- 6時間ごと自動記事更新

### 💰 投資ツール
- 複利計算シミュレーター
- ライフプランシミュレーター  
- 退職金シミュレーター
- 積立投資シミュレーター

### 📧 メルマガ機能
- 購読者管理システム
- 配信スケジュール設定
- 自動配信システム
- 配信ログ・分析

### 🔧 管理機能
- 記事作成・編集・削除
- メルマガ配信管理
- 購読者管理
- アクセス分析

---

## 🔐 セキュリティ

**デフォルト管理者**:
- ユーザー名: admin
- パスワード: admin123
- メール: admin@money-shift.jp

⚠️ **本番環境では必ずパスワード変更**

---

## 📞 サポート

**運営**: msmedia32's projects  
**メール**: shift@money-shift.jp  
**ドメイン**: money-shift.jp  

---

## 🎊 完了！

設定完了後、https://money-shift.jp で本格的なメディアサイトが即座に利用可能になります。

**自動機能も即座に開始**:
- 記事自動更新（6時間ごと）
- メルマガ自動配信（スケジュール通り）
- データベース自動管理

🚀 **デプロイ成功をお祈りしています！**
