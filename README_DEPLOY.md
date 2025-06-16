
# Vercelデプロイ手順書

このドキュメントでは、オウンドメディアサイトをVercelにデプロイする手順を詳しく説明します。

## 📋 事前準備

### 必要なアカウント
1. **Vercelアカウント**（無料）
2. **GitHubアカウント**（無料）
3. **メールアドレス**（確認用）

### 必要な情報
- サイトのドメイン名（例：your-site.vercel.app）
- 管理者パスワード（デフォルト：admin123）

---

## 🚀 Step 1: GitHubリポジトリの作成

### 1-1. GitHubにログイン
1. [GitHub](https://github.com)にアクセス
2. アカウントにログイン（アカウントがない場合は作成）

### 1-2. 新しいリポジトリを作成
1. 右上の「+」ボタンをクリック
2. 「New repository」を選択
3. 以下の設定を入力：
   - **Repository name**: `owned-media-site`（任意の名前）
   - **Description**: `オウンドメディアサイト`
   - **Public/Private**: Publicを選択（無料プランの場合）
   - **Initialize this repository with**: 何もチェックしない
4. 「Create repository」をクリック

### 1-3. プロジェクトファイルをアップロード
1. 作成されたリポジトリページで「uploading an existing file」をクリック
2. プロジェクトフォルダ内の全ファイルをドラッグ&ドロップ
   - **重要**: `.env`ファイルは含めないでください
3. コミットメッセージに「Initial commit」と入力
4. 「Commit changes」をクリック

---

## 🌐 Step 2: Vercelアカウントの作成とプロジェクト設定

### 2-1. Vercelアカウント作成
1. [Vercel](https://vercel.com)にアクセス
2. 「Sign Up」をクリック
3. 「Continue with GitHub」を選択
4. GitHubアカウントでログイン
5. Vercelの利用規約に同意

### 2-2. プロジェクトのインポート
1. Vercelダッシュボードで「New Project」をクリック
2. 「Import Git Repository」セクションで作成したリポジトリを選択
3. 「Import」をクリック

### 2-3. プロジェクト設定
1. **Project Name**: サイト名を入力（例：`my-media-site`）
2. **Framework Preset**: 「Next.js」が自動選択されることを確認
3. **Root Directory**: そのまま（変更不要）
4. **Build and Output Settings**: そのまま（変更不要）

---

## 🗄️ Step 3: データベースの設定

### 3-1. Vercel Postgresの追加
1. Vercelダッシュボードでプロジェクトを選択
2. 「Storage」タブをクリック
3. 「Create Database」をクリック
4. 「Postgres」を選択
5. データベース名を入力（例：`media-db`）
6. リージョンを選択（日本の場合：`Tokyo (nrt1)`）
7. 「Create」をクリック

### 3-2. データベース接続情報の取得
1. 作成されたデータベースをクリック
2. 「Settings」タブを選択
3. 「Connection Pooling」セクションで接続情報を確認
4. 「Copy Snippet」で`DATABASE_URL`をコピー

---

## ⚙️ Step 4: 環境変数の設定

### 4-1. 環境変数の追加
1. プロジェクトの「Settings」タブをクリック
2. 「Environment Variables」を選択
3. 以下の環境変数を追加：

#### DATABASE_URL
- **Name**: `DATABASE_URL`
- **Value**: Step 3-2でコピーした接続文字列
- **Environment**: Production, Preview, Development全てにチェック

#### NEXTAUTH_URL
- **Name**: `NEXTAUTH_URL`
- **Value**: `https://your-project-name.vercel.app`（実際のドメインに変更）
- **Environment**: Production, Preview, Development全てにチェック

#### NEXTAUTH_SECRET
- **Name**: `NEXTAUTH_SECRET`
- **Value**: ランダムな文字列（32文字以上推奨）
  ```
  例：a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
  ```
- **Environment**: Production, Preview, Development全てにチェック

#### NEXT_PUBLIC_APP_URL
- **Name**: `NEXT_PUBLIC_APP_URL`
- **Value**: `https://your-project-name.vercel.app`（実際のドメインに変更）
- **Environment**: Production, Preview, Development全てにチェック

### 4-2. 設定の保存
1. 各環境変数を追加後、「Save」をクリック
2. 全ての環境変数が正しく設定されていることを確認

---

## 🚀 Step 5: デプロイの実行

### 5-1. 初回デプロイ
1. 「Deployments」タブをクリック
2. 「Deploy」ボタンをクリック（環境変数設定後に自動実行される場合もあります）
3. ビルドプロセスを待機（通常2-5分）

### 5-2. デプロイ状況の確認
1. ビルドログを確認
2. 「Ready」ステータスになるまで待機
3. エラーが発生した場合は、[トラブルシューティング](#troubleshooting)を参照

---

## 🗃️ Step 6: データベースの初期化

### 6-1. Prismaマイグレーションの実行
1. Vercelダッシュボードで「Functions」タブを選択
2. 以下のコマンドを実行（Vercel CLIまたはGitHub Actionsを使用）：
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### 6-2. データベース確認
1. Vercel Postgresダッシュボードで「Data」タブを確認
2. テーブルが正しく作成されていることを確認
3. サンプル記事データが投入されていることを確認

---

## 🌍 Step 7: ドメインの設定（オプション）

### 7-1. カスタムドメインの追加
1. 「Settings」タブの「Domains」セクションを選択
2. 「Add Domain」をクリック
3. 独自ドメインを入力（例：`www.your-site.com`）
4. DNS設定の指示に従ってドメインを設定

### 7-2. SSL証明書の確認
1. ドメイン設定後、SSL証明書が自動発行されることを確認
2. HTTPSでアクセスできることを確認

---

## 🔐 Step 8: 管理画面の設定

### 8-1. 管理画面へのアクセス
1. デプロイされたサイトにアクセス
2. URLの末尾に`/admin`を追加（例：`https://your-site.vercel.app/admin`）
3. ログイン画面が表示されることを確認

### 8-2. 初回ログイン
- **ユーザー名**: `admin`
- **パスワード**: `admin123`

### 8-3. パスワードの変更（推奨）
1. 管理画面にログイン後、セキュリティのためパスワード変更を検討
2. 新しいパスワードのハッシュ値を生成し、データベースを更新

---

## ✅ Step 9: 動作確認

### 9-1. フロントエンド確認
- [ ] トップページが正常に表示される
- [ ] 記事一覧が表示される
- [ ] 記事詳細ページが表示される
- [ ] カテゴリページが表示される
- [ ] ニュースレター登録が動作する

### 9-2. 管理画面確認
- [ ] 管理画面にログインできる
- [ ] 記事一覧が表示される
- [ ] 記事の作成・編集ができる
- [ ] ニュースレター配信ができる
- [ ] 購読者管理ができる

### 9-3. 自動機能確認
- [ ] 記事の自動更新（6時間ごと）
- [ ] ニュースレターの自動配信
- [ ] アクセス解析の記録

---

## 🎉 完了！

おめでとうございます！オウンドメディアサイトのデプロイが完了しました。

### 次のステップ
1. **コンテンツの追加**: 管理画面から記事を追加
2. **デザインのカスタマイズ**: 必要に応じてデザインを調整
3. **SEO設定**: メタタグやサイトマップの設定
4. **アナリティクス**: Google Analyticsの設定
5. **定期的なバックアップ**: データベースのバックアップ設定

### サポート
- 技術的な問題: [Vercelサポート](https://vercel.com/support)
- プロジェクト固有の問題: トラブルシューティングガイドを参照

---

## 📞 緊急時の連絡先

### Vercelサポート
- ドキュメント: https://vercel.com/docs
- コミュニティ: https://github.com/vercel/vercel/discussions
- サポートチケット: https://vercel.com/support

### 重要な注意事項
- 管理者パスワードは必ず変更してください
- 定期的にデータベースのバックアップを取ってください
- セキュリティアップデートを定期的に確認してください
