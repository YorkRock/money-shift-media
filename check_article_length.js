const fs = require('fs');

// Read the seed data file
const content = fs.readFileSync('./lib/seed-data.ts', 'utf8');

// Extract articles using regex
const articleMatches = content.match(/\{[\s\S]*?title:[\s\S]*?content: `([\s\S]*?)`[\s\S]*?\}/g);

if (!articleMatches) {
  console.log('No articles found');
  process.exit(1);
}

console.log('記事の文字数分析結果:');
console.log('='.repeat(80));

const shortArticles = [];
let articleIndex = 0;

articleMatches.forEach((articleBlock, index) => {
  // Extract title
  const titleMatch = articleBlock.match(/title: '([^']+)'/);
  const title = titleMatch ? titleMatch[1] : `記事${index + 1}`;
  
  // Extract content
  const contentMatch = articleBlock.match(/content: `([\s\S]*?)`/);
  if (contentMatch) {
    const content = contentMatch[1];
    // Remove image placeholders and clean content for counting
    const cleanContent = content
      .replace(/%%IMAGE_BREAK_\d+%%/g, '')
      .replace(/\s+/g, '')
      .replace(/#{1,6}\s*/g, ''); // Remove markdown headers
    
    const charCount = cleanContent.length;
    const status = charCount >= 1000 ? '✓ OK' : '✗ 要拡張';
    
    console.log(`${index + 1}. ${title.substring(0, 60)}...`);
    console.log(`   文字数: ${charCount} ${status}`);
    console.log('');
    
    if (charCount < 1000) {
      shortArticles.push({
        index: index + 1,
        title: title,
        charCount: charCount,
        needsExpansion: 1000 - charCount
      });
    }
  }
});

console.log('='.repeat(80));
console.log(`1,000文字未満の記事: ${shortArticles.length}/${articleMatches.length}`);
console.log('');

if (shortArticles.length > 0) {
  console.log('拡張が必要な記事一覧:');
  shortArticles.forEach(article => {
    console.log(`- ${article.title} (現在${article.charCount}文字、+${article.needsExpansion}文字必要)`);
  });
}
