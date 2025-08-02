# 🚀 PUYOK NFT Marketplace - Production Setup Guide

Panduan lengkap untuk mengubah aplikasi dari development dengan data dummy menjadi production-ready dengan data real.

## 📋 Overview

Aplikasi saat ini menggunakan:
- ✅ Mock data untuk NFTs, users, orders
- ✅ Simulasi AI OCR verification  
- ✅ Mock payment gateway responses
- ✅ Sample escrow contract interactions
- ✅ Dummy admin authentication

**Target Production:**
- 🎯 Real database dengan data real
- 🎯 Real AI OCR dengan Google Vision API
- 🎯 Real payment gateway (Midtrans/Manual)
- 🎯 Real smart contract deployment
- 🎯 Real admin authentication system
- 🎯 Real file upload & storage

---

## 🗃️ PHASE 1: Database & Data Migration

### 1.1 Remove Mock Data dari Database

**File yang perlu dibersihkan:**
```
database/init.sql (bagian sample data)
- Remove INSERT statements untuk users, collections, NFTs
- Keep table structure, remove dummy records
```

**Action Items:**
1. **Backup current database** (jika ada data penting)
2. **Clean sample data:**
   ```sql
   -- Remove sample users (kecuali admin)
   DELETE FROM users WHERE username NOT IN ('rafli_admin');
   
   -- Remove sample collections
   DELETE FROM collections WHERE name IN ('Indonesian Mythology', 'Crypto Punks Indonesia', 'Batik Genesis');
   
   -- Remove sample NFTs  
   DELETE FROM nfts WHERE id NOT IN (SELECT id FROM nfts WHERE owner_id = (SELECT id FROM users WHERE username = 'rafli_admin'));
   ```

3. **Update admin user dengan data real:**
   ```sql
   UPDATE users SET 
       wallet_address = 'WALLET_ADDRESS_REAL',
       email = 'admin@puyok.com',
       username = 'admin_puyok'
   WHERE username = 'rafli_admin';
   ```

### 1.2 Setup Real User Registration

**Files to modify:**
- `components/auth/WalletAuth.tsx` - Remove mock responses
- `lib/auth.ts` - Implement real wallet connection
- `contexts/AuthContext.tsx` - Connect to Supabase auth

**Implementation:**
```typescript
// Replace mock wallet connection with real Web3 integration
const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    // Save to Supabase users table
  }
}
```

---

## 🤖 PHASE 2: AI OCR Production Setup

### 2.1 Replace Simulation dengan Real AI

**Current State:**
- `lib/ai-ocr-verification.ts` menggunakan simulasi
- Mock confidence scores dan validation

**Production Setup:**

1. **Setup Google Vision API:**
   ```bash
   # Install dependencies
   npm install @google-cloud/vision
   
   # Setup credentials
   export GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account-key.json"
   ```

2. **Replace simulation files:**
   - Replace `lib/ai-ocr-verification.ts` dengan `lib/real-ai-verification.ts`
   - Update imports di `components/AIVerificationUpload.tsx`

3. **Environment variables:**
   ```env
   GOOGLE_PROJECT_ID=your_project_id
   GOOGLE_CLIENT_EMAIL=service@project.iam.gserviceaccount.com  
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
   ```

### 2.2 Setup File Upload Real

**Current:** Mock file handling
**Target:** Real Supabase Storage

```typescript
// components/AIVerificationUpload.tsx
const uploadToStorage = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('payment-proofs')
    .upload(`${orderId}/${Date.now()}_${file.name}`, file)
    
  return data?.path
}
```

---

## 💳 PHASE 3: Payment Gateway Integration

### 3.1 Remove Mock Payment Responses

**Files to clean:**
- `lib/payment-gateway.ts` - Remove mock responses
- `app/marketplace/[id]/payment/page.tsx` - Remove sample order data

### 3.2 Implement Real Payment Gateway

**Option A: Midtrans Integration**
```typescript
// lib/midtrans-payment.ts
export class MidtransPayment {
  async createPayment(orderData) {
    const response = await fetch('https://api.midtrans.com/v2/charge', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(MIDTRANS_SERVER_KEY).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    })
    return response.json()
  }
}
```

**Option B: Manual Bank Transfer (Current Choice)**
- Keep manual system
- Remove mock virtual account generation
- Use real bank account numbers

### 3.3 Real Payment Verification

Replace mock verification dengan:
1. Real bank account validation
2. Real amount matching  
3. Real reference code system
4. Integration dengan AI OCR results

---

## 🔐 PHASE 4: Smart Contract Production

### 4.1 Deploy Real Escrow Contract

