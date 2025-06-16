
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Target, Calendar, ArrowLeft } from 'lucide-react'

export default function RetirementSimulatorPage() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [monthlyExpenses, setMonthlyExpenses] = useState(300000)
  const [currentSavings, setCurrentSavings] = useState(1000000)
  const [annualReturn, setAnnualReturn] = useState(5)
  const [result, setResult] = useState<any>(null)

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge
    const yearsInRetirement = 25 // 平均的な退職後期間
    const totalRetirementNeeds = monthlyExpenses * 12 * yearsInRetirement
    
    // 現在の貯蓄の将来価値
    const currentSavingsFutureValue = currentSavings * Math.pow(1 + annualReturn / 100, yearsToRetirement)
    
    // 不足額
    const shortfall = Math.max(0, totalRetirementNeeds - currentSavingsFutureValue)
    
    // 必要な月額積立額
    const monthlyReturn = annualReturn / 100 / 12
    const totalMonths = yearsToRetirement * 12
    const requiredMonthlySavings = shortfall > 0 
      ? shortfall / (((1 + monthlyReturn) ** totalMonths - 1) / monthlyReturn)
      : 0
    
    setResult({
      yearsToRetirement,
      totalRetirementNeeds,
      currentSavingsFutureValue: Math.round(currentSavingsFutureValue),
      shortfall: Math.round(shortfall),
      requiredMonthlySavings: Math.round(requiredMonthlySavings),
      isOnTrack: shortfall <= 0
    })
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Target className="h-16 w-16 text-purple-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            退職金計算機
          </h1>
          <p className="text-xl text-gray-600">
            退職時の必要資金と準備計画を算出
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>退職プランを入力</CardTitle>
              <CardDescription>
                現在の状況と退職後の計画を設定してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentAge">現在の年齢</Label>
                  <Input
                    id="currentAge"
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    min="20"
                    max="70"
                  />
                </div>
                <div>
                  <Label htmlFor="retirementAge">退職予定年齢</Label>
                  <Input
                    id="retirementAge"
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    min="50"
                    max="80"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="monthlyExpenses">退職後の月額生活費（円）</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  min="100000"
                  step="10000"
                />
              </div>
              
              <div>
                <Label htmlFor="currentSavings">現在の貯蓄額（円）</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  min="0"
                  step="100000"
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
                  max="15"
                  step="0.1"
                />
              </div>
              
              <Button onClick={calculateRetirement} className="w-full">
                計算する
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>退職プラン診断</CardTitle>
              <CardDescription>
                {retirementAge}歳で退職し、25年間の生活を想定した場合
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${result.isOnTrack ? 'text-green-600' : 'text-red-600'}`}>
                      {result.isOnTrack ? '✓ 順調です' : '⚠ 対策が必要'}
                    </div>
                    <div className="text-gray-600">退職準備状況</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">退職まで</span>
                      <span className="font-semibold">{result.yearsToRetirement}年</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-50 rounded">
                      <span className="text-gray-600">必要総額</span>
                      <span className="font-semibold">{result.totalRetirementNeeds.toLocaleString()}円</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded">
                      <span className="text-gray-600">現在貯蓄の将来価値</span>
                      <span className="font-semibold">{result.currentSavingsFutureValue.toLocaleString()}円</span>
                    </div>
                    {result.shortfall > 0 && (
                      <div className="flex justify-between p-3 bg-red-50 rounded">
                        <span className="text-gray-600">不足額</span>
                        <span className="font-semibold text-red-600">{result.shortfall.toLocaleString()}円</span>
                      </div>
                    )}
                  </div>
                  
                  {result.requiredMonthlySavings > 0 && (
                    <div className="bg-purple-50 p-4 rounded">
                      <h3 className="font-semibold text-gray-900 mb-2">推奨アクション</h3>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          月額 {result.requiredMonthlySavings.toLocaleString()}円
                        </div>
                        <div className="text-sm text-gray-600">追加積立が必要です</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 p-4 rounded">
                    <h3 className="font-semibold text-gray-900 mb-2">アドバイス</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {result.isOnTrack ? (
                        <>
                          <li>• 現在のペースを維持してください</li>
                          <li>• 定期的に計画を見直しましょう</li>
                          <li>• インフレ率も考慮に入れてください</li>
                        </>
                      ) : (
                        <>
                          <li>• 積立額の増額を検討してください</li>
                          <li>• 退職年齢の延長も選択肢です</li>
                          <li>• 生活費の見直しも効果的です</li>
                        </>
                      )}
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
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            投資シミュレーターTOPに戻る
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">📅 早期準備</h3>
              <p className="text-sm text-gray-600">
                退職準備は早ければ早いほど有利。時間を味方につけましょう。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">💰 公的年金</h3>
              <p className="text-sm text-gray-600">
                国民年金・厚生年金も考慮して、より正確な計画を立てましょう。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">🔄 定期見直し</h3>
              <p className="text-sm text-gray-600">
                ライフステージの変化に応じて、定期的に計画を見直すことが大切です。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
