#!/usr/bin/env node

/**
 * Test script to validate dependency update configuration
 */

const fs = require('fs');
const path = require('path');

function testConfigurationFiles() {
  const results = [];
  
  // Test 1: Check if .github directory exists
  const githubDir = path.join(__dirname, '..', '.github');
  if (fs.existsSync(githubDir)) {
    results.push('✅ .github directory exists');
  } else {
    results.push('❌ .github directory missing');
    return results;
  }
  
  // Test 2: Check if dependabot.yml exists and has required content
  const dependabotFile = path.join(githubDir, 'dependabot.yml');
  if (fs.existsSync(dependabotFile)) {
    const content = fs.readFileSync(dependabotFile, 'utf8');
    if (content.includes('package-ecosystem: "npm"') && 
        content.includes('interval: "monthly"')) {
      results.push('✅ dependabot.yml configured correctly');
    } else {
      results.push('❌ dependabot.yml missing required configuration');
    }
  } else {
    results.push('❌ dependabot.yml missing');
  }
  
  // Test 3: Check if workflows directory exists
  const workflowsDir = path.join(githubDir, 'workflows');
  if (fs.existsSync(workflowsDir)) {
    results.push('✅ workflows directory exists');
  } else {
    results.push('❌ workflows directory missing');
  }
  
  // Test 4: Check if monthly-updates.yml exists
  const workflowFile = path.join(workflowsDir, 'monthly-updates.yml');
  if (fs.existsSync(workflowFile)) {
    const content = fs.readFileSync(workflowFile, 'utf8');
    if (content.includes('Monthly Dependency Updates') && 
        content.includes('cron:')) {
      results.push('✅ monthly-updates.yml configured correctly');
    } else {
      results.push('❌ monthly-updates.yml missing required configuration');
    }
  } else {
    results.push('❌ monthly-updates.yml missing');
  }
  
  // Test 5: Check documentation
  const docsFile = path.join(githubDir, 'DEPENDENCY_UPDATES.md');
  if (fs.existsSync(docsFile)) {
    results.push('✅ Documentation file exists');
  } else {
    results.push('❌ Documentation file missing');
  }
  
  return results;
}

// Run tests
console.log('🧪 Testing Dependency Update Configuration\n');
const results = testConfigurationFiles();

results.forEach(result => console.log(result));

const hasErrors = results.some(result => result.startsWith('❌'));
if (!hasErrors) {
  console.log('\n🎉 All tests passed! Monthly dependency updates are configured correctly.');
  process.exit(0);
} else {
  console.log('\n💥 Some tests failed. Please check the configuration.');
  process.exit(1);
}