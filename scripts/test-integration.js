#!/usr/bin/env node

/**
 * PUYOK NFT Marketplace Integration Test Script
 * This script validates that all major components are working correctly
 */

const { createClient } = require('@supabase/supabase-js')
const { ethers } = require('ethers')
require('dotenv').config({ path: '.env.local' })

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
}

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  step: (msg) => console.log(`${colors.cyan}▶ ${msg}${colors.reset}`)
}

// Test configuration
const TEST_CONFIG = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  databaseUrl: process.env.DATABASE_URL,
  infuraId: process.env.INFURA_PROJECT_ID,
  escrowContract: process.env.ESCROW_CONTRACT_ADDRESS,
  jwtSecret: process.env.JWT_SECRET
}

// Test results tracker
const testResults = {
  passed: 0,
  failed: 0,
  warnings: 0
}

async function testEnvironmentVariables() {
  log.step('Testing Environment Variables')
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'DATABASE_URL',
    'JWT_SECRET'
  ]

  const optionalVars = [
    'INFURA_PROJECT_ID',
    'ESCROW_CONTRACT_ADDRESS',
    'PINATA_API_KEY'
  ]

  let allRequired = true

  // Check required variables
  requiredVars.forEach(varName => {
    if (process.env[varName]) {
      log.success(`${varName} is set`)
      testResults.passed++
    } else {
      log.error(`${varName} is missing`)
      testResults.failed++
      allRequired = false
    }
  })

  // Check optional variables
  optionalVars.forEach(varName => {
    if (process.env[varName]) {
      log.success(`${varName} is set (optional)`)
    } else {
      log.warning(`${varName} is not set (optional)`)
      testResults.warnings++
    }
  })

  return allRequired
}

async function testDatabaseConnection() {
  log.step('Testing Database Connection')
  
  try {
    const supabase = createClient(TEST_CONFIG.supabaseUrl, TEST_CONFIG.supabaseKey)
    
    // Test basic connection
    const { data, error } = await supabase.from('users').select('count(*)').limit(1)
    
    if (error) {
      log.error(`Database connection failed: ${error.message}`)
      testResults.failed++
      return false
    }
    
    log.success('Database connection successful')
    testResults.passed++
    return true
  } catch (error) {
    log.error(`Database connection error: ${error.message}`)
    testResults.failed++
    return false
  }
}

async function testDatabaseSchema() {
  log.step('Testing Database Schema')
  
  try {
    const supabase = createClient(TEST_CONFIG.supabaseUrl, TEST_CONFIG.supabaseKey)
    
    const tables = [
      'users',
      'collections', 
      'nfts',
      'orders',
      'escrow_contracts',
      'transactions',
      'chats',
      'disputes',
      'payment_accounts'
    ]

    let allTablesExist = true

    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select('*').limit(1)
        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          log.error(`Table '${table}' error: ${error.message}`)
          testResults.failed++
          allTablesExist = false
        } else {
          log.success(`Table '${table}' exists and accessible`)
          testResults.passed++
        }
      } catch (error) {
        log.error(`Table '${table}' check failed: ${error.message}`)
        testResults.failed++
        allTablesExist = false
      }
    }

    return allTablesExist
  } catch (error) {
    log.error(`Schema validation error: ${error.message}`)
    testResults.failed++
    return false
  }
}

async function testEthereumConnection() {
  log.step('Testing Ethereum Connection')
  
  if (!TEST_CONFIG.infuraId) {
    log.warning('Infura Project ID not set, skipping Ethereum tests')
    testResults.warnings++
    return true
  }

  try {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/${TEST_CONFIG.infuraId}`
    )
    
    const blockNumber = await provider.getBlockNumber()
    log.success(`Ethereum connection successful. Latest block: ${blockNumber}`)
    testResults.passed++
    return true
  } catch (error) {
    log.error(`Ethereum connection failed: ${error.message}`)
    testResults.failed++
    return false
  }
}

async function testEscrowContract() {
  log.step('Testing Escrow Contract')
  
  if (!TEST_CONFIG.escrowContract || !TEST_CONFIG.infuraId) {
    log.warning('Escrow contract address or Infura ID not set, skipping contract tests')
    testResults.warnings++
    return true
  }

  try {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/${TEST_CONFIG.infuraId}`
    )
    
    // Check if contract exists
    const code = await provider.getCode(TEST_CONFIG.escrowContract)
    
    if (code === '0x') {
      log.error('Escrow contract not deployed at specified address')
      testResults.failed++
      return false
    }
    
    log.success('Escrow contract found on blockchain')
    testResults.passed++
    return true
  } catch (error) {
    log.error(`Escrow contract check failed: ${error.message}`)
    testResults.failed++
    return false
  }
}

