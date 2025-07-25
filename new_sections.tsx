{/* Pioneer NFT Reward System */}
      <motion.section
        className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-6 py-3 mb-6">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">PIONEER NFT SYSTEM</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Jadilah yang Pertama dan Dapatkan NFT Eksklusif!</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Setiap kali Anda melakukan aksi pertama di ekosistem PUYOK, Anda akan mendapatkan NFT Pioneer 1/1 yang langka dan tidak dapat diduplikasi.
            </p>
          </div>

          {/* Pioneer Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* First Transaction NFT */}
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 p-6 h-full hover:border-orange-400/50 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-orange-500/90 text-white font-bold">First Trade</Badge>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                    <span className="text-4xl relative z-10">🔥</span>
                    <div className="absolute bottom-2 right-2 text-xs font-bold text-white/80">#001</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">"First Trader" NFT</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Dapatkan NFT eksklusif untuk transaksi escrow pertama Anda di PUYOK. Bukti bahwa Anda adalah pioneer di platform ini.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* First Creator NFT */}
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 p-6 h-full hover:border-purple-400/50 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-purple-500/90 text-white font-bold">First Mint</Badge>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-6 bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                    <span className="text-4xl relative z-10">🎨</span>
                    <div className="absolute bottom-2 right-2 text-xs font-bold text-white/80">#001</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">"First Creator" NFT</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Mint NFT pertama di PUYOK dan raih badge Creator Pioneer yang menandai Anda sebagai pembuka jalan dunia seni digital.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Community Builder NFT */}
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 p-6 h-full hover:border-green-400/50 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500/90 text-white font-bold">First Invite</Badge>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
                    <span className="text-4xl relative z-10">🤝</span>
                    <div className="absolute bottom-2 right-2 text-xs font-bold text-white/80">#001</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">"Community Builder" NFT</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Undang 10+ teman ke PUYOK dan dapatkan NFT Community Builder sebagai pengakuan atas kontribusi membangun ekosistem.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Special Info Box */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/30 p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Kenapa NFT Pioneer Special?</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 font-bold">•</span>
                      <p><strong className="text-white">1/1 Exclusive:</strong> Setiap NFT Pioneer bersifat unik dan tidak dapat diduplikasi - hanya Anda yang memilikinya.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 font-bold">•</span>
                      <p><strong className="text-white">Bukti Sejarah:</strong> NFT ini adalah bukti digital bahwa Anda adalah bagian dari sejarah awal PUYOK.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 font-bold">•</span>
                      <p><strong className="text-white">Otomatis Terkirim:</strong> Tidak perlu claim manual, NFT langsung masuk ke wallet Anda setelah aksi selesai.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Community Governance Section */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Suara Anda Menentukan Masa Depan PUYOK</h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              Jika selama 30 hari tidak ada aksi baru yang memicu pencetakan NFT Pioneer, sistem akan otomatis membuka voting untuk menentukan fitur atau aksi baru. 
              Dengan demikian, PUYOK akan terus berkembang sesuai keinginan komunitas.
            </p>
          </div>

          {/* Governance Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Deteksi Stagnasi</h4>
              <p className="text-gray-400 text-sm">Sistem memantau aktivitas pioneer NFT selama 30 hari</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🗳️</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Buka Voting</h4>
              <p className="text-gray-400 text-sm">Proposal fitur baru dirilis ke komunitas untuk dipilih</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Implementasi</h4>
              <p className="text-gray-400 text-sm">Fitur terpilih langsung dikembangkan dan diluncurkan</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-12 py-4 text-lg"
              asChild
            >
              <Link href="/marketplace">
                🚀 Bergabunglah Sekarang dan Jadilah Bagian dari Sejarah!
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Gasless Transactions Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Flow Diagram */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-card/50 to-card/20 border border-border/50 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-white mb-6 text-center">Alur Transaksi Gasless</h4>
                
                {/* Step 1 */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-white">1. Pengguna</h5>
                    <p className="text-gray-400 text-sm">Tanda tangani transaksi dengan wallet</p>
                  </div>
                  <div className="text-blue-400 text-2xl">→</div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🖥️</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-white">2. Relayer PUYOK</h5>
                    <p className="text-gray-400 text-sm">Bayar gas & kirim ke blockchain</p>
                  </div>
                  <div className="text-green-400 text-2xl">→</div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⛓️</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-white">3. Blockchain</h5>
                    <p className="text-gray-400 text-sm">Transaksi berhasil dieksekusi</p>
                  </div>
                  <div className="text-purple-400 text-2xl">✅</div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-6 py-3 mb-6">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">GASLESS TECHNOLOGY</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Transaksi Tanpa Biaya, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Semudah Berbelanja Online</span>
              </h2>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                PUYOK menggunakan teknologi meta-transaksi canggih sehingga Anda tidak perlu memikirkan biaya gas. 
                Cukup tanda tangani transaksi dengan dompet Anda, dan biaya gas akan ditanggung oleh sistem.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Ramah Pengguna Baru</h4>
                    <p className="text-gray-400 text-sm">Tidak perlu memiliki cryptocurrency untuk biaya gas atau memahami konsep gas fee</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 font-bold text-sm">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Pengalaman Seperti Web2</h4>
                    <p className="text-gray-400 text-sm">Transaksi lebih cepat dan semulus aplikasi web biasa yang sudah familiar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold text-sm">🔒</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Keamanan Tetap Terjamin</h4>
                    <p className="text-gray-400 text-sm">Menggunakan standar EIP-2771 yang telah teraudit dan terbukti aman</p>
                  </div>
                </div>
              </div>

              {/* Technical Info */}
              <div className="bg-card/30 border border-border/50 rounded-lg p-6 mb-8">
                <h4 className="font-bold text-white mb-3">Teknologi di Balik Layar:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">Meta-Transactions</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">EIP-2771</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">MinimalForwarder</span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium">Signature Verification</span>
                </div>
              </div>

              {/* CTA */}
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-8 py-4 text-lg"
                asChild
              >
                <Link href="/marketplace">
                  🚀 Coba Sekarang, Rasakan Kemudahannya!
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