**Current:** Using testnet contract
**Target:** Mainnet deployment

1. **Deploy to Ethereum Mainnet:**
   ```bash
   # Using Hardhat/Truffle
   npx hardhat deploy --network mainnet
   ```

2. **Update contract address:**
   ```env
   NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS=0x_REAL_MAINNET_ADDRESS
   NEXT_PUBLIC_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
   ```

3. **Update contract interactions:**
   - `lib/escrow.ts` - Remove mock transactions
   - Implement real gas estimation
   - Add transaction confirmations

### 4.2 Real NFT Minting & Transfers

Replace mock NFT operations:
```typescript
// lib/nft-operations.ts
export const mintNFT = async (tokenURI: string, to: string) => {
  const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, abi, signer)
  const tx = await contract.mintNFT(to, tokenURI)
  await tx.wait()
  return tx.hash
}
```

---

## 👨‍💼 PHASE 5: Admin System Production

### 5.1 Real Admin Authentication

**Current:** Mock admin session in localStorage
**Target:** Secure JWT-based auth

**Implementation:**
```typescript
// lib/admin-auth.ts
export const adminLogin = async (credentials) => {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  
  if (response.ok) {
    const { token } = await response.json()
    // Store secure httpOnly cookie
    document.cookie = `admin_token=${token}; secure; httpOnly`
  }
}
```

### 5.2 Real Admin Dashboard Data

**Files to update:**
- `app/rafli/admin/page.tsx` - Remove mock statistics
- `app/rafli/admin/users/page.tsx` - Connect to real users
- `app/rafli/admin/transactions/page.tsx` - Real transaction data

**Connect to real APIs:**
```typescript
// Replace mock data with Supabase queries
const { data: realUsers } = await supabase
  .from('users')
  .select('*')
  .order('created_at', { ascending: false })
```

---

## 🎨 PHASE 6: NFT & Marketplace Data

### 6.1 Real NFT Collections

**Remove mock collections:**
```typescript
// Remove from components/NFTCard.tsx, marketplace pages
const mockCollections = [...] // DELETE THIS

// Replace with Supabase queries
const { data: collections } = await supabase
  .from('collections')
  .select('*, nfts(*)')
  .eq('is_verified', true)
```

### 6.2 Real User Profiles

**Files to update:**
- `app/profile/[username]/page.tsx`
- Remove mock user data
- Connect to real wallet addresses

### 6.3 Real Trading History

Replace mock trading data dengan real transaction history:
```typescript
const getRealTradingHistory = async (userId: string) => {
  return await supabase
    .from('transactions')
    .select('*, nfts(*), users(*)')
    .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
    .order('created_at', { ascending: false })
}
```

---

## 🔧 PHASE 7: Production Configuration

### 7.1 Environment Variables Production

**Create `.env.production`:**
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Blockchain
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/PROJECT_ID  
NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS=0x_REAL_MAINNET_ADDRESS

# AI OCR
GOOGLE_PROJECT_ID=puyok-production
GOOGLE_CLIENT_EMAIL=ocr@puyok-production.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

# Payment
MIDTRANS_SERVER_KEY=SB-Mid-server-REAL_KEY (if using Midtrans)
MIDTRANS_CLIENT_KEY=SB-Mid-client-REAL_KEY

# Security
JWT_SECRET=your_super_secure_jwt_secret
ADMIN_SECRET_KEY=your_admin_secret
NEXTAUTH_SECRET=your_nextauth_secret

# Monitoring
SENTRY_DSN=https://your-sentry-dsn
VERCEL_ANALYTICS_ID=your_analytics_id
```

### 7.2 Remove Development Features

**Files to clean:**
- Remove console.log statements
- Remove debug components
- Remove mock API endpoints
- Remove development-only UI elements

### 7.3 Performance Optimization

**Implement:**
- Image optimization with Next.js Image
- API response caching
- Database query optimization
- Code splitting untuk large components

---

## 🚀 PHASE 8: Deployment & Go-Live

### 8.1 Pre-deployment Checklist

- [ ] All mock data removed
- [ ] Real APIs implemented
- [ ] Environment variables configured
- [ ] Smart contracts deployed to mainnet
- [ ] AI OCR tested with real images
- [ ] Payment flow tested end-to-end
- [ ] Admin dashboard tested
- [ ] Security review completed
- [ ] Performance testing done

### 8.2 Deployment Steps

1. **Build production:**
   ```bash
   npm run build
   npm start
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Configure domain:**
   - Setup custom domain (puyok.com)
   - Configure SSL certificates
   - Setup CDN untuk static assets

