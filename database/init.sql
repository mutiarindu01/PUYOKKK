-- PUYOK NFT Marketplace Database Schema
-- This script initializes the Supabase database with all required tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE kyc_level AS ENUM ('none', 'basic', 'advanced', 'premium');
CREATE TYPE kyc_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE membership_tier AS ENUM ('basic', 'silver', 'gold', 'platinum');
CREATE TYPE nft_rarity AS ENUM ('Common', 'Rare', 'Epic', 'Legendary', 'Mythical');
CREATE TYPE token_standard AS ENUM ('ERC721', 'ERC1155');
CREATE TYPE order_type AS ENUM ('buy', 'sell');
CREATE TYPE asset_type AS ENUM ('NFT', 'TOKEN');
CREATE TYPE order_status AS ENUM ('active', 'filled', 'cancelled', 'expired');
CREATE TYPE payment_method AS ENUM ('onchain', 'gasless');
CREATE TYPE escrow_status AS ENUM ('created', 'funded', 'released', 'disputed', 'cancelled');
CREATE TYPE transaction_type AS ENUM ('sale', 'bid', 'listing', 'transfer', 'mint');
CREATE TYPE transaction_status AS ENUM ('pending', 'confirmed', 'failed');
CREATE TYPE message_type AS ENUM ('text', 'image', 'file', 'payment_proof', 'system');
CREATE TYPE dispute_status AS ENUM ('open', 'investigating', 'mediation', 'resolved', 'escalated');
CREATE TYPE dispute_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE payment_type AS ENUM ('bank', 'ewallet', 'crypto');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_address TEXT UNIQUE,
    email TEXT UNIQUE,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    kyc_level kyc_level DEFAULT 'none',
    kyc_status kyc_status DEFAULT 'pending',
    membership_tier membership_tier DEFAULT 'basic',
    reputation_score DECIMAL(3,2) DEFAULT 0.0,
    total_trades INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 0.0,
    response_time TEXT DEFAULT 'Not available',
    escrow_rating DECIMAL(3,2) DEFAULT 0.0,
    dispute_count INTEGER DEFAULT 0,
    warning_count INTEGER DEFAULT 0,
    is_2fa_enabled BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    transaction_limits JSONB DEFAULT '{"daily": 50000000, "monthly": 1000000000, "used": {"daily": 0, "monthly": 0}}',
    loyalty_points INTEGER DEFAULT 0,
    referral_code TEXT UNIQUE NOT NULL,
    referred_by TEXT,
    languages TEXT[] DEFAULT ARRAY['Bahasa Indonesia'],
    preferred_payments TEXT[] DEFAULT ARRAY[]::TEXT[],
    location JSONB DEFAULT '{"country": "Indonesia", "city": ""}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collections table
CREATE TABLE collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    banner_url TEXT,
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contract_address TEXT,
    total_supply INTEGER,
    floor_price DECIMAL(20,2),
    volume_total DECIMAL(20,2) DEFAULT 0,
    volume_24h DECIMAL(20,2) DEFAULT 0,
    holders_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    category TEXT NOT NULL,
    social_links JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NFTs table
CREATE TABLE nfts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    price DECIMAL(20,2) NOT NULL,
    currency TEXT DEFAULT 'IDR',
    rarity nft_rarity DEFAULT 'Common',
    category TEXT NOT NULL,
    traits JSONB DEFAULT '{}',
    contract_address TEXT,
    token_id TEXT,
    token_standard token_standard DEFAULT 'ERC721',
    is_verified BOOLEAN DEFAULT FALSE,
    is_listed BOOLEAN DEFAULT FALSE,
    is_auction BOOLEAN DEFAULT FALSE,
    auction_end_time TIMESTAMP WITH TIME ZONE,
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    last_sale_price DECIMAL(20,2),
    floor_price DECIMAL(20,2),
    volume_24h DECIMAL(20,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type order_type NOT NULL,
    asset_type asset_type NOT NULL,
    nft_id UUID REFERENCES nfts(id) ON DELETE CASCADE,
    token_contract TEXT,
    amount DECIMAL(20,8) NOT NULL,
    price DECIMAL(20,2) NOT NULL,
    total_value DECIMAL(20,2) NOT NULL,
    currency TEXT DEFAULT 'IDR',
    maker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    taker_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status order_status DEFAULT 'active',
    payment_method payment_method DEFAULT 'gasless',
    payment_details JSONB DEFAULT '{}',
    escrow_id UUID,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    filled_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    fee_structure JSONB DEFAULT '{"makerFee": 0.1, "takerFee": 0.15}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT chk_asset_reference CHECK (
        (asset_type = 'NFT' AND nft_id IS NOT NULL) OR
        (asset_type = 'TOKEN' AND token_contract IS NOT NULL)
    )
);

