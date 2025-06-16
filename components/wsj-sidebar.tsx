
'use client'

import { AccessRanking } from './access-ranking'
import Link from 'next/link'

export function WSJSidebar() {
  return (
    <div className="space-y-6">
      {/* アクセスランキング */}
      <div className="bg-white p-3 border-t-2 border-red-600 shadow-sm">
        <AccessRanking />
      </div>
      
      {/* ニュースレター登録（WSJ風） */}
      <div className="bg-gray-50 p-3 border border-gray-200 shadow-sm">
        <div className="text-center">
          <h3 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">
            Newsletter
          </h3>
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            毎朝7時に厳選された最新記事3本をお届け
          </p>
          <Link href="/newsletter">
            <button className="w-full bg-black text-white text-xs font-medium py-2 px-3 hover:bg-gray-800 transition-colors uppercase tracking-wide">
              Subscribe
            </button>
          </Link>
        </div>
      </div>
      
      {/* 投資シミュレーター（WSJ風） */}
      <div className="bg-white p-3 border border-gray-200 shadow-sm">
        <h3 className="text-sm font-bold text-black mb-2 border-b border-gray-200 pb-1 uppercase tracking-wide">
          Tools
        </h3>
        <div className="space-y-1.5">
          <Link href="/money/simulators" className="block text-xs text-blue-600 hover:text-blue-800 transition-colors">
            投資シミュレーター
          </Link>
          <Link href="/money/simulators/compound" className="block text-xs text-gray-600 hover:text-blue-600 transition-colors">
            複利計算
          </Link>
          <Link href="/money/simulators/retirement" className="block text-xs text-gray-600 hover:text-blue-600 transition-colors">
            退職金計算
          </Link>
        </div>
      </div>
      
      {/* 広告スペース（WSJ風） */}
      <div className="bg-gray-50 border border-gray-200 p-3 text-center shadow-sm">
        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Advertisement</div>
        <div className="bg-white border border-gray-300 h-40 flex items-center justify-center">
          <span className="text-gray-400 text-sm">広告スペース</span>
        </div>
      </div>
    </div>
  )
}
