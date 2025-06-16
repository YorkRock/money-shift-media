
const { Client } = require('pg');
const crypto = require('crypto');
// 追加記事データ
const extendedArticles = [
  {
    title: 'メタバース市場が2025年に3000億ドル突破。企業の仮想空間活用が本格化',
    slug: 'metaverse-market-2025',
    content: `メタバース市場が急速な成長を続けており、2025年には市場規模が3000億ドルを突破する見込みだ。企業の仮想空間活用が本格化し、リモートワーク、教育、エンターテインメント分野での導入が加速している。

## 企業活用の本格化

大手企業がメタバース空間での会議やイベント開催を積極的に導入している。特に、グローバル企業では地理的制約を超えたコラボレーションツールとして活用が進んでいる。

仮想オフィス空間では、従来のビデオ会議では実現できない自然な交流が可能になり、チームの結束力向上に寄与している。また、新入社員研修や製品デモンストレーションでの活用も拡大している。

## 技術革新と課題

VR/ARデバイスの性能向上により、より没入感の高い体験が可能になった。一方で、プライバシー保護やデジタル格差の問題も浮上している。

今後は、より直感的なインターフェースの開発と、セキュリティ対策の強化が重要な課題となる。また、メタバース内での経済活動に関する法整備も急務だ。`,
    excerpt: 'メタバース市場が急速な成長を続けており、2025年には市場規模が3000億ドルを突破する見込みだ。企業の仮想空間活用が本格化し、リモートワーク、教育、エンターテインメント分野での導入が加速している。',
    category: "TECHNOLOGY",
    author: '編集部',
    imageUrl: 'https://static.vecteezy.com/system/resources/previews/004/939/073/original/vr-metaverse-technology-in-futuristic-concept-background-vector.jpg',
    tags: ['メタバース', 'VR', '企業活用'],
    isPublished: true,
    viewCount: 1800
  },
  {
    title: '量子コンピューター実用化が加速。IBM、Google、Microsoftが競争激化',
    slug: 'quantum-computing-race',
    content: `量子コンピューターの実用化競争が激化している。IBM、Google、Microsoftが次世代量子プロセッサの開発を加速し、2025年中に商用レベルでの実用化を目指している。

## 技術的ブレークスルー

量子エラー訂正技術の進歩により、実用的な量子計算が現実的になった。特に、暗号解読、薬物発見、金融モデリング分野での応用が期待されている。

IBMの最新量子プロセッサは1000量子ビットを超える性能を実現し、従来のスーパーコンピューターでは解決困難な問題の解決が可能になった。

## 産業への影響

製薬業界では新薬開発期間の大幅短縮が期待され、金融業界ではリスク計算の精度向上が見込まれている。また、AI分野でも機械学習の高速化に貢献する可能性がある。

一方で、現在の暗号技術が無効化される可能性もあり、新たなセキュリティ対策の開発が急務となっている。`,
    excerpt: '量子コンピューターの実用化競争が激化している。IBM、Google、Microsoftが次世代量子プロセッサの開発を加速し、2025年中に商用レベルでの実用化を目指している。',
    category: "TECHNOLOGY",
    author: '編集部',
    imageUrl: 'https://img.freepik.com/premium-photo/futuristic-quantum-computing-circuitry_1046319-53437.jpg?w=2000',
    tags: ['量子コンピューター', 'IBM', 'Google'],
    isPublished: true,
    viewCount: 2200
  },
  {
    title: 'ESG投資が主流化。2025年の運用資産は50兆ドルに到達予定',
    slug: 'esg-investment-mainstream',
    content: `ESG（環境・社会・ガバナンス）投資が投資の主流となり、2025年の運用資産総額は50兆ドルに達する見込みだ。機関投資家の9割がESG要素を投資判断に組み込んでいる。

## 投資戦略の変化

従来の財務指標に加えて、環境負荷、社会貢献度、企業統治の質が重要な投資判断基準となっている。特に、カーボンニュートラル達成企業への投資が急増している。

年金基金や保険会社などの機関投資家が、長期的な持続可能性を重視した投資戦略にシフトしている。これにより、ESG評価の高い企業の株価が上昇傾向にある。

## 企業への影響

企業はESG評価向上のため、環境対策、労働環境改善、透明性の高い経営に積極的に取り組んでいる。これが新たな競争優位の源泉となっている。

一方で、グリーンウォッシュ（見せかけの環境配慮）への批判も高まっており、実質的な取り組みが求められている。`,
    excerpt: 'ESG（環境・社会・ガバナンス）投資が投資の主流となり、2025年の運用資産総額は50兆ドルに達する見込みだ。機関投資家の9割がESG要素を投資判断に組み込んでいる。',
    category: "MONEY",
    author: '編集部',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['ESG投資', '持続可能性', '機関投資家'],
    isPublished: true,
    viewCount: 1600
  },
  {
    title: 'リモートワーク定着で地方移住が加速。東京一極集中に変化の兆し',
    slug: 'remote-work-rural-migration',
    content: `リモートワークの定着により、地方移住を選択する人が急増している。2024年の地方移住者数は前年比40%増となり、東京一極集中の構造に変化の兆しが見えている。

## 移住先の多様化

従来の軽井沢や湘南といった定番エリアに加えて、北海道、九州、四国などの遠隔地への移住も増加している。高速インターネット環境の整備が移住先選択の重要な要因となっている。

特に、IT関連職種の従事者の移住が目立っており、地方でのコワーキングスペースやサテライトオフィスの需要が急増している。

## 地方経済への影響

移住者の増加により、地方の消費活動が活性化している。また、都市部の高いスキルを持つ人材が地方に流入することで、地域産業の高度化も進んでいる。

一方で、住宅価格の上昇や地域コミュニティとの摩擦といった課題も浮上している。持続可能な地方創生のためには、移住者と地域住民の共生が重要だ。`,
    excerpt: 'リモートワークの定着により、地方移住を選択する人が急増している。2024年の地方移住者数は前年比40%増となり、東京一極集中の構造に変化の兆しが見えている。',
    category: "LIFE",
    author: '編集部',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['リモートワーク', '地方移住', '働き方改革'],
    isPublished: true,
    viewCount: 2800
  },
  {
    title: 'サステナブルファッションが急成長。循環型経済への転換が加速',
    slug: 'sustainable-fashion-growth',
    content: `サステナブルファッション市場が急成長を続けており、2025年の市場規模は200億ドルに達する見込みだ。消費者の環境意識の高まりにより、循環型経済への転換が加速している。

## 消費者意識の変化

特に若い世代を中心に、ファッションアイテムの環境負荷を重視する傾向が強まっている。リサイクル素材の使用、フェアトレード、動物愛護などが購入判断の重要な要素となっている。

レンタルファッションサービスの利用者も急増しており、所有から利用へのシフトが進んでいる。これにより、ファッション業界のビジネスモデルが根本的に変化している。

## 技術革新の進展

バイオ素材、リサイクル繊維、3Dプリンティングなどの技術革新により、環境負荷の少ない製品開発が可能になった。また、ブロックチェーン技術を活用したサプライチェーンの透明化も進んでいる。

大手ファッションブランドも持続可能性を重視した戦略にシフトしており、業界全体の変革が進んでいる。`,
    excerpt: 'サステナブルファッション市場が急成長を続けており、2025年の市場規模は200億ドルに達する見込みだ。消費者の環境意識の高まりにより、循環型経済への転換が加速している。',
    category: "LIFE",
    author: '編集部',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['サステナブル', 'ファッション', '循環型経済'],
    isPublished: true,
    viewCount: 1400
  },
  {
    title: 'デジタル通貨の普及が加速。中央銀行デジタル通貨（CBDC）の実証実験が本格化',
    slug: 'digital-currency-cbdc',
    content: `中央銀行デジタル通貨（CBDC）の実証実験が世界各国で本格化している。日本銀行も2025年中にパイロットプログラムを開始予定で、デジタル通貨の普及が加速している。

## 各国の取り組み状況

中国のデジタル人民元は既に一部地域で実用化されており、欧州中央銀行もデジタルユーロの開発を進めている。アメリカも連邦準備制度理事会がデジタルドルの研究を加速している。

これらの取り組みにより、国際送金の効率化、金融包摂の促進、マネーロンダリング対策の強化が期待されている。

## 金融システムへの影響

CBDCの導入により、従来の銀行システムが大きく変化する可能性がある。決済の即時性、コスト削減、透明性の向上が実現される一方で、プライバシー保護や金融安定性の課題もある。

民間の暗号資産との共存や、国際的な相互運用性の確保も重要な検討事項となっている。`,
    excerpt: '中央銀行デジタル通貨（CBDC）の実証実験が世界各国で本格化している。日本銀行も2025年中にパイロットプログラムを開始予定で、デジタル通貨の普及が加速している。',
    category: "MONEY",
    author: '編集部',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['CBDC', 'デジタル通貨', '中央銀行'],
    isPublished: true,
    viewCount: 1900
  },
  {
    title: 'スマートシティ構想が現実化。IoTとAIで都市機能を最適化',
    slug: 'smart-city-iot-ai',
    content: `スマートシティ構想が世界各地で現実化している。IoTセンサーとAI技術を活用した都市機能の最適化により、交通渋滞の解消、エネルギー効率の向上、住民サービスの改善が実現されている。

## 技術統合による都市改革

交通システムでは、リアルタイムデータ分析により信号制御を最適化し、渋滞を30%削減した都市もある。また、スマートグリッドによりエネルギー消費を20%削減した事例も報告されている。

公共サービスでは、AIチャットボットによる24時間対応や、予測分析による設備メンテナンスの効率化が進んでいる。

## 住民生活の向上

スマートフォンアプリを通じて、公共交通の運行状況、駐車場の空き情報、行政サービスの申請などが一元的に利用できるようになった。これにより、住民の利便性が大幅に向上している。

一方で、プライバシー保護やデジタル格差への対応が重要な課題となっている。`,
    excerpt: 'スマートシティ構想が世界各地で現実化している。IoTセンサーとAI技術を活用した都市機能の最適化により、交通渋滞の解消、エネルギー効率の向上、住民サービスの改善が実現されている。',
    category: "TECHNOLOGY",
    author: '編集部',
    imageUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['スマートシティ', 'IoT', 'AI'],
    isPublished: true,
    viewCount: 2100
  },
  {
    title: '再生可能エネルギーが電力供給の50%を突破。脱炭素社会への転換点',
    slug: 'renewable-energy-50-percent',
    content: `再生可能エネルギーによる電力供給が全体の50%を突破し、脱炭素社会への転換点を迎えている。太陽光、風力、水力発電の技術革新により、コスト競争力も大幅に向上している。

## 技術革新とコスト削減

太陽光パネルの効率が25%を超え、風力発電の大型化により発電コストが大幅に削減された。蓄電池技術の進歩により、再生可能エネルギーの安定供給も可能になった。

特に洋上風力発電の拡大が著しく、2025年には世界の風力発電容量の30%を占める見込みだ。

## 産業構造の変化

エネルギー産業の構造が根本的に変化し、従来の電力会社に加えて、新興のエネルギーテック企業が台頭している。また、企業の再生可能エネルギー調達も急増している。

グリーン水素の生産拡大により、製鉄、化学などの重工業分野でも脱炭素化が進んでいる。`,
    excerpt: '再生可能エネルギーによる電力供給が全体の50%を突破し、脱炭素社会への転換点を迎えている。太陽光、風力、水力発電の技術革新により、コスト競争力も大幅に向上している。',
    category: "BUSINESS",
    author: '編集部',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tags: ['再生可能エネルギー', '脱炭素', '太陽光発電'],
    isPublished: true,
    viewCount: 2400
  }
];

