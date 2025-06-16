
# トラブルシューティングガイド

このドキュメントでは、Vercelデプロイ時によく発生する問題とその解決方法を説明します。

## 🚨 緊急時の対応

### サイトが表示されない場合
1. **Vercelダッシュボード**で「Deployments」を確認
2. **最新のデプロイ**が「Ready」状態か確認
3. **エラーログ**を確認
4. **環境変数**が正しく設定されているか確認

---

## 🔧 ビルドエラー

### Error: Build failed
**症状**: デプロイ時にビルドが失敗する

#### 原因1: 依存関係の問題
```
Error: Cannot resolve module 'xxx'
```
**解決方法**:
1. `package.json`の依存関係を確認
2. 不足しているパッケージを追加：
   ```bash
   yarn add missing-package-name
   ```
3. GitHubにプッシュして再デプロイ

#### 原因2: TypeScriptエラー
```
Error: Type 'xxx' is not assignable to type 'yyy'
```
**解決方法**:
1. `next.config.js`で型チェックを無効化（既に設定済み）
2. 型エラーを修正してプッシュ

#### 原因3: 環境変数の不足
```
Error: Environment variable 'XXX' is not defined
```
**解決方法**:
1. Vercelダッシュボードで「Settings」→「Environment Variables」
2. 不足している環境変数を追加
3. 再デプロイを実行

---

## 🗄️ データベースエラー

### Error: P1001 - Can't reach database server
**症状**: データベースに接続できない

**解決方法**:
1. **DATABASE_URLの確認**:
   ```
   postgres://username:password@hostname:port/database?sslmode=require
   ```
2. **環境変数の再設定**:
   - Vercelダッシュボードで`DATABASE_URL`を確認
   - 正しい接続文字列に更新
3. **SSL接続の確認**:
   - 接続文字列に`?sslmode=require`が含まれているか確認

### Error: P3009 - Migration failed
**症状**: データベースマイグレーションが失敗する

**解決方法**:
1. **データベースのリセット**:
   ```bash
   npx prisma migrate reset
   npx prisma migrate deploy
   ```
2. **手動でテーブル削除**:
   - Vercel Postgresダッシュボードで既存テーブルを削除
   - マイグレーションを再実行

### Error: P2002 - Unique constraint failed
**症状**: 重複データエラー

**解決方法**:
1. **既存データの確認**:
   ```sql
   SELECT * FROM articles WHERE slug = 'duplicate-slug';
   ```
2. **重複データの削除**:
   ```sql
   DELETE FROM articles WHERE id = 'duplicate-id';
   ```
3. **シードスクリプトの修正**

---

## 🔐 認証エラー

### Error: NextAuth configuration error
**症状**: 管理画面にログインできない

#### 原因1: NEXTAUTH_URLの設定ミス
**解決方法**:
1. 環境変数`NEXTAUTH_URL`を確認
2. 正しいドメインに設定：
   ```
   https://your-project-name.vercel.app
   ```

#### 原因2: NEXTAUTH_SECRETの不足
**解決方法**:
1. ランダムな文字列を生成：
   ```bash
   openssl rand -base64 32
   ```
2. 環境変数`NEXTAUTH_SECRET`に設定

#### 原因3: パスワードハッシュの問題
**症状**: 正しいパスワードでもログインできない

**解決方法**:
1. **新しいパスワードハッシュを生成**:
   ```javascript
   const bcrypt = require('bcryptjs');
   const hash = bcrypt.hashSync('your-new-password', 12);
   console.log(hash);
   ```
2. **認証ファイルを更新**:
   - `app/api/auth/[...nextauth]/route.ts`のハッシュ値を更新

---

## 📧 メール配信エラー

### Error: Newsletter delivery failed
**症状**: ニュースレターが配信されない

#### 原因1: 購読者データの問題
**解決方法**:
1. **購読者データの確認**:
   ```sql
   SELECT * FROM subscribers WHERE isActive = true;
   ```
2. **無効なメールアドレスの削除**

#### 原因2: コンテンツの問題
**解決方法**:
1. **HTMLコンテンツの確認**
2. **文字エンコーディングの確認**
3. **画像URLの確認**

---

## 🌐 ドメインエラー

### Error: Domain verification failed
**症状**: カスタムドメインが設定できない

