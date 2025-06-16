
'use client'

import { WSJSidebar } from './wsj-sidebar'

interface WSJLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
}

export function WSJLayout({ children, showSidebar = true }: WSJLayoutProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* WSJ風のコンテナ */}
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className={`grid gap-6 ${showSidebar ? 'md:grid-cols-[65%_35%] lg:grid-cols-[70%_30%]' : 'grid-cols-1'}`}>
          {/* メインコンテンツエリア */}
          <main className="min-w-0">
            {children}
          </main>
          
          {/* サイドバー */}
          {showSidebar && (
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <WSJSidebar />
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
