


      {/* Trending Tokens Section */}
      <section className="py-20 bg-card/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-blue-500 font-semibold">TRENDING SEKARANG</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Token yang Sedang Tren</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Cryptocurrency dengan volume trading tertinggi dan paling diminati saat ini</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Bitcoin Card */}
            <div>
              <Card className="bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-normal leading-7">
                      ₿
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-7">Bitcoin</h3>
                      <p className="text-sm text-gray-400 leading-5">BTC</p>
                    </div>
                  </div>
                  <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs font-semibold leading-4 px-2.5 py-0.5">🔥 #1</Badge>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Harga</span>
                    <span className="text-white font-bold">Rp 850.000.000</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-gray-400">24h Change</span>
                    <span className="text-green-400 font-medium">+2.15%</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-gray-400">Volume 24h</span>
                    <span className="text-white">Rp 2.1M</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-gray-400">Order Aktif</span>
                    <span className="text-white">23 orders</span>
                  </div>
                </div>

                <div className="bg-card/50 border border-border/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold leading-4">
                        CM
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium leading-5">@crypto_master</div>
                        <div className="text-gray-400 text-xs leading-4">98.5% sukses • 156 trades</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs px-2.5 py-0.5">Verified</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                    <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                    <span className="text-gray-400 text-xs ml-1">+2 lainnya</span>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">Beli Sekarang</Button>
              </Card>
            </div>

            {/* Ethereum Card */}
            <div>
              <Card className="bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-normal leading-7">
                      Ξ
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-7">Ethereum</h3>
                      <p className="text-sm text-gray-400 leading-5">ETH</p>
                    </div>
                  </div>
                  <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-xs font-semibold leading-4 px-2.5 py-0.5">🔥 #2</Badge>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Harga</span>
                    <span className="text-white font-bold">Rp 45.000.000</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-gray-400">24h Change</span>
                    <span className="text-red-400 font-medium">-1.8%</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-gray-400">Volume 24h</span>
                    <span className="text-white">Rp 1.8M</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-gray-400">Order Aktif</span>
                    <span className="text-white">18 orders</span>
                  </div>
                </div>

                <div className="bg-card/50 border border-border/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold leading-4">
                        ET
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium leading-5">@eth_trader</div>
                        <div className="text-gray-400 text-xs leading-4">97.2% sukses • 89 trades</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs px-2.5 py-0.5">Verified</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                    <span className="text-gray-400 text-xs ml-1">+3 lainnya</span>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">Beli Sekarang</Button>
              </Card>
            </div>

            {/* USDT Card */}
            <div>
              <Card className="bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-normal leading-7">
                      ₮
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-7">Tether</h3>
                      <p className="text-sm text-gray-400 leading-5">USDT</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-xs font-semibold leading-4 px-2.5 py-0.5">🔥 #3</Badge>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Harga</span>
                    <span className="text-white font-bold">Rp 15.750</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-gray-400">24h Change</span>
                    <span className="text-green-400 font-medium">+0.1%</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-gray-400">Volume 24h</span>
                    <span className="text-white">Rp 3.2M</span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span className="text-gray-400">Order Aktif</span>
                    <span className="text-white">34 orders</span>
                  </div>
                </div>

                <div className="bg-card/50 border border-border/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold leading-4">
                        ST
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium leading-5">@stable_pro</div>
                        <div className="text-gray-400 text-xs leading-4">99.1% sukses • 234 trades</div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs px-2.5 py-0.5">Verified</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                    <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                    <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                    <div className="w-6 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">B</div>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">Beli Sekarang</Button>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <a href="https://eec0a15f2e554f09a52ca736de5e6964-865decb6dea74217ab9b117f9.fly.dev/marketplace" className="inline-flex items-center justify-center bg-card border border-primary/50 rounded-md text-sm font-medium h-10 px-4 py-2 gap-2 hover:bg-primary/10 transition-colors">
              <span>Lihat Semua Token</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* NFT Featured Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-purple-500" />
            <span className="text-purple-500 font-semibold">KOLEKSI UNGGULAN</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">NFT Pilihan Minggu Ini</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Koleksi NFT terpilih dengan kualitas dan nilai investasi terbaik dari kreator Indonesia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* NFT 1 */}
          <div>
            <Card className="bg-card border border-border overflow-hidden hover:border-purple-500/50 transition-all duration-300">
              <div className="relative">
                <img src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2F1234567890abcdef" alt="Mystical Dragon #001" className="w-full h-48 object-cover block" />
                <Badge className="absolute top-2 right-2 bg-red-500/90 text-white border-none text-xs font-semibold leading-4 px-2.5 py-0.5">Legendary</Badge>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 leading-7">Mystical Dragon #001</h3>
                <p className="text-sm text-gray-400 mb-3 leading-5">Indonesian Mythology Collection</p>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm leading-5">Harga</span>
                    <span className="text-white font-bold">Rp 25.000.000</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-400 text-sm leading-5">Pemilik</span>
                    <span className="text-sm leading-5">@dragon_artist</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                  <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                  <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Ajukan Penawaran</Button>
              </div>
            </Card>
          </div>

          {/* NFT 2 */}
          <div>
            <Card className="bg-card border border-border overflow-hidden hover:border-purple-500/50 transition-all duration-300">
              <div className="relative">
                <img src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2Fabcdef1234567890" alt="Batik Genesis #042" className="w-full h-48 object-cover block" />
                <Badge className="absolute top-2 right-2 bg-orange-500/90 text-white border-none text-xs font-semibold leading-4 px-2.5 py-0.5">Rare</Badge>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 leading-7">Batik Genesis #042</h3>
                <p className="text-sm text-gray-400 mb-3 leading-5">Traditional Art Digital</p>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm leading-5">Harga</span>
                    <span className="text-white font-bold">Rp 15.000.000</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-400 text-sm leading-5">Pemilik</span>
                    <span className="text-sm leading-5">@batik_creator</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                  <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Ajukan Penawaran</Button>
              </div>
            </Card>
          </div>

          {/* NFT 3 */}
          <div>
            <Card className="bg-card border border-border overflow-hidden hover:border-purple-500/50 transition-all duration-300">
              <div className="relative">
                <img src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2F0987654321fedcba" alt="Wayang Punk #117" className="w-full h-48 object-cover block" />
                <Badge className="absolute top-2 right-2 bg-blue-500/90 text-white border-none text-xs font-semibold leading-4 px-2.5 py-0.5">Epic</Badge>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 leading-7">Wayang Punk #117</h3>
                <p className="text-sm text-gray-400 mb-3 leading-5">Modern Traditional Fusion</p>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm leading-5">Harga</span>
                    <span className="text-white font-bold">Rp 12.000.000</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-400 text-sm leading-5">Pemilik</span>
                    <span className="text-sm leading-5">@wayang_modern</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                  <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                  <div className="w-6 h-6 bg-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">O</div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Ajukan Penawaran</Button>
              </div>
            </Card>
          </div>

          {/* NFT 4 */}
          <div>
            <Card className="bg-card border border-border overflow-hidden hover:border-purple-500/50 transition-all duration-300">
              <div className="relative">
                <img src="https://cdn.builder.io/api/v1/image/assets%2Faa193ae356b547f9b743f5a851093612%2Ffedcba0987654321" alt="Cyberpunk Jakarta #055" className="w-full h-48 object-cover block" />
                <Badge className="absolute top-2 right-2 bg-green-500/90 text-white border-none text-xs font-semibold leading-4 px-2.5 py-0.5">Common</Badge>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 leading-7">Cyberpunk Jakarta #055</h3>
                <p className="text-sm text-gray-400 mb-3 leading-5">Future City Collection</p>
                <div className="mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm leading-5">Harga</span>
                    <span className="text-white font-bold">Rp 8.500.000</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-400 text-sm leading-5">Pemilik</span>
                    <span className="text-sm leading-5">@cyber_artist</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                  <div className="w-6 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Ajukan Penawaran</Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <a href="https://eec0a15f2e554f09a52ca736de5e6964-865decb6dea74217ab9b117f9.fly.dev/marketplace?tab=nft" className="inline-flex items-center justify-center bg-card border border-purple-500/50 rounded-md text-purple-400 text-sm font-medium h-10 px-4 py-2 gap-2 hover:bg-purple-500/10 transition-colors">
            <span>Jelajahi Semua NFT</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Enhanced: Kenapa PUYOK Berbeda Section */}
      <motion.section
        id="why-different"
        className="py-32 bg-gradient-to-br from-red-950/20 via-card/30 to-green-950/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-full px-6 py-3 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <span className="text-orange-500 font-semibold">PERBANDINGAN KOMPETITOR</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              Kenapa PUYOK Jauh Lebih Baik?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Platform global bikin ribet dan mahal. PUYOK hadir sebagai solusi lokal yang benar-benar memahami kebutuhan Anda.
            </p>
          </div>

          {/* Interactive Fee Calculator */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-orange-500/5 via-primary/5 to-green-500/5 border border-primary/20 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-3">💰 Kalkulator Penghematan</h3>
                <p className="text-gray-300">Lihat berapa banyak yang bisa Anda hemat dengan PUYOK</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-3 font-medium">Nilai Transaksi Anda:</label>
                  <div className="relative">
                    <input
                      type="range"
                      min="500000"
                      max="100000000"
                      value={transactionValue}
                      onChange={(e) => setTransactionValue(parseInt(e.target.value))}
                      className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #10B981 0%, #10B981 ${((transactionValue - 500000) / (100000000 - 500000)) * 100}%, #374151 ${((transactionValue - 500000) / (100000000 - 500000)) * 100}%, #374151 100%)`
                      }}
                    />
                    <div className="flex justify-between text-sm text-gray-400 mt-2">
                      <span>Rp 500K</span>
                      <span className="text-primary font-bold">
                        Rp {(transactionValue / 1000000).toFixed(transactionValue >= 1000000 ? 0 : 1)}M
                      </span>
                      <span>Rp 100M</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                    <div className="text-red-400 text-sm font-medium mb-2">Platform Global</div>
                    <div className="text-red-500 text-2xl font-bold mb-1">
                      Rp {((transactionValue * 0.15) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-red-400 text-xs">Fee 15%</div>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <div className="text-primary text-sm font-medium mb-2">PUYOK</div>
                    <div className="text-primary text-2xl font-bold mb-1">
                      Rp {((transactionValue * 0.03) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-primary text-xs">Fee 3%</div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                    <div className="text-green-400 text-sm font-medium mb-2">Penghematan Anda</div>
                    <div className="text-green-500 text-2xl font-bold mb-1">
                      Rp {((transactionValue * 0.12) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-green-400 text-xs">Hemat {Math.round(((0.15 - 0.03) / 0.15) * 100)}%!</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Enhanced Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Platform Global */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-red-950/30 to-orange-950/30 border border-red-500/20 p-8 text-center relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">MAHAL</span>
                </div>

                <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Platform Global</h3>
                <Badge variant="destructive" className="mb-6">
                  Rumit & Mahal
                </Badge>

                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-red-500 text-sm">����</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Fee Menggerus Keuntungan</p>
                      <p className="text-red-400 text-sm">Hingga 15% dari nilai transaksi</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-red-500 text-sm">⏳</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Verifikasi Berbelit-belit</p>
                      <p className="text-red-400 text-sm">KYC bisa sampai berminggu-minggu</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-red-500 text-sm">🚫</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Pembayaran Ribet</p>
                      <p className="text-red-400 text-sm">Tidak support DANA, GoPay, OVO</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-red-500 text-sm">🗣️</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Support Bahasa Asing</p>
                      <p className="text-red-400 text-sm">Sulit komunikasi saat ada masalah</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* PUYOK */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="bg-gradient-to-br from-primary/20 to-green-500/20 border border-primary p-8 text-center relative overflow-hidden shadow-lg shadow-primary/20 h-full">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-green-500"></div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">JUARA!</span>
                </div>

                <div className="w-20 h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">������🇩</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">PUYOK</h3>
                <Badge className="mb-6 bg-primary text-primary-foreground">
                  Lokal & Menguntungkan
                </Badge>

                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm">💰</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Hemat 80% Biaya Transaksi</p>
                      <p className="text-primary text-sm">Fee hanya 2-3%, keuntungan maksimal</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm">⚡</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Daftar Instan</p>
                      <p className="text-primary text-sm">Cukup nomor HP, langsung trading</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm">📱</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Pembayaran Familiar</p>
                      <p className="text-primary text-sm">DANA, GoPay, OVO, Bank Lokal</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm">🗨��</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Support Bahasa Indonesia</p>
                      <p className="text-primary text-sm">24/7 siap bantu dalam bahasa kita</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Social Proof & Testimonial */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-green-500/5 border border-primary/20 p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Quote className="w-6 h-6 text-primary" />
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">PENGHEMATAN NYATA</span>
                  </div>
                  <blockquote className="text-white font-medium text-lg mb-3">
                    "Berhasil hemat 12 juta rupiah dengan fee rendah PUYOK! Dulu pake platform lain habis buat biaya admin."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      B
                    </div>
                    <div>
                      <div className="text-white font-medium">@budi_nft_art</div>
                      <div className="text-gray-400 text-sm">NFT Creator • 89 Transaksi Sukses</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500 mb-1">Rp 12M</div>
                  <div className="text-green-400 text-sm">Total Penghematan</div>
                </div>
              </div>
            </Card>
          </motion.div>


        </div>
      </motion.section>

      {/* Unified PUYOK Value Proposition - Part 1: Benefits */}
      <motion.section
        className="scroll-section-compact bg-gradient-to-br from-background via-card/20 to-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <span className="text-green-500 font-semibold">MENGAPA PILIH PUYOK</span>
            </div>
            <ScrollFloat
              animationDuration={1.2}
              ease="back.inOut(2)"
              scrollStart="center bottom+=30%"
              scrollEnd="bottom bottom-=20%"
              stagger={0.05}
              containerClassName="mb-6"
              textClassName="text-4xl md:text-5xl font-bold text-white"
            >
              3 Keunggulan yang Anda Rasakan
            </ScrollFloat>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Dari kemudahan pembayaran hingga kepastian nilai - inilah mengapa ribuan pengguna memilih PUYOK
            </p>
          </div>

          <div className="compact-features-grid">
            <motion.div
              className="compact-feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl">���</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Bayar dengan Dompet Digital Favorit</h3>
                <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Beli NFT langsung dari saldo DANA-mu. Jual token dan terima uang di GoPay dalam hitungan menit. Tidak perlu belajar cara baru.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex justify-center gap-3 mb-2">
                    <span className="text-2xl">💳</span>
                    <span className="text-2xl">🟢</span>
                    <span className="text-2xl">🟣</span>
                    <span className="text-2xl">🏦</span>
                  </div>
                  <div className="text-primary text-sm font-medium">4+ Metode Pembayaran</div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Dapatkan Rupiah Penuh</h3>
                <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Jual hasil karya digitalmu dan langsung dapat Rupiah di rekening. Tidak ada konversi ribet atau fee tersembunyi.
                </p>
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-500 mb-2">Rp</div>
                  <div className="text-xs text-gray-400">Platform Lain: $8,200</div>
                  <div className="text-sm text-green-500 font-semibold">PUYOK: Rp 125,000,000</div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl">😴</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Tidur Nyenyak</h3>
                <p className="text-gray-300 leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sistem escrow otomatis melindungi setiap transaksi. Pembeli dapat aset setelah bayar, penjual dapat uang setelah aset terkirim.
                </p>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <Shield className="w-6 h-6 text-blue-500" />
                    <span className="text-blue-500 font-semibold">100% Aman</span>
                  </div>
                  <div className="text-xs text-gray-400">Keamanan: ████████ 100%</div>
                  <div className="text-xs text-gray-400">Kepuasan: ███████▌ 98%</div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tutorial Section with ScrollFloat */}
      <motion.section
        className="py-20 bg-gradient-to-br from-purple-900/10 to-blue-900/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <span className="text-blue-500 font-semibold">TUTORIAL MUDAH</span>
            </div>

            <ScrollFloat
              animationDuration={1.5}
              ease="power2.inOut"
              scrollStart="center bottom+=40%"
              scrollEnd="bottom bottom-=30%"
              stagger={0.04}
              containerClassName="mb-6"
              textClassName="text-3xl md:text-4xl font-bold text-white"
            >
              Cara Menggunakan PUYOK
            </ScrollFloat>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Panduan sederhana untuk memulai transaksi aman di PUYOK
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <motion.div
              className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/20 rounded-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 font-bold text-lg">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">📱 Daftar dengan Nomor HP</h3>
                <p className="text-gray-300">
                  Cukup masukkan nomor HP, verifikasi OTP, dan langsung bisa mulai trading. Tidak ada KYC yang merepotkan.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 font-bold text-lg">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">💰 Pilih Metode Pembayaran</h3>
                <p className="text-gray-300">
                  Bayar pakai DANA, GoPay, OVO, atau transfer bank. Semua metode yang sudah familiar dengan Anda.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="flex items-start gap-4 p-6 bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 font-bold text-lg">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">🛡️ Escrow Otomatis Aktif</h3>
                <p className="text-gray-300">
                  Sistem escrow melindungi kedua belah pihak. Pembeli dapat aset setelah bayar, penjual dapat uang setelah transfer aset.
                </p>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="flex items-start gap-4 p-6 bg-gradient-to-r from-orange-500/5 to-red-500/5 border border-orange-500/20 rounded-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-400 font-bold text-lg">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">🏆 Dapatkan Pioneer NFT</h3>
                <p className="text-gray-300">
                  NFT 1/1 eksklusif otomatis dikirim ke wallet Anda untuk setiap milestone pertama yang dicapai.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
              asChild
            >
              <Link href="/marketplace">
                🚀 Mulai Sekarang
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>



      {/* Simple CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-primary/10 to-purple-600/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Siap Mulai Trading?
          </h2>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
            Bergabunglah dengan ribuan trader yang sudah mempercayai PUYOK untuk transaksi aset digital mereka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg" asChild>
              <Link href="/marketplace">
                🛒 Mulai Beli Aset
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 text-lg"
              asChild
            >
              <Link href="/create-listing">
                💰 Jual Aset Anda
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <Footer />

      {/* Scroll to Top Bubble */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center transition-all duration-300 ${
          showScrollToTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollToTop ? 1 : 0,
          scale: showScrollToTop ? 1 : 0.75
        }}
        whileHover={{
          scale: 1.1,
          y: -2,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <motion.div
          animate={{
            y: [0, -3, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowRight className="w-5 h-5 transform -rotate-90" />
        </motion.div>

        {/* Subtle pulse ring */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
      </motion.button>
    </motion.div>
  )
}