**解決方法**:
1. **DNS設定の確認**:
   - CNAMEレコードが正しく設定されているか
   - TTL値が適切か（推奨：300秒）
2. **DNS伝播の待機**:
   - 設定後24-48時間待機
3. **DNS確認ツールの使用**:
   ```bash
   nslookup your-domain.com
   dig your-domain.com
   ```

### Error: SSL certificate generation failed
**症状**: SSL証明書が発行されない

**解決方法**:
1. **ドメイン所有権の確認**
2. **DNS設定の再確認**
3. **Vercelサポートに連絡**

---

## ⚡ パフォーマンス問題

### 症状: サイトの読み込みが遅い

#### 原因1: 画像の最適化不足
**解決方法**:
1. **Next.js Imageコンポーネントの使用確認**
2. **画像サイズの最適化**
3. **WebP形式の使用**

#### 原因2: データベースクエリの最適化不足
**解決方法**:
1. **インデックスの追加**:
   ```sql
   CREATE INDEX idx_articles_category ON articles(category);
   CREATE INDEX idx_articles_published ON articles(publishedAt);
   ```
2. **クエリの最適化**
3. **キャッシュの実装**

#### 原因3: バンドルサイズの問題
**解決方法**:
1. **Bundle Analyzerの使用**:
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```
2. **不要なライブラリの削除**
3. **動的インポートの使用**

---

## 🔄 自動機能エラー

### Error: Cron job failed
**症状**: 自動記事更新や配信が動作しない

#### 原因1: Vercel Cronの設定問題
**解決方法**:
1. **vercel.jsonの確認**:
   ```json
   {
     "crons": [
       {
         "path": "/api/cron/update-articles",
         "schedule": "0 */6 * * *"
       }
     ]
   }
   ```
2. **APIエンドポイントの確認**
3. **ログの確認**

#### 原因2: API制限
**解決方法**:
1. **レート制限の確認**
2. **APIキーの確認**
3. **代替APIの検討**

---

## 🛠️ 一般的な解決手順

### 1. ログの確認
```bash
# Vercelダッシュボードでログを確認
# Functions → View Function Logs
```

### 2. 環境変数の再確認
```bash
# 必要な環境変数一覧
DATABASE_URL
NEXTAUTH_URL
NEXTAUTH_SECRET
NEXT_PUBLIC_APP_URL
```

### 3. 再デプロイの実行
```bash
# GitHubに空コミットをプッシュ
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

### 4. キャッシュのクリア
```bash
# Vercelダッシュボードで
# Settings → Functions → Clear Cache
```

---

## 📞 サポート連絡先

### Vercel公式サポート
- **ドキュメント**: https://vercel.com/docs
- **コミュニティ**: https://github.com/vercel/vercel/discussions
- **サポートチケット**: https://vercel.com/support
- **ステータスページ**: https://vercel-status.com

### 緊急時の対応手順
1. **エラーメッセージをコピー**
2. **ログを確認・保存**
3. **環境変数を再確認**
4. **このガイドで解決方法を検索**
5. **解決しない場合はVercelサポートに連絡**

---

## 🔍 デバッグ用コマンド

### ローカル環境での確認
```bash
# 依存関係のインストール
yarn install

# ローカルサーバーの起動
yarn dev

# ビルドテスト
yarn build

# データベース接続テスト
npx prisma db pull
```

### 本番環境での確認
```bash
# Vercel CLIでログ確認
vercel logs

# 環境変数の確認
vercel env ls

# デプロイ状況の確認
vercel ls
```

---

## ✅ 問題解決チェックリスト

問題が発生した際の確認手順：

- [ ] エラーメッセージを正確に記録
- [ ] Vercelダッシュボードでデプロイ状況を確認
- [ ] 環境変数が正しく設定されているか確認
- [ ] データベース接続が正常か確認
- [ ] 最新のコードがGitHubにプッシュされているか確認
- [ ] ブラウザのキャッシュをクリア
- [ ] 別のブラウザ・デバイスで確認
- [ ] このガイドで該当する解決方法を試行
- [ ] 必要に応じてVercelサポートに連絡

問題が解決しない場合は、エラーメッセージとログを添えてVercelサポートにお問い合わせください。
