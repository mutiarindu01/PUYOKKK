# PUYOK NFT Marketplace - Setup & Deployment Guide

## Overview
PUYOK adalah platform NFT marketplace berbasis Next.js 15 dengan fitur-fitur lengkap:
- 🔐 **Authentication**: Wallet (MetaMask) & Email
- 🗄️ **Database**: Supabase PostgreSQL dengan Prisma ORM
- 🔒 **Escrow System**: Smart contract untuk transaksi aman
- 💬 **Real-time Chat**: WebSocket untuk komunikasi buyer-seller
- 📊 **Analytics**: Dashboard trading dan portfolio
- 🎨 **UI/UX**: Modern design dengan Tailwind CSS & Framer Motion

## Prerequisites

### Required Software
- Node.js 18+ 
- npm atau yarn
- Git
- PostgreSQL (atau akun Supabase)
- MetaMask browser extension

### Required Accounts
- [Supabase](https://supabase.com) - Database & Authentication
- [Infura](https://infura.io) - Ethereum node access
- [Pinata](https://pinata.cloud) - IPFS storage (optional)

## Step 1: Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd puyok-nft-marketplace

# Install dependencies
npm install

# Or with yarn
yarn install
```

## Step 2: Database Setup

### 2.1 Create Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create new project
3. Choose region (Singapore for Indonesia users)
4. Set strong database password
5. Wait for project initialization

### 2.2 Configure Database Schema
1. Go to SQL Editor in Supabase dashboard
2. Copy and run the entire `database/init.sql` script
3. This will create all tables, indexes, and sample data

### 2.3 Set Up Storage Buckets
```sql
-- Run in Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public) VALUES 
('nft-images', 'nft-images', true),
('kyc-documents', 'kyc-documents', false),
('chat-files', 'chat-files', false);
```

### 2.4 Configure Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE nfts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE escrow_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- Example policy for users table
CREATE POLICY "Users can view own profile" ON users
FOR SELECT USING (auth.uid()::text = id);

-- Add more policies as needed for your security requirements
```

## Step 3: Environment Configuration

### 3.1 Copy Environment Template
```bash
cp .env.local.example .env.local
```

### 3.2 Configure Environment Variables
Edit `.env.local` with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL="postgresql://postgres:password@db.your-project.supabase.co:5432/postgres"

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Ethereum & Smart Contract
ESCROW_CONTRACT_ADDRESS=0x1234567890abcdef1234567890abcdef12345678
PRIVATE_KEY=your-ethereum-private-key-for-escrow
INFURA_PROJECT_ID=your-infura-project-id

# Optional: Payment Gateway
MIDTRANS_SERVER_KEY=your-midtrans-server-key
MIDTRANS_CLIENT_KEY=your-midtrans-client-key

# Optional: IPFS Storage
PINATA_API_KEY=your-pinata-api-key
PINATA_SECRET_KEY=your-pinata-secret-key

# Admin Configuration
ADMIN_EMAIL=admin@puyok.com
ADMIN_PASSWORD_HASH=$2b$12$encrypted-password-hash
```

### 3.3 Generate Secure Keys
```bash
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate NextAuth Secret
openssl rand -base64 32
```

## Step 4: Smart Contract Setup (Optional)

### 4.1 Deploy Escrow Contract
```solidity
// Example Escrow Smart Contract
// Deploy using Remix IDE or Hardhat
contract PuyokEscrow {
    // Contract implementation
    // See contracts/PuyokEscrow.sol for full code
}
```

### 4.2 Update Contract Address
Update `ESCROW_CONTRACT_ADDRESS` in `.env.local` with deployed contract address.

## Step 5: Development Server

### 5.1 Start Development Server
```bash
npm run dev
# or
yarn dev
```

### 5.2 Access Application
- Frontend: http://localhost:3000
- API Routes: http://localhost:3000/api
- Admin Dashboard: http://localhost:3000/rafli/admin

## Step 6: Testing

### 6.1 Test Authentication
1. Open http://localhost:3000
2. Click "Get Started" 
3. Test wallet authentication with MetaMask
4. Test email registration

### 6.2 Test NFT Marketplace
1. Navigate to /marketplace
2. Test NFT listing creation
3. Test order placement
4. Test chat functionality

### 6.3 Test Escrow System
1. Create a buy/sell order
2. Initiate escrow contract
3. Test milestone updates
4. Test dispute mechanism

### 6.4 Test Admin Dashboard
1. Access /rafli/admin/login
2. Use admin credentials
3. Test user management
4. Test transaction monitoring

## Step 7: Production Deployment

### 7.1 Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
```

### 7.2 Netlify Deployment
```bash
# Build the application
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=.next
```

### 7.3 Docker Deployment
```dockerfile
# Dockerfile already provided
docker build -t puyok-marketplace .
docker run -p 3000:3000 puyok-marketplace
```

## API Endpoints

### Authentication
- `POST /api/auth/wallet` - Wallet authentication
- `POST /api/auth/email` - Email authentication

### NFTs
- `GET /api/nfts` - Fetch NFTs with filtering
- `POST /api/nfts` - Create NFT listing
- `GET /api/nfts/[id]` - Get specific NFT

### Orders
- `GET /api/orders` - Fetch orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/[id]` - Update order

### Escrow
- `GET /api/escrow` - Get user escrows
- `POST /api/escrow` - Create escrow
- `POST /api/escrow/[id]/actions` - Escrow actions

## Security Considerations

### 6.1 Environment Security
- Never commit `.env.local` to version control
- Use different keys for development and production
- Rotate API keys regularly

### 6.2 Database Security
- Enable Row Level Security (RLS) on all tables
- Create appropriate policies for data access
- Regular database backups

### 6.3 Smart Contract Security
- Audit smart contracts before deployment
- Use multi-signature wallets for admin functions
- Implement proper access controls

## Troubleshooting

### Common Issues

#### MetaMask Connection Issues
```javascript
// Check if MetaMask is installed
if (typeof window.ethereum === 'undefined') {
  console.error('MetaMask not detected')
}
```

#### Database Connection Issues
```bash
# Test database connection
npx prisma db push
npx prisma studio
```

#### Build Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Performance Optimization

#### 6.1 Database Optimization
- Add database indexes for frequently queried fields
- Use database query optimization
- Implement proper caching strategies

#### 6.2 Frontend Optimization
- Implement image optimization
- Use lazy loading for components
- Optimize bundle sizes

## Support & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

### Community
- [PUYOK Discord](https://discord.gg/puyok)
- [GitHub Issues](https://github.com/your-repo/issues)

### Professional Support
- Email: support@puyok.com
- Business: business@puyok.com

---

## Next Steps After Setup

1. **Customize Branding**: Update colors, logos, and content
2. **Add More Features**: Implement additional NFT standards
3. **Scale Infrastructure**: Set up CDN and caching
4. **Marketing Integration**: Add analytics and tracking
5. **Mobile App**: Develop React Native companion app

Happy building! 🚀
