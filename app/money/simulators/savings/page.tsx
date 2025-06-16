
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PiggyBank, TrendingUp, ArrowLeft } from 'lucide-react'

export default function SavingsSimulatorPage() {
  const [monthlyAmount, setMonthlyAmount] = useState(50000)
  const [years, setYears] = useState(20)
  const [annualReturn, setAnnualReturn] = useState(5)
  const [result, setResult] = useState<any>(null)

  const calculateSavings = () => {
    const monthlyReturn = annualReturn / 100 / 12
    const totalMonths = years * 12
    
    // 積立投資の将来価値計算（年金現価係数の逆）
    const futureValue = monthlyAmount * (((1 + monthlyReturn) ** totalMonths - 1) / monthlyReturn)
    const totalInvestment = monthlyAmount * totalMonths
    const profit = futureValue - totalInvestment
    
    setResult({
      futureValue: Math.round(futureValue),
      totalInvestment,
      profit: Math.round(profit),
      profitRate: ((profit / totalInvestment) * 100).toFixed(1)
    })
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <PiggyBank className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            積立投資計算機
          </h1>
          <p className="text-xl text-gray-600">
            毎月の積立額から将来の資産額を計算します
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>投資条件を入力</CardTitle>
              <CardDescription>
                毎月の積立額、投資期間、期待利回りを設定してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="monthlyAmount">毎月の積立額（円）</Label>
                <Input
                  id="monthlyAmount"
                  type="number"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                  min="1000"
                  step="1000"
                />
              </div>
              
              <div>
                <Label htmlFor="years">投資期間（年）</Label>
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  min="1"
                  max="50"
                />
              </div>
              
              <div>
                <Label htmlFor="annualReturn">期待年利回り（%）</Label>
                <Input
                  id="annualReturn"
                  type="number"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  min="0"
                  max="20"
                  step="0.1"
                />
              </div>
              
              <Button onClick={calculateSavings} className="w-full">
                計算する
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>シミュレーション結果</CardTitle>
              <CardDescription>
                {years}年間、毎月{monthlyAmount.toLocaleString()}円を年利{annualReturn}%で運用した場合
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {result.futureValue.toLocaleString()}円
                    </div>
                    <div className="text-gray-600">最終資産額</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded">
                      <div className="text-xl font-semibold text-gray-900">
                        {result.totalInvestment.toLocaleString()}円
                      </div>
                      <div className="text-sm text-gray-600">投資元本</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded">
                      <div className="text-xl font-semibold text-green-600">
                        +{result.profit.toLocaleString()}円
                      </div>
                      <div className="text-sm text-gray-600">運用益</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <TrendingUp className="h-5 w-5" />
                      <span className="font-semibold">
                        利益率: +{result.profitRate}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded">
                    <h3 className="font-semibold text-gray-900 mb-2">ポイント</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 複利効果により元本を大きく上回る成果</li>
                      <li>• 長期投資ほど複利効果が大きくなります</li>
                      <li>• 実際の運用では市場変動があります</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  左側の条件を入力して「計算する」ボタンを押してください
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Back to Top Link */}
        <div className="mt-8 mb-8 text-center">
          <Link 
            href="/money/simulators" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            投資シミュレーターTOPに戻る
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">💡 投資のコツ</h3>
              <p className="text-sm text-gray-600">
                少額でも継続することが重要。時間を味方につけて複利効果を最大化しましょう。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">📊 リスク管理</h3>
              <p className="text-sm text-gray-600">
                分散投資でリスクを抑えながら、安定した成長を目指すことが大切です。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 目標設定</h3>
              <p className="text-sm text-gray-600">
                明確な目標金額と期間を設定することで、モチベーションを維持できます。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