-- Escrow contracts table
CREATE TABLE escrow_contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_address TEXT NOT NULL,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    asset_details JSONB NOT NULL,
    payment_amount DECIMAL(20,2) NOT NULL,
    currency TEXT DEFAULT 'IDR',
    escrow_fee DECIMAL(20,2) NOT NULL,
    insurance_fee DECIMAL(20,2) NOT NULL,
    status escrow_status DEFAULT 'created',
    milestones JSONB DEFAULT '[]',
    dispute_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type transaction_type NOT NULL,
    from_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    nft_id UUID REFERENCES nfts(id) ON DELETE SET NULL,
    amount DECIMAL(20,2) NOT NULL,
    currency TEXT DEFAULT 'IDR',
    transaction_hash TEXT,
    gas_fee DECIMAL(20,2),
    platform_fee DECIMAL(20,2) NOT NULL,
    status transaction_status DEFAULT 'pending',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chats table
CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    message_type message_type DEFAULT 'text',
    file_url TEXT,
    file_name TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    reactions JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disputes table
CREATE TABLE disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    escrow_id UUID NOT NULL REFERENCES escrow_contracts(id) ON DELETE CASCADE,
    complainant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    respondent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status dispute_status DEFAULT 'open',
    priority dispute_priority DEFAULT 'medium',
    evidence JSONB DEFAULT '[]',
    mediator_id UUID REFERENCES users(id) ON DELETE SET NULL,
    resolution TEXT,
    compensation_amount DECIMAL(20,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Payment accounts table
CREATE TABLE payment_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type payment_type NOT NULL,
    provider_name TEXT NOT NULL,
    account_name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    alias TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraint for escrow_contracts.dispute_id
ALTER TABLE escrow_contracts ADD CONSTRAINT fk_escrow_dispute 
    FOREIGN KEY (dispute_id) REFERENCES disputes(id) ON DELETE SET NULL;

-- Add foreign key constraint for orders.escrow_id
ALTER TABLE orders ADD CONSTRAINT fk_order_escrow 
    FOREIGN KEY (escrow_id) REFERENCES escrow_contracts(id) ON DELETE SET NULL;

-- Create indexes for better performance
CREATE INDEX idx_users_wallet_address ON users(wallet_address);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_referral_code ON users(referral_code);

CREATE INDEX idx_nfts_creator_id ON nfts(creator_id);
CREATE INDEX idx_nfts_owner_id ON nfts(owner_id);
CREATE INDEX idx_nfts_collection_id ON nfts(collection_id);
CREATE INDEX idx_nfts_category ON nfts(category);
CREATE INDEX idx_nfts_rarity ON nfts(rarity);
CREATE INDEX idx_nfts_is_listed ON nfts(is_listed);
CREATE INDEX idx_nfts_price ON nfts(price);

CREATE INDEX idx_orders_maker_id ON orders(maker_id);
CREATE INDEX idx_orders_taker_id ON orders(taker_id);
CREATE INDEX idx_orders_nft_id ON orders(nft_id);
CREATE INDEX idx_orders_type ON orders(type);
CREATE INDEX idx_orders_asset_type ON orders(asset_type);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_expires_at ON orders(expires_at);

CREATE INDEX idx_escrow_buyer_id ON escrow_contracts(buyer_id);
CREATE INDEX idx_escrow_seller_id ON escrow_contracts(seller_id);
CREATE INDEX idx_escrow_status ON escrow_contracts(status);
CREATE INDEX idx_escrow_expires_at ON escrow_contracts(expires_at);

CREATE INDEX idx_transactions_from_user_id ON transactions(from_user_id);
CREATE INDEX idx_transactions_to_user_id ON transactions(to_user_id);
CREATE INDEX idx_transactions_nft_id ON transactions(nft_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_status ON transactions(status);

CREATE INDEX idx_chats_order_id ON chats(order_id);
CREATE INDEX idx_chats_sender_id ON chats(sender_id);
CREATE INDEX idx_chats_receiver_id ON chats(receiver_id);

CREATE INDEX idx_disputes_order_id ON disputes(order_id);
CREATE INDEX idx_disputes_escrow_id ON disputes(escrow_id);
CREATE INDEX idx_disputes_status ON disputes(status);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for auto-updating updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON collections 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_nfts_updated_at BEFORE UPDATE ON nfts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_escrow_contracts_updated_at BEFORE UPDATE ON escrow_contracts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON chats 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_disputes_updated_at BEFORE UPDATE ON disputes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create payments table for payment gateway integration
CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  amount DECIMAL(20, 2) NOT NULL,
  currency TEXT DEFAULT 'IDR',
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'
);

-- Create KYC documents table
CREATE TABLE kyc_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('ktp', 'passport', 'selfie', 'address_proof')),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  feedback TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create additional indexes for new tables
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_kyc_documents_user_id ON kyc_documents(user_id);
CREATE INDEX idx_kyc_documents_status ON kyc_documents(status);
CREATE TRIGGER update_payment_accounts_updated_at BEFORE UPDATE ON payment_accounts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO users (username, wallet_address, email, kyc_level, kyc_status, membership_tier, reputation_score, total_trades, success_rate, escrow_rating, referral_code, location) VALUES
('rafli_admin', '0x742d35cc6443c4a3b4d4b2e7ad5f95c123456789', 'rafli@puyok.com', 'premium', 'verified', 'platinum', 5.0, 500, 99.8, 5.0, 'ADMIN01', '{"country": "Indonesia", "city": "Jakarta"}'),
('crypto_whale_id', '0x1234567890abcdef1234567890abcdef12345678', 'whale@crypto.com', 'premium', 'verified', 'platinum', 4.9, 256, 98.5, 4.8, 'WHALE01', '{"country": "Indonesia", "city": "Surabaya"}'),
('nft_creator_pro', '0xabcdef1234567890abcdef1234567890abcdef12', 'creator@nft.com', 'advanced', 'verified', 'gold', 4.7, 189, 97.2, 4.9, 'CREATE01', '{"country": "Indonesia", "city": "Bandung"}'),
('hodler_pro', '0x987654321abcdef987654321abcdef9876543210', 'hodler@pro.com', 'basic', 'verified', 'silver', 4.5, 67, 96.5, 4.7, 'HODLER01', '{"country": "Indonesia", "city": "Medan"}');

INSERT INTO collections (name, description, creator_id, category, is_verified) VALUES
('Indonesian Mythology', 'NFT collection inspired by Indonesian mythology and folklore', (SELECT id FROM users WHERE username = 'nft_creator_pro'), 'Digital Art', true),
('Crypto Punks Indonesia', 'Indonesian version of crypto punks with local cultural elements', (SELECT id FROM users WHERE username = 'crypto_whale_id'), 'Digital Art', true),
('Batik Genesis', 'Traditional Indonesian batik patterns in NFT form', (SELECT id FROM users WHERE username = 'nft_creator_pro'), 'Digital Art', false);

-- The database is now ready for use with the PUYOK NFT Marketplace
-- Don't forget to:
-- 1. Set up Supabase project and run this script
-- 2. Configure environment variables in .env.local
-- 3. Set up Row Level Security (RLS) policies in Supabase dashboard
-- 4. Configure storage buckets for NFT images and KYC documents
