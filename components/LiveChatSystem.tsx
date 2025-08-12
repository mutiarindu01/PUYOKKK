"use client"

import { useState, useEffect, useRef } from 'react'
import { Send, Paperclip, Image, Smile, MoreVertical, Phone, Video } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface ChatMessage {
  id: string
  senderId: string
  receiverId: string
  orderId: string
  message: string
  type: 'text' | 'image' | 'file' | 'payment_proof' | 'system'
  timestamp: string
  isRead: boolean
  fileUrl?: string
  fileName?: string
}

interface ChatUser {
  id: string
  username: string
  avatar: string
  isOnline: boolean
  lastSeen: string
}

export default function LiveChatSystem({ orderId }: { orderId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'buyer123',
      receiverId: 'seller456',
      orderId,
      message: 'Halo, saya tertarik dengan NFT ini. Apakah masih tersedia?',
      type: 'text',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isRead: true
    },
    {
      id: '2',
      senderId: 'seller456',
      receiverId: 'buyer123',
      orderId,
      message: 'Halo! Ya masih tersedia. Ini NFT original dan sudah verified.',
      type: 'text',
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      isRead: true
    },
    {
      id: '3',
      senderId: 'buyer123',
      receiverId: 'seller456',
      orderId,
      message: 'Baik, saya mau beli. Bagaimana prosesnya?',
      type: 'text',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      isRead: true
    },
    {
      id: '4',
      senderId: 'system',
      receiverId: '',
      orderId,
      message: 'Order telah dibuat dan escrow diaktifkan. Silakan lakukan pembayaran.',
      type: 'system',
      timestamp: new Date(Date.now() - 1200000).toISOString(),
      isRead: true
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [otherUser] = useState<ChatUser>({
    id: 'seller456',
    username: 'CryptoArtist_ID',
    avatar: 'https://cdn.builder.io/api/v1/image/assets%2Fe1dcaf7f92ea487e93771f915bcf348b%2Fd2d15b9f61e84d8da63ce09eac835d7c',
    isOnline: true,
    lastSeen: 'Now'
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage) {
      setIsTyping(true)
      const timer = setTimeout(() => setIsTyping(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [newMessage])

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'current_user',
      receiverId: otherUser.id,
      orderId,
      message: newMessage,
      type: 'text',
      timestamp: new Date().toISOString(),
      isRead: false
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replies = [
        'Terima kasih! Saya akan proses segera.',
        'Baik, sudah saya cek. Semuanya oke.',
        'Siap, tunggu sebentar ya.',
        'Oke, proses pembayaran sudah saya terima.',
        'NFT sudah saya transfer. Cek wallet Anda.'
      ]
      
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: otherUser.id,
        receiverId: 'current_user',
        orderId,
        message: replies[Math.floor(Math.random() * replies.length)],
        type: 'text',
        timestamp: new Date().toISOString(),
        isRead: false
      }

      setMessages(prev => [...prev, reply])
    }, 2000)
  }

  const uploadFile = (type: 'image' | 'file') => {
    fileInputRef.current?.click()
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getMessageStyle = (senderId: string) => {
    if (senderId === 'system') {
      return 'bg-slate-700/50 text-slate-300 text-center mx-auto max-w-sm'
    }
    return senderId === 'current_user'
      ? 'bg-blue-600 text-white ml-auto'
      : 'bg-slate-700 text-white'
  }

  return (
    <div className="flex flex-col h-96 bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-8 h-8">
              <AvatarImage src={otherUser.avatar} />
              <AvatarFallback>{otherUser.username[0]}</AvatarFallback>
            </Avatar>
            {otherUser.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
            )}
          </div>
          <div>
            <h4 className="text-white font-medium text-sm">{otherUser.username}</h4>
            <p className="text-xs text-slate-400">
              {otherUser.isOnline ? 'Online' : `Last seen ${otherUser.lastSeen}`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-1 h-8 w-8">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-1 h-8 w-8">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-1 h-8 w-8">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.senderId === 'current_user' ? 'justify-end' : 'justify-start'} ${message.type === 'system' ? 'justify-center' : ''}`}
            >
              <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${getMessageStyle(message.senderId)}`}>
                {message.type === 'system' && (
                  <div className="flex items-center gap-2 justify-center">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 text-xs">
                      System
                    </Badge>
                  </div>
                )}
                <p className="break-words">{message.message}</p>
                <p className={`text-xs mt-1 ${
                  message.senderId === 'current_user' ? 'text-blue-100' : 'text-slate-400'
                } ${message.type === 'system' ? 'text-center' : ''}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-slate-700 text-slate-400 px-3 py-2 rounded-lg text-sm max-w-xs">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-slate-700 bg-slate-800/30">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => uploadFile('image')}
            className="text-slate-400 hover:text-white p-2 h-8 w-8"
          >
            <Image className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => uploadFile('file')}
            className="text-slate-400 hover:text-white p-2 h-8 w-8"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400 text-sm"
          />
          
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white p-2 h-8 w-8"
          >
            <Smile className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 h-8 w-8"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
          onChange={(e) => {
            // Handle file upload
            console.log('File selected:', e.target.files?.[0])
          }}
        />
      </div>
    </div>
  )
}
