
import Link from 'next/link'
import { Calculator, TrendingUp, PiggyBank, Target } from 'lucide-react'

const simulators = [
  {
    name: '積立投資計算機',
    description: '毎月の積立額から将来の資産額を計算します。複利効果を考慮した長期投資のシミュレーションが可能です。',
    href: '/money/simulators/savings',
    icon: PiggyBank,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    features: ['毎月積立額の設定', '期間・利回りの調整', '複利効果の可視化']
  },
  {
    name: '複利計算機',
    description: '複利効果を活用した資産成長をシミュレーションします。初期投資額と利回りから将来価値を算出します。',
    href: '/money/simulators/compound',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    features: ['初期投資額の設定', '年利・期間の調整', '成長グラフの表示']
  },
  {
    name: '退職金計算機',
    description: '退職時の必要資金と準備計画を算出します。現在の年齢と目標退職年齢から逆算した投資計画を提案します。',
    href: '/money/simulators/retirement',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    features: ['退職年齢の設定', '必要資金の算出', '月額積立額の提案']
  },
  {
    name: 'ライフプラン設計',
    description: '人生設計に基づいた総合的な資産計画を作成します。結婚、出産、住宅購入などのライフイベントを考慮します。',
    href: '/money/simulators/lifeplan',
    icon: Calculator,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    features: ['ライフイベントの設定', '総合的な資金計画', '時系列での資産推移']
  }
]

export default function SimulatorsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            投資シミュレーター
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            あなたの投資計画を数値で確認。無料で使える4つのシミュレーションツールで、理想的な資産形成プランを設計しましょう。
          </p>
        </div>

        {/* Simulators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {simulators.map((simulator) => {
            const Icon = simulator.icon
            return (
              <Link key={simulator.name} href={simulator.href}>
                <div className="rounded-lg overflow-hidden hover-lift cursor-pointer h-full border border-[#eaeaea] bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* タイトル部分 - 黒背景、白文字 */}
                  <div className="bg-black p-6">
                    <div className="flex items-center space-x-4">
                      <Icon className="h-10 w-10 text-white flex-shrink-0" />
                      <h2 className="text-xl font-bold text-white">
                        {simulator.name}
                      </h2>
                    </div>
                  </div>

                  {/* 本文部分 - 白背景 */}
                  <div className="bg-white p-6">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {simulator.description}
                    </p>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 mb-3">主な機能</h3>
                      <ul className="space-y-2">
                        {simulator.features.map((feature, index) => (
                          <li key={index} className="text-gray-600 pl-2">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <span className="inline-flex items-center text-black font-medium">
                        シミュレーションを開始 →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              シミュレーション結果の活用方法
            </h2>
            <p className="text-gray-600 mb-6">
              各シミュレーターで算出された結果は、あくまで参考値です。実際の投資には市場リスクが伴いますので、
              複数のシナリオを検討し、リスク許容度に応じた投資判断を行ってください。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-gray-900 mb-2">📊 複数シナリオ</h3>
                <p className="text-gray-600">楽観・標準・悲観の3パターンで検討</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-gray-900 mb-2">⚖️ リスク管理</h3>
                <p className="text-gray-600">リスク許容度に応じた資産配分</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold text-gray-900 mb-2">🔄 定期見直し</h3>
                <p className="text-gray-600">年1回の計画見直しを推奨</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