async function testAPIEndpoints() {
  log.step('Testing API Endpoints')
  
  const endpoints = [
    { path: '/api/nfts', method: 'GET', description: 'NFT listings' },
    { path: '/api/orders', method: 'GET', description: 'Order book' },
    { path: '/api/escrow', method: 'GET', description: 'Escrow contracts' }
  ]

  let allEndpointsWorking = true

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`http://localhost:3000${endpoint.path}`)
      
      if (response.status === 401) {
        log.success(`${endpoint.description} endpoint requires auth (expected)`)
        testResults.passed++
      } else if (response.ok) {
        log.success(`${endpoint.description} endpoint accessible`)
        testResults.passed++
      } else {
        log.error(`${endpoint.description} endpoint returned ${response.status}`)
        testResults.failed++
        allEndpointsWorking = false
      }
    } catch (error) {
      log.error(`${endpoint.description} endpoint test failed: ${error.message}`)
      testResults.failed++
      allEndpointsWorking = false
    }
  }

  return allEndpointsWorking
}

async function testSampleDataCreation() {
  log.step('Testing Sample Data Creation')
  
  try {
    const supabase = createClient(TEST_CONFIG.supabaseUrl, TEST_CONFIG.supabaseKey)
    
    // Check if sample users exist
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('username')
      .in('username', ['rafli_admin', 'crypto_whale_id', 'nft_creator_pro'])

    if (usersError) {
      log.error(`Failed to check sample users: ${usersError.message}`)
      testResults.failed++
      return false
    }

    if (users && users.length > 0) {
      log.success(`Found ${users.length} sample users`)
      testResults.passed++
    } else {
      log.warning('No sample users found - run database/init.sql script')
      testResults.warnings++
    }

    // Check if sample collections exist  
    const { data: collections, error: collectionsError } = await supabase
      .from('collections')
      .select('name')
      .limit(3)

    if (collectionsError) {
      log.error(`Failed to check collections: ${collectionsError.message}`)
      testResults.failed++
      return false
    }

    if (collections && collections.length > 0) {
      log.success(`Found ${collections.length} sample collections`)
      testResults.passed++
    } else {
      log.warning('No sample collections found')
      testResults.warnings++
    }

    return true
  } catch (error) {
    log.error(`Sample data test failed: ${error.message}`)
    testResults.failed++
    return false
  }
}

async function runIntegrationTests() {
  console.log(`\n${colors.cyan}🚀 PUYOK NFT Marketplace Integration Tests${colors.reset}\n`)
  
  const tests = [
    testEnvironmentVariables,
    testDatabaseConnection,
    testDatabaseSchema,
    testEthereumConnection,
    testEscrowContract,
    testSampleDataCreation
  ]

  // Only test API endpoints if running in development
  if (process.env.NODE_ENV !== 'production') {
    log.info('Development mode detected, API endpoint tests will be skipped')
    log.info('Start the dev server with "npm run dev" to test API endpoints')
  }

  let allPassed = true

  for (const test of tests) {
    try {
      const result = await test()
      if (!result) allPassed = false
      console.log('') // Add spacing between tests
    } catch (error) {
      log.error(`Test failed with error: ${error.message}`)
      testResults.failed++
      allPassed = false
      console.log('')
    }
  }

  // Print final results
  console.log(`\n${colors.cyan}📊 Test Results${colors.reset}`)
  console.log(`${colors.green}✓ Passed: ${testResults.passed}${colors.reset}`)
  console.log(`${colors.red}✗ Failed: ${testResults.failed}${colors.reset}`)
  console.log(`${colors.yellow}⚠ Warnings: ${testResults.warnings}${colors.reset}`)

  if (allPassed && testResults.failed === 0) {
    console.log(`\n${colors.green}🎉 All critical tests passed! Your PUYOK marketplace is ready.${colors.reset}`)
    console.log(`\n${colors.blue}Next steps:${colors.reset}`)
    console.log(`1. Start development server: npm run dev`)
    console.log(`2. Test authentication with MetaMask`)
    console.log(`3. Create your first NFT listing`)
    console.log(`4. Set up production deployment`)
    process.exit(0)
  } else {
    console.log(`\n${colors.red}❌ Some tests failed. Please check the errors above.${colors.reset}`)
    console.log(`\n${colors.blue}Need help?${colors.reset}`)
    console.log(`1. Check SETUP.md for detailed configuration`)
    console.log(`2. Verify all environment variables are set`)
    console.log(`3. Run database/init.sql script in Supabase`)
    process.exit(1)
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runIntegrationTests().catch(error => {
    console.error('Test runner failed:', error)
    process.exit(1)
  })
}

module.exports = { runIntegrationTests }
