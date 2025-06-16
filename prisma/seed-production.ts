
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting production seed for money-shift.jp...')

  // 環境変数から管理者情報を取得（デフォルト値あり）
  const adminUsername = process.env.ADMIN_USERNAME || 'admin'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@money-shift.jp'

  // 管理者アカウントの作成
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  
  const admin = await prisma.admin.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      password: hashedPassword,
      email: adminEmail,
      name: '管理者'
    }
  })

  console.log('✅ Admin user created:', admin.username)

  // サンプル記事の作成（money-shift.jp向けにカスタマイズ）
  const sampleArticles = [
    {
      title: 'ビジネス戦略の新潮流：デジタル変革の最前線',
      slug: 'digital-transformation-business-strategy',
      content: `
        <h2>デジタル変革がもたらすビジネスの変化</h2>
        <p>現代のビジネス環境において、デジタル変革（DX）は単なる技術導入を超えた戦略的取り組みとなっています。企業が持続的な成長を実現するためには、従来のビジネスモデルを根本から見直し、デジタル技術を活用した新しい価値創造が不可欠です。</p>
        
        <h3>成功企業の共通点</h3>
        <p>デジタル変革に成功している企業には、以下のような共通点があります：</p>
        <ul>
          <li>経営層のコミットメントと明確なビジョン</li>
          <li>データドリブンな意思決定プロセス</li>
          <li>アジャイルな組織運営</li>
          <li>継続的な学習と改善の文化</li>
        </ul>

        <h3>実装のポイント</h3>
        <p>効果的なデジタル変革を実現するためには、技術的な側面だけでなく、組織文化や人材育成にも注力する必要があります。特に、従業員のデジタルリテラシー向上と、変化に対応できる柔軟な組織構造の構築が重要です。</p>

        <p><strong>SHIFT編集部より：</strong> デジタル変革は一朝一夕では実現できません。長期的な視点で取り組むことが成功の鍵となります。</p>
      `,
      excerpt: 'デジタル変革の最前線で活躍する企業の戦略と成功要因を詳しく解説します。',
      category: 'BUSINESS',
      author: 'SHIFT編集部',
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['デジタル変革', 'ビジネス戦略', 'DX', '企業経営']
    },
    {
      title: 'AI技術の最新動向：2025年の注目トレンド',
      slug: 'ai-technology-trends-2025',
      content: `
        <h2>AI技術の急速な進歩</h2>
        <p>2025年は人工知能（AI）技術にとって画期的な年となっています。生成AI、機械学習、深層学習の分野で次々と革新的な技術が登場し、ビジネスや日常生活に大きな影響を与えています。</p>
        
        <h3>注目すべき技術トレンド</h3>
        <p>今年特に注目されているAI技術には以下があります：</p>
        <ul>
          <li>マルチモーダルAI：テキスト、画像、音声を統合処理</li>
          <li>エッジAI：デバイス上でのリアルタイム処理</li>
          <li>説明可能AI：判断プロセスの透明性向上</li>
          <li>自律型AI：人間の介入を最小限に抑えた自動化</li>
        </ul>

        <h3>産業への影響</h3>
        <p>これらの技術は製造業、医療、金融、教育など様々な分野で実用化が進んでおり、業務効率の向上や新しいサービスの創出に貢献しています。</p>

        <p><strong>SHIFT編集部より：</strong> AI技術の進歩は目覚ましく、私たちの生活を大きく変える可能性を秘めています。最新動向を追い続けることが重要です。</p>
      `,
      excerpt: '2025年のAI技術の最新動向と産業への影響について詳しく分析します。',
      category: 'TECHNOLOGY',
      author: 'SHIFT編集部',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['AI', '人工知能', '機械学習', 'テクノロジー']
    },
    {
      title: '投資初心者のための資産運用ガイド：2025年版',
      slug: 'investment-guide-for-beginners-2025',
      content: `
        <h2>資産運用の基本原則</h2>
        <p>投資を始める際に最も重要なのは、基本原則を理解することです。リスクとリターンの関係、分散投資の重要性、長期投資の効果など、成功する投資家が実践している原則を学びましょう。</p>
        
        <h3>投資商品の種類</h3>
        <p>初心者におすすめの投資商品：</p>
        <ul>
          <li>インデックスファンド：市場全体に分散投資</li>
          <li>ETF：上場投資信託で流動性が高い</li>
          <li>個別株式：企業分析力を身につけたい方に</li>
          <li>債券：安定した収益を求める方に</li>
        </ul>

        <h3>リスク管理の重要性</h3>
        <p>投資において最も重要なのはリスク管理です。自分のリスク許容度を正しく把握し、それに応じたポートフォリオを構築することが長期的な成功につながります。</p>

        <h3>2025年の投資環境</h3>
        <p>現在の経済環境では、インフレ対策と長期的な資産形成の両立が重要です。分散投資を基本としながら、成長性の高い分野への投資も検討しましょう。</p>

        <p><strong>SHIFT編集部より：</strong> 投資は長期的な視点が重要です。当サイトの投資シミュレーターもぜひご活用ください。</p>
      `,
      excerpt: '投資初心者が知っておくべき資産運用の基本と2025年の実践的なアドバイスを提供します。',
      category: 'MONEY',
      author: 'SHIFT編集部',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['投資', '資産運用', '初心者', 'ポートフォリオ']
    },
    {
      title: 'ワークライフバランスを実現する時間管理術',
      slug: 'work-life-balance-time-management',
      content: `
        <h2>現代人の時間管理の課題</h2>
        <p>リモートワークの普及により、仕事とプライベートの境界が曖昧になっている現代。効果的な時間管理術を身につけることで、生産性を向上させながら充実したプライベート時間を確保することが可能です。</p>
        
        <h3>効果的な時間管理テクニック</h3>
        <p>実践的な時間管理手法：</p>
        <ul>
          <li>ポモドーロ・テクニック：25分集中＋5分休憩</li>
          <li>タイムブロッキング：予定をブロック単位で管理</li>
          <li>優先順位マトリックス：重要度と緊急度で分類</li>
          <li>デジタルデトックス：定期的なスマホ断ち</li>
        </ul>

        <h3>習慣化のコツ</h3>
        <p>新しい時間管理術を習慣化するためには、小さな変化から始めて徐々に拡大していくことが重要です。完璧を求めず、継続することを最優先に考えましょう。</p>

        <h3>リモートワーク時代の工夫</h3>
        <p>在宅勤務が増える中で、オンとオフの切り替えがより重要になっています。物理的な環境の整備と、メンタル面での切り替えの両方を意識しましょう。</p>

        <p><strong>SHIFT編集部より：</strong> 時間管理は個人差があります。自分に合った方法を見つけることが最も重要です。</p>
      `,
      excerpt: '効果的な時間管理術でワークライフバランスを実現する方法を詳しく解説します。',
      category: 'LIFE',
      author: 'SHIFT編集部',
      imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80',
      tags: ['時間管理', 'ワークライフバランス', '生産性', '習慣化']
    },
    {
      title: 'SHIFT投資シミュレーター活用ガイド',
      slug: 'shift-investment-simulator-guide',
      content: `
        <h2>投資シミュレーターの活用方法</h2>
        <p>SHIFTでは、投資初心者から上級者まで活用できる各種シミュレーターを提供しています。これらのツールを使って、リスクを取らずに投資戦略を検証してみましょう。</p>
        
        <h3>利用可能なシミュレーター</h3>
        <p>当サイトで提供している投資シミュレーター：</p>
        <ul>
          <li>複利計算シミュレーター：長期投資の効果を実感</li>
          <li>ライフプランシミュレーター：人生設計と資産形成</li>
          <li>退職金シミュレーター：老後資金の計画立案</li>
          <li>積立投資シミュレーター：定期積立の効果検証</li>
        </ul>

        <h3>シミュレーター活用のコツ</h3>
        <p>シミュレーターを効果的に活用するためには、現実的な数値を入力することが重要です。過度に楽観的な想定ではなく、保守的な見積もりから始めることをお勧めします。</p>

        <h3>実際の投資への応用</h3>
        <p>シミュレーション結果を参考に、実際の投資戦略を立てる際は、リスク許容度や投資期間を十分に考慮しましょう。</p>

        <p><strong>SHIFT編集部より：</strong> シミュレーターは投資の第一歩として最適なツールです。ぜひ積極的にご活用ください。</p>
      `,
      excerpt: 'SHIFT投資シミュレーターの効果的な活用方法と投資戦略への応用について解説します。',
      category: 'MONEY',
      author: 'SHIFT編集部',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      tags: ['投資シミュレーター', 'ツール', '資産運用', 'SHIFT']
    }
  ]

  for (const article of sampleArticles) {
    const created = await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article
    })
    console.log(`✅ Article created: ${created.title}`)
  }

  console.log('🎉 Production seed completed successfully for money-shift.jp!')
  console.log(`📧 Admin email: ${adminEmail}`)
  console.log(`👤 Admin username: ${adminUsername}`)
  console.log('🔐 Please change the default password after first login!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
