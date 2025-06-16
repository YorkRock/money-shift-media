
# 🚀 Vercelデプロイ クイックスタート

**所要時間**: 約30分  
**対象**: システム知識がない方向け

---

## 📱 Step 1: アカウント準備（5分）

### GitHub アカウント
1. [GitHub.com](https://github.com) にアクセス
2. 「Sign up」でアカウント作成
3. メール認証を完了

### Vercel アカウント
1. [Vercel.com](https://vercel.com) にアクセス
2. 「Sign Up」をクリック
3. 「Continue with GitHub」を選択
4. GitHubアカウントでログイン

---

## 📁 Step 2: プロジェクトアップロード（10分）

### GitHubリポジトリ作成
1. GitHubで「New repository」をクリック
2. リポジトリ名: `my-media-site`（任意）
3. 「Public」を選択
4. 「Create repository」をクリック

### ファイルアップロード
1. 「uploading an existing file」をクリック
2. プロジェクトフォルダの**全ファイル**をドラッグ&ドロップ
   - ⚠️ `.env`ファイルは**含めない**でください
3. 「Commit changes」をクリック

---

## 🌐 Step 3: Vercelプロジェクト作成（5分）

1. Vercelダッシュボードで「New Project」をクリック
2. 作成したGitHubリポジトリを選択
3. 「Import」をクリック
4. プロジェクト名を入力（例: `my-media-site`）
5. 「Deploy」をクリック（一旦失敗しますが問題ありません）

---

## 🗄️ Step 4: データベース作成（5分）

1. Vercelプロジェクトで「Storage」タブをクリック
2. 「Create Database」→「Postgres」を選択
3. データベース名: `media-db`
4. リージョン: `Tokyo (nrt1)`
5. 「Create」をクリック
6. 作成後、「Settings」で`DATABASE_URL`をコピー

---

## ⚙️ Step 5: 環境変数設定（5分）

1. 「Settings」→「Environment Variables」を選択
2. 以下の4つの環境変数を追加：

### DATABASE_URL
- **Name**: `DATABASE_URL`
- **Value**: Step 4でコピーした接続文字列
- **Environment**: 全てにチェック

### NEXTAUTH_URL
- **Name**: `NEXTAUTH_URL`
- **Value**: `https://your-project-name.vercel.app`
- **Environment**: 全てにチェック

### NEXTAUTH_SECRET
- **Name**: `NEXTAUTH_SECRET`
- **Value**: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`
- **Environment**: 全てにチェック

### NEXT_PUBLIC_APP_URL
- **Name**: `NEXT_PUBLIC_APP_URL`
- **Value**: `https://your-project-name.vercel.app`
- **Environment**: 全てにチェック

3. 各環境変数を追加後、「Save」をクリック

---

## 🚀 Step 6: 再デプロイ（自動）

環境変数設定後、自動的に再デプロイが開始されます。

1. 「Deployments」タブでビルド状況を確認
2. 「Ready」になるまで待機（2-3分）
3. エラーが出た場合は `TROUBLESHOOTING.md` を参照

---

## ✅ Step 7: 動作確認

### サイト確認
1. デプロイ完了後、サイトURLをクリック
2. トップページが表示されることを確認
3. 記事一覧が表示されることを確認

### 管理画面確認
1. URLの末尾に `/admin` を追加
2. ログイン画面が表示されることを確認
3. 以下でログイン：
   - **ユーザー名**: `admin`
   - **パスワード**: `admin123`

---

## 🎉 完了！

おめでとうございます！オウンドメディアサイトのデプロイが完了しました。

### 次にやること
1. **記事の追加**: 管理画面から新しい記事を作成
2. **パスワード変更**: セキュリティのため管理者パスワードを変更
3. **ドメイン設定**: 独自ドメインを設定（オプション）

### 困った時は
- **詳細手順**: `README_DEPLOY.md`
- **問題解決**: `TROUBLESHOOTING.md`
- **データベース**: `DATABASE_SETUP.md`

---

## 📞 サポート

問題が発生した場合：
1. エラーメッセージをコピー
2. `TROUBLESHOOTING.md` で解決方法を確認
3. 解決しない場合は [Vercelサポート](https://vercel.com/support) に連絡

**重要**: 管理者パスワード（`admin123`）は必ず変更してください！