async function addArticles() {
  const client = new Client({
    connectionString: "postgresql://role_150054d58b:4J9rbGF3Cvw0WEXSheMCmv2zB6np9Vo9@db-150054d58b.db001.hosteddb.reai.io:5432/150054d58b"
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // 既存の記事数を確認
    const countResult = await client.query('SELECT COUNT(*) FROM articles');
    const currentCount = parseInt(countResult.rows[0].count);
    console.log(`Current articles in database: ${currentCount}`);

    // 追加記事を挿入
    let insertedCount = 0;
    for (const article of extendedArticles) {
      try {
        const insertQuery = `
          INSERT INTO articles (
            id, title, slug, content, excerpt, category, author, "imageUrl", tags, "isPublished", "viewCount", "publishedAt", "updatedAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
          ON CONFLICT (slug) DO NOTHING
        `;
        
        const result = await client.query(insertQuery, [
          crypto.randomUUID(),
          article.title,
          article.slug,
          article.content,
          article.excerpt,
          article.category,
          article.author,
          article.imageUrl,
          article.tags,
          article.isPublished,
          article.viewCount
        ]);
        
        if (result.rowCount > 0) {
          insertedCount++;
          console.log(`✓ Inserted: ${article.title}`);
        } else {
          console.log(`- Skipped (already exists): ${article.title}`);
        }
      } catch (error) {
        console.error(`✗ Failed to insert ${article.title}:`, error.message);
      }
    }

    // 最終的な記事数を確認
    const finalCountResult = await client.query('SELECT COUNT(*) FROM articles');
    const finalCount = parseInt(finalCountResult.rows[0].count);
    
    console.log(`\nSummary:`);
    console.log(`- Articles before: ${currentCount}`);
    console.log(`- Articles inserted: ${insertedCount}`);
    console.log(`- Articles after: ${finalCount}`);

    // カテゴリ別の記事数を表示
    const categoryResult = await client.query(`
      SELECT category, COUNT(*) as count 
      FROM articles 
      WHERE "isPublished" = true 
      GROUP BY category 
      ORDER BY category
    `);
    
    console.log('\nArticles by category:');
    categoryResult.rows.forEach(row => {
      console.log(`- ${row.category}: ${row.count} articles`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

addArticles();
