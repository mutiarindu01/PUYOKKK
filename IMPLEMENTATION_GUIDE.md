# 🚀 PUYOK AI OCR Implementation Guide

Panduan lengkap untuk mengimplementasikan sistem AI OCR verification dari simulasi menjadi production-ready.

## 📋 Prerequisites

- [x] Project Next.js sudah ada
- [x] Supabase account dan project
- [x] Google Cloud account (untuk Vision API)
- [x] Basic knowledge tentang environment variables

## 🎯 Step 1: Database Setup

### 1.1 Update Supabase Database

1. Buka [Supabase Dashboard](https://app.supabase.com)
2. Pilih project PUYOK Anda
3. Klik "SQL Editor" di sidebar
4. Copy paste dan jalankan script dari `database/init.sql` bagian AI verification:

```sql
-- AI Verification tables for automatic payment proof verification
CREATE TABLE payment_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT NOT NULL,
    verification_result JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'manual_review')),
    confidence_score DECIMAL(5,4),
    image_url TEXT,
    processed_by TEXT DEFAULT 'ai_system',
    processing_time_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE manual_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT NOT NULL,
    verification_id UUID REFERENCES payment_verifications(id),
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewer_id UUID REFERENCES users(id),
    reviewer_notes TEXT,
    review_decision TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

CREATE TABLE ai_training_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    ground_truth_data JSONB NOT NULL,
    extracted_data JSONB,
    verification_accuracy DECIMAL(5,4),
    feedback_type TEXT CHECK (feedback_type IN ('correct', 'incorrect', 'improved')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_payment_verifications_order_id ON payment_verifications(order_id);
CREATE INDEX idx_payment_verifications_status ON payment_verifications(status);
CREATE INDEX idx_manual_reviews_status ON manual_reviews(status);
```

### 1.2 Setup Storage Bucket

1. Di Supabase dashboard, klik "Storage"
2. Create new bucket bernama `payment-proofs`
3. Set bucket sebagai public atau private (recommend: private dengan authenticated access)

## 🎯 Step 2: Google Vision API Setup

### 2.1 Create Google Cloud Project

1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Create new project atau pilih existing project
3. Nama project: `puyok-ai-ocr` (atau sesuai preferensi)

### 2.2 Enable Vision API

1. Di Cloud Console, klik "APIs & Services" > "Library"
2. Search "Vision API"
3. Klik "Cloud Vision API" dan klik "Enable"

### 2.3 Create Service Account

1. Klik "APIs & Services" > "Credentials"
2. Klik "Create Credentials" > "Service Account"
3. Service account name: `puyok-ocr-service`
4. Grant role: "Project" > "Editor" atau "Cloud Vision API User"
5. Klik "Done"

### 2.4 Generate Service Account Key

1. Klik service account yang baru dibuat
2. Klik tab "Keys"
3. Klik "Add Key" > "Create new key"
4. Pilih format "JSON"
5. Download file JSON (SIMPAN AMAN!)

### 2.5 Extract Credentials

Dari file JSON yang didownload, extract:
- `project_id`
- `client_email` 
- `private_key`

## 🎯 Step 3: Environment Variables Setup

### 3.1 Copy Environment Template

```bash
cp .env.example .env.local
```

### 3.2 Fill Required Variables

Edit `.env.local`:

```env
# Google Vision AI (WAJIB untuk OCR)
GOOGLE_PROJECT_ID=your_google_cloud_project_id
GOOGLE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----"

# Supabase (sudah ada)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# File Upload
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=payment-proofs
```

⚠️ **PENTING**: `GOOGLE_PRIVATE_KEY` harus dalam format string dengan `\\n` untuk newlines.

## 🎯 Step 4: Install Dependencies

### 4.1 Install Google Vision Package

```bash
npm install @google-cloud/vision
```

### 4.2 Install Type Definitions (jika menggunakan TypeScript)

```bash
npm install --save-dev @types/node
```

## 🎯 Step 5: Update Code untuk Production

### 5.1 Update AIVerificationUpload Component

Edit `components/AIVerificationUpload.tsx`, ganti import:

```typescript
// Ganti ini:
import AIProofVerification from "@/lib/ai-ocr-verification"

// Dengan ini:
import RealAIVerification from "@/lib/real-ai-verification"

// Dan ganti instance:
const aiVerification = new RealAIVerification()
```

### 5.2 Update Payment Page

Edit `app/marketplace/[id]/payment/page.tsx`, sama seperti di atas.

## 🎯 Step 6: Testing

### 6.1 Test dengan Sample Image

1. Siapkan bukti transfer bank (JPG/PNG)
2. Pastikan bukti transfer mengandung:
   - Nominal transfer yang sesuai
   - Kode referensi (PUYOK-XXXXX)
   - Tanggal hari ini
   - Nomor rekening tujuan

### 6.2 Test OCR Accuracy

```bash
# Test di development
npm run dev

# Buka marketplace dan coba upload bukti transfer
# Check console untuk log OCR hasil
```

### 6.3 Monitor Database

Check Supabase dashboard table `payment_verifications` untuk melihat hasil AI.

## 🎯 Step 7: Deployment ke Production

### 7.1 Vercel Deployment

1. Push code ke GitHub
2. Di Vercel dashboard, import project
3. Set environment variables di Vercel:
   - Copy semua dari `.env.local`
   - Pastikan `GOOGLE_PRIVATE_KEY` di-escape dengan benar

### 7.2 Set Production URLs

Update environment variables untuk production:
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
# dll...
```

## 🔧 Troubleshooting

### Error: "Could not load the default credentials"

**Solution**: Pastikan environment variables Google Cloud sudah benar.

```bash
# Test credentials
node -e "console.log(JSON.parse(process.env.GOOGLE_PRIVATE_KEY || '{}'))"
```

### Error: "Vision API quota exceeded"

**Solution**: 
1. Check quota di Google Cloud Console
2. Enable billing jika belum
3. Vision API free tier: 1000 requests/month

### Error: "Database connection failed"

**Solution**: Check Supabase connection dan pastikan RLS policies allow insert ke table `payment_verifications`.

## 📊 Monitoring & Analytics

### Setup Error Tracking

```bash
npm install @sentry/nextjs
```

Add to `.env.local`:
```env
SENTRY_DSN=your_sentry_dsn
```

### Monitor OCR Accuracy

Check admin dashboard `/rafli/admin/ai-verification` untuk:
- Success rate
- Average processing time  
- Manual review rate

## 🚀 Production Optimization

### 1. Image Optimization

```typescript
// Add image compression before OCR
import sharp from 'sharp'

const optimizedBuffer = await sharp(imageBuffer)
  .resize(1200, 1600, { fit: 'inside' })
  .jpeg({ quality: 85 })
  .toBuffer()
```

### 2. Caching Results

```typescript
// Cache OCR results untuk gambar yang sama
const imageHash = crypto.createHash('md5').update(imageBuffer).digest('hex')
// Check cache sebelum OCR
```

### 3. Rate Limiting

```typescript
// Add rate limiting untuk prevent abuse
// Max 10 verification per user per hour
```

## ✅ Checklist Implementation

- [ ] Database tables created di Supabase
- [ ] Google Vision API enabled dan credentials setup
- [ ] Environment variables configured  
- [ ] Dependencies installed
- [ ] Code updated untuk production
- [ ] Testing dengan sample images
- [ ] Deployment ke Vercel/production
- [ ] Monitoring setup
- [ ] Error tracking configured

## 💰 Cost Estimation

**Google Vision API**:
- Free tier: 1,000 requests/month
- Paid: $1.50 per 1,000 requests
- Estimasi: 1000 verifikasi/bulan = FREE

**Supabase Storage**:
- Free tier: 1GB storage
- Paid: $0.021 per GB/month

**Total monthly cost untuk 1000 verifikasi: ~$0 (dalam free tier)**

## 🆘 Support

Jika ada masalah:
1. Check logs di Vercel/console
2. Verify environment variables
3. Test API credentials secara terpisah
4. Check Supabase table permissions

**Ready to implement! 🚀**
