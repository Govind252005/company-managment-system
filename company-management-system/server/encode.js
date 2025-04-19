console.log(encodeURIComponent("@GovindA0325#"));

const sql = require('./db')

;(async () => {
  try {
    // quick sanity check
    await sql`SELECT 1`
    console.log('✅ Successfully connected!')
  } catch (err) {
    console.error('❌ Connection error:', err)
  } finally {
    await sql.end()
  }
})()