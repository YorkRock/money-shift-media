
const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
  connectionString: "postgresql://role_150054d58b:4J9rbGF3Cvw0WEXSheMCmv2zB6np9Vo9@db-150054d58b.db001.hosteddb.reai.io:5432/150054d58b"
});

// Read and parse the seed data
function parseSeedData() {
  const seedContent = fs.readFileSync('./lib/seed-data.ts', 'utf8');
  
  // Extract the sampleArticles array
  const startMarker = 'const sampleArticles = [';
  const endMarker = ']';
  
  const startIndex = seedContent.indexOf(startMarker);
  const endIndex = seedContent.lastIndexOf(endMarker);
  
  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Could not find sampleArticles array in seed data');
  }
  
  // Extract the array content
  const arrayContent = seedContent.substring(startIndex + startMarker.length, endIndex);
  
  // Parse individual articles
  const articles = [];
  const articleBlocks = arrayContent.split('  },').filter(block => block.trim());
  
  articleBlocks.forEach((block, index) => {
    try {
      // Add closing brace if not the last item
      const articleText = block.trim() + (index < articleBlocks.length - 1 ? '  }' : '');
      
      // Extract fields using regex
      const titleMatch = articleText.match(/title:\s*'([^']+)'/);
      const slugMatch = articleText.match(/slug:\s*'([^']+)'/);
      const categoryMatch = articleText.match(/category:\s*"([^"]+)"/);
      const excerptMatch = articleText.match(/excerpt:\s*'([^']+)'/);
      const authorMatch = articleText.match(/author:\s*'([^']+)'/) || { 1: '編集部' };
      const imageUrlMatch = articleText.match(/imageUrl:\s*'([^']+)'/);
      const viewCountMatch = articleText.match(/viewCount:\s*(\d+)/) || { 1: '0' };
      
      // Extract content (more complex due to multiline)
      const contentMatch = articleText.match(/content:\s*`([^`]+)`/s);
      
      if (titleMatch && slugMatch && categoryMatch && excerptMatch && contentMatch) {
        articles.push({
          title: titleMatch[1],
          slug: slugMatch[1],
          category: categoryMatch[1],
          excerpt: excerptMatch[1],
          content: contentMatch[1],
          author: authorMatch[1],
          imageUrl: imageUrlMatch ? imageUrlMatch[1] : null,
          viewCount: parseInt(viewCountMatch[1]) || 0,
          tags: ['記事', 'ニュース'],
          isPublished: true
        });
      }
    } catch (error) {
      console.log(`Error parsing article ${index}:`, error.message);
    }
  });
  
  return articles;
}

async function restoreArticles() {
  try {
    await client.connect();
    console.log('Connected to database');
    
    // Clear existing articles
    await client.query('DELETE FROM articles');
    console.log('Cleared existing articles');
    
    // Parse seed data
    const articles = parseSeedData();
    console.log(`Parsed ${articles.length} articles from seed data`);
    
    // Insert articles
    let insertedCount = 0;
    for (const article of articles) {
      try {
        const query = `
          INSERT INTO articles (id, title, slug, content, excerpt, category, author, "imageUrl", tags, "isPublished", "viewCount", "publishedAt", "updatedAt")
          VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
        `;
        
        await client.query(query, [
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
        
        insertedCount++;
        if (insertedCount % 10 === 0) {
          console.log(`Inserted ${insertedCount} articles...`);
        }
      } catch (error) {
        console.log(`Error inserting article "${article.title}":`, error.message);
      }
    }
    
    console.log(`Successfully inserted ${insertedCount} articles`);
    
    // Verify insertion
    const result = await client.query('SELECT COUNT(*) FROM articles');
    console.log('Total articles in database:', result.rows[0].count);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

restoreArticles();
