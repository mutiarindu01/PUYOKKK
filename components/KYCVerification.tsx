"use client"

import { useState } from 'react'
import { Upload, CheckCircle, AlertCircle, User, FileText, Camera, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface KYCDocument {
  type: 'ktp' | 'passport' | 'selfie' | 'address_proof'
  file: File | null
  status: 'pending' | 'uploaded' | 'verified' | 'rejected'
  feedback?: string
}

export default function KYCVerification() {
  const [currentStep, setCurrentStep] = useState(1)
  const [kycLevel, setKycLevel] = useState<'basic' | 'advanced' | 'premium'>('basic')
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    occupation: '',
    monthlyIncome: ''
  })
  const [documents, setDocuments] = useState<Record<string, KYCDocument>>({
    ktp: { type: 'ktp', file: null, status: 'pending' },
    selfie: { type: 'selfie', file: null, status: 'pending' },
    address_proof: { type: 'address_proof', file: null, status: 'pending' }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const kycLevels = {
    basic: {
      title: 'Basic KYC',
      description: 'Verifikasi identitas dasar',
      benefits: ['Trading limit: Rp 50 juta/bulan', 'Withdrawal: Rp 10 juta/hari'],
      requirements: ['KTP/Passport', 'Foto Selfie'],
      fee: 'Gratis'
    },
    advanced: {
      title: 'Advanced KYC', 
      description: 'Verifikasi identitas lanjutan',
      benefits: ['Trading limit: Rp 500 juta/bulan', 'Withdrawal: Rp 100 juta/hari', 'Priority support'],
      requirements: ['KTP/Passport', 'Foto Selfie', 'Bukti Alamat', 'Info Pekerjaan'],
      fee: 'Rp 50.000'
    },
    premium: {
      title: 'Premium KYC',
      description: 'Verifikasi identitas premium',
      benefits: ['Trading unlimited', 'Withdrawal unlimited', 'VIP support', 'Early access features'],
      requirements: ['Semua dokumen Advanced', 'Video Call Verification', 'Referensi Bank'],
      fee: 'Rp 200.000'
    }
  }

  const handleFileUpload = (documentType: string, file: File) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: {
        ...prev[documentType],
        file,
        status: 'uploaded'
      }
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      // Update all documents to verified status
      setDocuments(prev => {
        const updated = { ...prev }
        Object.keys(updated).forEach(key => {
          if (updated[key].file) {
            updated[key].status = 'verified'
          }
        })
        return updated
      })
      setIsSubmitting(false)
      setCurrentStep(4) // Success step
    }, 3000)
  }

  const DocumentUpload = ({ type, title, description }: { type: string; title: string; description: string }) => {
    const doc = documents[type]
    
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-white font-medium text-sm">{title}</h4>
              <p className="text-slate-400 text-xs">{description}</p>
            </div>
            <Badge className={
              doc.status === 'verified' ? 'bg-green-500/20 text-green-400' :
              doc.status === 'uploaded' ? 'bg-blue-500/20 text-blue-400' :
              doc.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
              'bg-slate-500/20 text-slate-400'
            }>
              {doc.status === 'verified' && <CheckCircle className="w-3 h-3 mr-1" />}
              {doc.status === 'rejected' && <AlertCircle className="w-3 h-3 mr-1" />}
              {doc.status === 'pending' ? 'Required' : 
               doc.status === 'uploaded' ? 'Uploaded' :
               doc.status === 'verified' ? 'Verified' : 'Rejected'}
            </Badge>
          </div>
          
          <div className="relative">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(type, file)
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
              doc.file ? 'border-green-500 bg-green-500/10' : 'border-slate-600 hover:border-slate-500'
            }`}>
              {doc.file ? (
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">{doc.file.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Upload className="w-6 h-6" />
                  <span className="text-sm">Click to upload</span>
                </div>
              )}
            </div>
          </div>
          
          {doc.feedback && (
            <p className="text-red-400 text-xs mt-2">{doc.feedback}</p>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">KYC Verification</h1>
        <p className="text-slate-400">Verifikasi identitas untuk keamanan dan compliance</p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${
                step === currentStep ? "bg-blue-600 border-blue-600 text-white" :
                step < currentStep ? "bg-green-600 border-green-600 text-white" :
                "bg-slate-800 border-slate-600 text-slate-400"
              }`}>
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  step < currentStep ? "bg-green-600" : "bg-slate-600"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: KYC Level Selection */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Pilih Level KYC</h3>
              <p className="text-slate-400">Pilih level verifikasi sesuai kebutuhan trading Anda</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(kycLevels).map(([level, info]) => (
                <Card 
                  key={level}
                  className={`cursor-pointer transition-all duration-300 ${
                    kycLevel === level 
                      ? 'bg-blue-500/20 border-blue-500 ring-2 ring-blue-500/50' 
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => setKycLevel(level as typeof kycLevel)}
                >
                  <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      {info.title}
                    </CardTitle>
                    <p className="text-slate-400 text-sm">{info.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium text-sm mb-2">Benefits:</h4>
                      <ul className="text-slate-400 text-xs space-y-1">
                        {info.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm mb-2">Requirements:</h4>
                      <ul className="text-slate-400 text-xs space-y-1">
                        {info.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <FileText className="w-3 h-3 text-blue-400 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-slate-700">
                      <p className="text-green-400 font-medium text-sm">Fee: {info.fee}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center pt-6">
              <Button
                onClick={() => setCurrentStep(2)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Continue with {kycLevels[kycLevel].title}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
              <p className="text-slate-400">Masukkan informasi pribadi Anda</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Full Name</Label>
                <Input
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, fullName: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label className="text-white">Date of Birth</Label>
                <Input
                  type="date"
                  value={personalInfo.dateOfBirth}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Phone Number</Label>
                <Input
                  value={personalInfo.phoneNumber}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="+62 812-3456-7890"
                />
              </div>
              <div>
                <Label className="text-white">City</Label>
                <Input
                  value={personalInfo.city}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, city: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="Jakarta"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Address</Label>
              <Textarea
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, address: e.target.value }))}
                className="bg-slate-800 border-slate-600 text-white"
                placeholder="Full address"
                rows={3}
              />
            </div>

            {kycLevel !== 'basic' && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Occupation</Label>
                    <Select onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, occupation: value }))}>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white">Monthly Income</Label>
                    <Select onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, monthlyIncome: value }))}>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="under5m">&lt; Rp 5 juta</SelectItem>
                        <SelectItem value="5-10m">Rp 5-10 juta</SelectItem>
                        <SelectItem value="10-25m">Rp 10-25 juta</SelectItem>
                        <SelectItem value="25-50m">Rp 25-50 juta</SelectItem>
                        <SelectItem value="over50m">&gt; Rp 50 juta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="border-slate-600 text-slate-400"
              >
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Document Upload */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Document Upload</h3>
              <p className="text-slate-400">Upload dokumen yang diperlukan untuk verifikasi</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <DocumentUpload
                type="ktp"
                title="KTP/ID Card"
                description="Foto KTP yang jelas dan tidak blur"
              />
              <DocumentUpload
                type="selfie"
                title="Selfie with ID"
                description="Foto selfie sambil memegang KTP"
              />
              {kycLevel !== 'basic' && (
                <DocumentUpload
                  type="address_proof"
                  title="Address Proof"
                  description="Tagihan listrik/air/telepon (3 bulan terakhir)"
                />
              )}
            </div>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="border-slate-600 text-slate-400"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Success */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">KYC Submitted Successfully!</h3>
              <p className="text-slate-400">
                Your {kycLevels[kycLevel].title} verification has been submitted. 
                We'll review your documents within 1-3 business days.
              </p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-left max-w-md mx-auto">
              <h4 className="text-white font-medium mb-2">What's Next?</h4>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• We'll verify your documents</li>
                <li>• You'll receive email notification</li>
                <li>• Your limits will be updated upon approval</li>
                <li>• You can continue trading with current limits</li>
              </ul>
            </div>
            <Button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Return to Dashboard
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
