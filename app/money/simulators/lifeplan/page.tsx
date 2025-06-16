
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, Plus, Trash2, ArrowLeft } from 'lucide-react'

interface LifeEvent {
  id: string
  name: string
  age: number
  cost: number
}

export default function LifePlanSimulatorPage() {
  const [currentAge, setCurrentAge] = useState(25)
  const [currentSavings, setCurrentSavings] = useState(500000)
  const [monthlyIncome, setMonthlyIncome] = useState(400000)
  const [monthlySavings, setMonthlySavings] = useState(100000)
  const [annualReturn, setAnnualReturn] = useState(5)
  
  const [lifeEvents, setLifeEvents] = useState<LifeEvent[]>([
    { id: '1', name: '結婚', age: 30, cost: 3000000 },
    { id: '2', name: '住宅購入', age: 35, cost: 30000000 },
    { id: '3', name: '子供の教育費', age: 40, cost: 10000000 },
  ])
  
  const [result, setResult] = useState<any>(null)

  const addLifeEvent = () => {
    const newEvent: LifeEvent = {
      id: Date.now().toString(),
      name: '',
      age: currentAge + 5,
      cost: 1000000
    }
    setLifeEvents([...lifeEvents, newEvent])
  }

  const updateLifeEvent = (id: string, field: keyof LifeEvent, value: string | number) => {
    setLifeEvents(lifeEvents.map(event => 
      event.id === id ? { ...event, [field]: value } : event
    ))
  }

  const removeLifeEvent = (id: string) => {
    setLifeEvents(lifeEvents.filter(event => event.id !== id))
  }

  const calculateLifePlan = () => {
    const sortedEvents = [...lifeEvents].sort((a, b) => a.age - b.age)
    const timeline = []
    let currentAssets = currentSavings
    let totalCosts = 0
    
    for (let age = currentAge; age <= 80; age++) {
      // 年間積立額
      const yearlyContribution = monthlySavings * 12
      
      // 運用益
      currentAssets = currentAssets * (1 + annualReturn / 100) + yearlyContribution
      
      // ライフイベントのコスト
      const eventsThisYear = sortedEvents.filter(event => event.age === age)
      const yearCosts = eventsThisYear.reduce((sum, event) => sum + event.cost, 0)
      
      currentAssets -= yearCosts
      totalCosts += yearCosts
      
      timeline.push({
        age,
        assets: Math.round(currentAssets),
        events: eventsThisYear,
        yearCosts
      })
    }
    
    setResult({
      timeline: timeline.slice(0, 20), // 最初の20年分を表示
      totalCosts,
      finalAssets: Math.round(currentAssets),
      isViable: currentAssets > 0
    })
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Calculator className="h-16 w-16 text-orange-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ライフプラン設計
          </h1>
          <p className="text-xl text-gray-600">
            人生設計に基づいた総合的な資産計画を作成
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
              <CardDescription>
                現在の状況を入力してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label htmlFor="monthlyIncome">月収（円）</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  min="100000"
                  step="10000"
                />
              </div>
              
              <div>
                <Label htmlFor="monthlySavings">月額貯蓄額（円）</Label>
                <Input
                  id="monthlySavings"
                  type="number"
                  value={monthlySavings}
                  onChange={(e) => setMonthlySavings(Number(e.target.value))}
                  min="0"
                  step="10000"
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
            </CardContent>
          </Card>

          {/* Life Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                ライフイベント
                <Button onClick={addLifeEvent} size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>
                予定しているライフイベントを追加してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {lifeEvents.map((event) => (
                <div key={event.id} className="p-3 border rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <Input
                      placeholder="イベント名"
                      value={event.name}
                      onChange={(e) => updateLifeEvent(event.id, 'name', e.target.value)}
                      className="flex-1 mr-2"
                    />
                    <Button
                      onClick={() => removeLifeEvent(event.id)}
                      size="sm"
                      variant="ghost"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">年齢</Label>
                      <Input
                        type="number"
                        value={event.age}
                        onChange={(e) => updateLifeEvent(event.id, 'age', Number(e.target.value))}
                        min={currentAge}
                        max="80"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">費用（円）</Label>
                      <Input
                        type="number"
                        value={event.cost}
                        onChange={(e) => updateLifeEvent(event.id, 'cost', Number(e.target.value))}
                        min="0"
                        step="100000"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>ライフプラン診断</CardTitle>
              <CardDescription>
                設定したプランの実現可能性を診断
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={calculateLifePlan} className="w-full mb-4">
                計算する
              </Button>
              
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-2 ${result.isViable ? 'text-green-600' : 'text-red-600'}`}>
                      {result.isViable ? '✓ 実現可能' : '⚠ 見直し必要'}
                    </div>
                    <div className="text-gray-600">プラン診断結果</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-gray-50 rounded text-sm">
                      <span>総ライフイベント費用</span>
                      <span className="font-medium">{result.totalCosts.toLocaleString()}円</span>
                    </div>
                    <div className="flex justify-between p-2 bg-blue-50 rounded text-sm">
                      <span>80歳時点の資産</span>
                      <span className="font-medium">{result.finalAssets.toLocaleString()}円</span>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">年次推移（抜粋）</h3>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {result.timeline.filter((item: any) => item.events.length > 0 || item.age % 5 === 0).slice(0, 8).map((item: any) => (
                        <div key={item.age} className="flex justify-between text-xs">
                          <span>{item.age}歳:</span>
                          <span className={item.assets < 0 ? 'text-red-600' : 'text-gray-700'}>
                            {item.assets.toLocaleString()}円
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4 text-sm">
                  「計算する」ボタンを押してください
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Back to Top Link */}
        <div className="mt-8 mb-8 text-center">
          <Link 
            href="/money/simulators" 
            className="inline-flex items-center text-orange-600 hover:text-orange-800 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            投資シミュレーターTOPに戻る
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 目標設定</h3>
              <p className="text-sm text-gray-600">
                具体的なライフイベントを設定することで、より現実的な計画が立てられます。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">💡 柔軟性</h3>
              <p className="text-sm text-gray-600">
                人生は予測不可能。定期的な見直しと計画の調整が重要です。
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">📊 バランス</h3>
              <p className="text-sm text-gray-600">
                貯蓄と現在の生活のバランスを取りながら、無理のない計画を立てましょう。
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
