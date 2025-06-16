
#!/bin/bash

# cronジョブ設定スクリプト
# 日本時間での自動実行を設定

echo "🔧 cronジョブの設定を開始します..."

# 現在のcrontabを保存
crontab -l > /tmp/current_cron 2>/dev/null || echo "" > /tmp/current_cron

# 新しいcronジョブを追加
cat << 'EOF' >> /tmp/current_cron

# オウンドメディア自動化設定 (UTC時間で設定、JST-9時間)
# 記事更新: 毎日 6:00, 11:30, 17:30 JST = 21:00, 02:30, 08:30 UTC (前日/当日)
0 21 * * * curl -X GET -H "Authorization: Bearer your-cron-secret-key" http://localhost:3000/api/cron/scheduler >/dev/null 2>&1
30 2 * * * curl -X GET -H "Authorization: Bearer your-cron-secret-key" http://localhost:3000/api/cron/scheduler >/dev/null 2>&1
30 8 * * * curl -X GET -H "Authorization: Bearer your-cron-secret-key" http://localhost:3000/api/cron/scheduler >/dev/null 2>&1

# メルマガ配信: 毎朝 7:00 JST = 22:00 UTC (前日)
0 22 * * * curl -X GET -H "Authorization: Bearer your-cron-secret-key" http://localhost:3000/api/cron/scheduler >/dev/null 2>&1

# 毎分チェック（開発・テスト用）
# * * * * * curl -X GET -H "Authorization: Bearer your-cron-secret-key" http://localhost:3000/api/cron/scheduler >/dev/null 2>&1

EOF

# 重複を削除
sort /tmp/current_cron | uniq > /tmp/new_cron

# 新しいcrontabを設定
crontab /tmp/new_cron

# 一時ファイルを削除
rm /tmp/current_cron /tmp/new_cron

echo "✅ cronジョブの設定が完了しました"
echo ""
echo "📅 設定されたスケジュール (日本時間):"
echo "  - 記事更新: 毎日 6:00, 11:30, 17:30"
echo "  - メルマガ配信: 毎朝 7:00"
echo ""
echo "🔍 現在のcrontab設定:"
crontab -l | grep -E "(cron|scheduler)" || echo "  設定されたジョブが見つかりません"
echo ""
echo "⚠️  注意: 本番環境では CRON_SECRET 環境変数を適切に設定してください"
