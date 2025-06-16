
# Vercelデプロイ チェックリスト

## 📋 デプロイ前の最終確認

### ✅ ファイル確認
- [ ] `vercel.json` が作成されている
- [ ] `.env.example` が作成されている
- [ ] `.gitignore` が適切に設定されている
- [ ] `package.json` にVercel用スクリプトが追加されている
- [ ] `prisma/schema.prisma` がVercel用に最適化されている

### ✅ 設定確認
- [ ] NextAuth.jsに`NEXTAUTH_SECRET`設定が追加されている
- [ ] データベース接続設定が環境変数を使用している
- [ ] 画像の最適化設定が有効になっている
- [ ] TypeScriptエラーが無視される設定になっている

### ✅ セキュリティ確認
- [ ] `.env`ファイルが`.gitignore`に含まれている
- [ ] 本番用パスワードが設定されている
- [ ] 機密情報がコードに直接書かれていない
- [ ] 管理者認証が正しく設定されている

---

## 🚀 デプロイ手順（簡易版）

### 1. GitHubリポジトリ作成
```bash
# 1. GitHub.comで新しいリポジトリを作成
# 2. プロジェクトファイルをアップロード
```

### 2. Vercelプロジェクト作成
```bash
# 1. vercel.com でアカウント作成
# 2. GitHubリポジトリをインポート
# 3. プロジェクト設定を確認
```

### 3. データベース設定
```bash
# 1. Vercel Postgres を作成
# 2. DATABASE_URL を取得
# 3. 環境変数に設定
```

### 4. 環境変数設定
```bash
DATABASE_URL=postgres://...
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

### 5. デプロイ実行
```bash
# 自動的にデプロイが開始されます
# ビルドログを確認してエラーがないことを確認
```

### 6. データベース初期化
```bash
# Vercel CLI または GitHub Actions で実行
npx prisma migrate deploy
npx prisma db seed
```

---

## 🔧 トラブルシューティング

### よくある問題
1. **ビルドエラー**: `TROUBLESHOOTING.md` を参照
2. **データベース接続エラー**: `DATABASE_SETUP.md` を参照
3. **認証エラー**: 環境変数の設定を確認

### サポート
- 詳細手順: `README_DEPLOY.md`
- データベース設定: `DATABASE_SETUP.md`
- 問題解決: `TROUBLESHOOTING.md`

---

## 📞 緊急時連絡先

- **Vercelサポート**: https://vercel.com/support
- **ドキュメント**: https://vercel.com/docs
- **コミュニティ**: https://github.com/vercel/vercel/discussions

---

## 🎉 デプロイ完了後の確認

### フロントエンド
- [ ] トップページが表示される
- [ ] 記事一覧が表示される
- [ ] カテゴリページが動作する
- [ ] ニュースレター登録が動作する

### 管理画面
- [ ] `/admin` でログイン画面が表示される
- [ ] 管理者でログインできる
- [ ] 記事管理が動作する
- [ ] ニュースレター配信が動作する

### 自動機能
- [ ] 記事の自動更新（6時間ごと）
- [ ] ニュースレターの自動配信
- [ ] アクセス解析の記録

すべて確認できたら、デプロイ完了です！🎉
