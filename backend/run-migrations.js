const { execSync } = require('child_process');
const path = require('path');

console.log('Running database migrations...');

try {
  // Try to run migrations
  execSync(
    `node ./node_modules/typeorm/cli migration:run -d ${path.join(__dirname, 'dist', 'data-source.js')}`,
    { stdio: 'inherit', cwd: __dirname }
  );
  console.log('Migrations completed successfully');
} catch (error) {
  console.error('Migration error:', error.message);
  // Don't exit with error if no migrations found
  if (error.message.includes('No migrations') || error.message.includes('ENOENT')) {
    console.log('No migrations to run or migration files not found');
    process.exit(0);
  }
  // Exit with error for other cases
  process.exit(1);
}

