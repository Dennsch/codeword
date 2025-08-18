// Simple test to verify the basic functionality
const { execSync } = require('child_process');

console.log('🔍 Testing implementation...');

try {
  // Check if TypeScript compiles without errors
  console.log('📝 Checking TypeScript compilation...');
  execSync('npx tsc --noEmit', { cwd: '/workspace', stdio: 'pipe' });
  console.log('✅ TypeScript compilation successful');
  
  // Run tests
  console.log('🧪 Running tests...');
  const testOutput = execSync('npm test -- --watchAll=false --verbose', { 
    cwd: '/workspace', 
    stdio: 'pipe',
    timeout: 30000
  }).toString();
  
  console.log('✅ Tests completed successfully');
  console.log('Test output:', testOutput);
  
} catch (error) {
  console.log('❌ Error occurred:');
  console.log('Error message:', error.message);
  if (error.stdout) {
    console.log('STDOUT:', error.stdout.toString());
  }
  if (error.stderr) {
    console.log('STDERR:', error.stderr.toString());
  }
}