### 8.3 Post-deployment

1. **Monitoring setup:**
   - Sentry untuk error tracking
   - Vercel Analytics untuk performance
   - Custom monitoring untuk AI OCR accuracy

2. **Backup strategy:**
   - Automated database backups
   - Smart contract event logging
   - User data backup procedures

---

## 📊 PHASE 9: Data Migration Strategy

### 9.1 User Data Migration

Jika ada existing users:
```sql
-- Migrate existing users to new schema
INSERT INTO users_new (wallet_address, email, username, created_at)
SELECT wallet_address, email, username, created_at FROM users_old;
```

### 9.2 NFT Data Migration

```typescript
// Migrate NFT metadata to IPFS
const migrateNFTsToIPFS = async () => {
  const nfts = await supabase.from('nfts').select('*')
  
  for (const nft of nfts) {
    const ipfsHash = await uploadToIPFS(nft.metadata)
    await supabase
      .from('nfts')
      .update({ token_uri: `ipfs://${ipfsHash}` })
      .eq('id', nft.id)
  }
}
```

---

## 🧪 PHASE 10: Testing Strategy

### 10.1 Unit Testing

```bash
# Test AI OCR accuracy
npm run test:ocr

# Test payment flows  
npm run test:payments

# Test smart contract interactions
npm run test:contracts
```

### 10.2 Integration Testing

- End-to-end user flows
- Payment verification flows
- Admin operations testing
- Mobile responsiveness

### 10.3 Load Testing

```bash
# Test dengan concurrent users
npm run test:load

# Test AI OCR dengan multiple images
npm run test:ocr-load
```

---

## 🔒 PHASE 11: Security Hardening

### 11.1 Authentication Security

- Implement rate limiting
- Add CAPTCHA for sensitive operations
- Setup 2FA untuk admin accounts
- Implement session management

### 11.2 Smart Contract Security

- Audit smart contracts
- Implement emergency pause mechanisms
- Setup multi-sig untuk admin functions
- Monitor contract events

### 11.3 API Security

```typescript
// Rate limiting middleware
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

---

## 📈 PHASE 12: Analytics & Monitoring

### 12.1 Business Metrics

Track real metrics:
- User registration rates
- NFT trading volume
- Payment success rates
- AI OCR accuracy rates
- User engagement metrics

### 12.2 Technical Monitoring

```typescript
// Setup monitoring
const monitorAIAccuracy = async () => {
  const accuracy = await calculateAIAccuracy()
  if (accuracy < 0.85) {
    await sendAlert('AI accuracy below threshold')
  }
}
```

---

## ✅ Implementation Priority

### **Phase 1-3 (Critical - Week 1):**
- Database cleanup & real data
- AI OCR production setup  
- Payment gateway real integration

### **Phase 4-6 (Important - Week 2):**
- Smart contract mainnet deployment
- Admin system security
- Real NFT marketplace data

### **Phase 7-9 (Enhancement - Week 3):**
- Production configuration
- Deployment & monitoring
- Data migration & testing

### **Phase 10-12 (Optimization - Week 4):**
- Security hardening
- Performance optimization
- Analytics implementation

---

## 🆘 Troubleshooting Guide

### Common Issues & Solutions

**AI OCR Low Accuracy:**
- Check image quality requirements
- Verify Google Vision API quotas
- Review training data quality

**Payment Verification Failures:**
- Validate bank account formats
- Check reference code generation
- Review amount matching logic

**Smart Contract Issues:**
- Verify gas price settings
- Check network congestion
- Validate contract permissions

**Database Performance:**
- Add appropriate indexes
- Optimize complex queries
- Implement connection pooling

---

## 💰 Cost Estimation (Monthly)

**Production Costs:**
- Google Vision API: $1.50/1000 requests (~$15/month untuk 10k verifications)
- Supabase Pro: $25/month
- Vercel Pro: $20/month  
- Ethereum gas fees: Variable ($50-200/month)
- Domain & SSL: $10/month
- Monitoring (Sentry): $26/month

**Total estimated: $150-300/month** untuk medium traffic

---

## 📞 Support & Maintenance

### Monthly Tasks:
- Monitor AI accuracy rates
- Review payment success rates
- Update smart contract if needed
- Security patches & updates
- Database optimization
- User feedback review

### Quarterly Tasks:
- Security audit
- Performance review
- Feature usage analysis
- Cost optimization review

---

**Ready untuk production! 🚀**

Ikuti phases secara berurutan untuk hasil terbaik. Setiap phase bisa memakan waktu 1-3 hari tergantung kompleksitas dan pengalaman tim.
