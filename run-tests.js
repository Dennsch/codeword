const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Running tests for WordPuzzleGame...\n');

// Change to the workspace directory
process.chdir('/workspace');

// Run the tests
const testProcess = spawn('npm', ['test', '--', '--watchAll=false', '--verbose'], {
  stdio: 'inherit',
  shell: true
});

testProcess.on('close', (code) => {
  console.log(`\n📊 Test process exited with code ${code}`);
  if (code === 0) {
    console.log('✅ All tests passed!');
  } else {
    console.log('❌ Some tests failed. Please check the output above.');
  }
});

testProcess.on('error', (error) => {
  console.error('❌ Error running tests:', error.message);
});