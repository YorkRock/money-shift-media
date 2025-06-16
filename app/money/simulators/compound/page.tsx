
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrendingUp, Calculator, ArrowLeft } from 'lucide-react'

export default function CompoundSimulatorPage() {
  const [initialAmount, setInitialAmount] = useState(1000000)
  const [years, setYears] = useState(10)
  const [annualReturn, setAnnualReturn] = useState(7)
  const [result, setResult] = useState<any>(null)

  const calculateCompound = () => {
    const futureValue = initialAmount * Math.pow(1 + annualReturn / 100, years)
    const profit = futureValue - initialAmount
    
    setResult({
      futureValue: Math.round(futureValue),
      initialAmount,
      profit: Math.round(profit),
      profitRate: ((profit / initialAmount) * 100).toFixed(1),
      yearlyGrowth: Array.from({ length: years }, (_, i) => {
        const year = i + 1
        const value = initialAmount * Math.pow(1 + annualReturn / 100, year)
        return {
          year,
          value: Math.round(value),
          profit: Math.round(value - initialAmount)
        }
      })
    })
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <TrendingUp className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            複利計算機
          </h1>
          <p className="text-xl text-gray-600">
            複利効果を活用した資産成長をシミュレーション
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>投資条件を入力</CardTitle>
              <CardDescription>
                初期投資額、投資期間、期待利回りを設定してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="initialAmount">初期投資額（円）</Label>
                <Input
                  id="initialAmount"
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  min="10000"
                  step="10000"
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
              
              <Button onClick={calculateCompound} className="w-full">
                計算する
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>シミュレーション結果</CardTitle>
              <CardDescription>
                {initialAmount.toLocaleString()}円を{years}年間、年利{annualReturn}%で運用した場合
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {result.futureValue.toLocaleString()}円
                    </div>
                    <div className="text-gray-600">最終資産額</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded">
                      <div className="text-xl font-semibold text-gray-900">
                        {result.initialAmount.toLocaleString()}円
                      </div>
                      <div className="text-sm text-gray-600">初期投資額</div>
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
                      <Calculator className="h-5 w-5" />
                      <span className="font-semibold">
                        利益率: +{result.profitRate}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded">
                    <h3 className="font-semibold text-gray-900 mb-2">年次推移</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {result.yearlyGrowth.slice(0, 10).map((item: any) => (
                        <div key={item.year} className="flex justify-between text-sm">
                          <span>{item.year}年後:</span>
                          <span className="font-medium">{item.value.toLocaleString()}円</span>
                        </div>
                      ))}
                    </div>
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
            className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            投資シミュレーターTOPに戻る
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">🚀 複利の力</h3>
              <p className="text-sm text-gray-600">
                アインシュタインが「人類最大の発明」と呼んだ複利効果を体感してください。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">⏰ 時間の価値</h3>
              <p className="text-sm text-gray-600">
                投資期間が長いほど複利効果は大きくなります。早期開始が成功の鍵です。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">📈 現実的な期待</h3>
              <p className="text-sm text-gray-600">
                過去の市場平均を参考に、現実的な利回りを設定することが重要です。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
