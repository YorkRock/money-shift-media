
# 記事生成スケジュール設定ガイド

## 概要
このガイドでは、記事の自動生成・更新を1日3回（日本時間6:00、11:30、18:00）に設定する方法について説明します。

## 現在の記事生成API
- **エンドポイント**: `/api/seed`
- **メソッド**: POST
- **機能**: データベースに新しい記事を生成・追加

## スケジュール設定方法

### 1. 外部Cronジョブの設定
Next.jsアプリケーション自体にはcronスケジューラーは含まれていないため、外部のスケジューラーを使用する必要があります。

#### A. サーバー上でのcron設定（Linux/Unix）
```bash
# crontabを編集
crontab -e

# 以下の行を追加（JST時間をUTCに変換）
# 日本時間6:00 = UTC 21:00（前日）
0 21 * * * curl -X POST http://localhost:3000/api/seed

# 日本時間11:30 = UTC 2:30
30 2 * * * curl -X POST http://localhost:3000/api/seed

# 日本時間18:00 = UTC 9:00
0 9 * * * curl -X POST http://localhost:3000/api/seed
```

#### B. Vercel Cron Jobs（Vercelにデプロイする場合）
`vercel.json`ファイルを作成：
```json
{
  "crons": [
    {
      "path": "/api/seed",
      "schedule": "0 21 * * *"
    },
    {
      "path": "/api/seed",
      "schedule": "30 2 * * *"
    },
    {
      "path": "/api/seed",
      "schedule": "0 9 * * *"
    }
  ]
}
```

#### C. GitHub Actions（GitHub Actionsを使用する場合）
`.github/workflows/article-generation.yml`ファイルを作成：
```yaml
name: Article Generation
on:
  schedule:
    # 日本時間6:00 (UTC 21:00 前日)
    - cron: '0 21 * * *'
    # 日本時間11:30 (UTC 2:30)
    - cron: '30 2 * * *'
    # 日本時間18:00 (UTC 9:00)
    - cron: '0 9 * * *'

jobs:
  generate-articles:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Article Generation
        run: |
          curl -X POST ${{ secrets.SITE_URL }}/api/seed
```

### 2. 時間帯の説明
- **6:00 JST**: 朝の通勤時間に合わせた記事配信
- **11:30 JST**: 昼休み前の情報チェック時間
- **18:00 JST**: 夕方の帰宅時間に合わせた記事配信

### 3. 注意事項
1. **タイムゾーン**: 日本時間（JST）をUTC時間に変換する必要があります（JST = UTC + 9時間）
2. **API制限**: 記事生成APIが適切にレート制限を処理していることを確認してください
3. **エラーハンドリング**: スケジューラーがAPIエラーを適切に処理できるようにしてください
4. **ログ記録**: 記事生成の成功/失敗をログに記録することを推奨します

### 4. 実装例（Node.js + node-cron）
アプリケーション内でスケジューリングを行う場合：

```javascript
// lib/scheduler.js
const cron = require('node-cron');

// 日本時間6:00 (UTC 21:00 前日)
cron.schedule('0 21 * * *', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/seed', {
      method: 'POST'
    });
    console.log('Morning articles generated:', response.status);
  } catch (error) {
    console.error('Error generating morning articles:', error);
  }
});

// 日本時間11:30 (UTC 2:30)
cron.schedule('30 2 * * *', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/seed', {
      method: 'POST'
    });
    console.log('Midday articles generated:', response.status);
  } catch (error) {
    console.error('Error generating midday articles:', error);
  }
});

// 日本時間18:00 (UTC 9:00)
cron.schedule('0 9 * * *', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/seed', {
      method: 'POST'
    });
    console.log('Evening articles generated:', response.status);
  } catch (error) {
    console.error('Error generating evening articles:', error);
  }
});
```

## 推奨事項
1. 本番環境では外部のcronサービス（Vercel Cron、AWS EventBridge、Google Cloud Schedulerなど）を使用することを推奨します
2. 記事生成の重複を避けるため、APIに適切な重複チェック機能を実装してください
3. 定期的にスケジューラーの動作を監視し、ログを確認してください
