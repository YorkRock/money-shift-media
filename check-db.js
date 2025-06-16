
const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://role_150054d58b:4J9rbGF3Cvw0WEXSheMCmv2zB6np9Vo9@db-150054d58b.db001.hosteddb.reai.io:5432/150054d58b"
});

async function checkDatabase() {
  try {
    await client.connect();
    console.log('Connected to database');
    
    // Check if articles table exists and count records
    const result = await client.query('SELECT COUNT(*) FROM articles');
    console.log('Number of articles in database:', result.rows[0].count);
    
    // Get sample articles
    const sampleResult = await client.query('SELECT title, category FROM articles LIMIT 5');
    console.log('Sample articles:');
    sampleResult.rows.forEach(row => {
      console.log(`- ${row.title} (${row.category})`);
    });
    
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await client.end();
  }
}

checkDatabase();
