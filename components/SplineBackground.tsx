"use client"

import { useEffect, useRef } from 'react'

interface SplineBackgroundProps {
  scene?: string
  className?: string
  style?: React.CSSProperties
}

// For actual Spline integration, uncomment and install @splinetool/react-spline
// import { Suspense, lazy } from 'react'
// const Spline = lazy(() => import('@splinetool/react-spline'))

export default function SplineBackground({
  scene = "https://prod.spline.design/your-scene-id/scene.splinecode",
  className = "",
  style = {}
}: SplineBackgroundProps) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10">
        <div className="text-center p-8">
          <div className="w-12 h-12 mx-auto mb-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">
            Spline 3D Background
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Install @splinetool/react-spline untuk scene sesungguhnya
          </p>
        </div>
      </div>
    </div>
  )
}

// Component untuk menampilkan preview/demo tanpa scene aktual
export function SplineBackgroundDemo() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Simulated 3D floating elements */}
      <div className="absolute inset-0 opacity-30">
        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${3 + Math.random() * 2}s ease-in-out infinite ${i * 0.5}s`
            }}
          >
            <div
              className="w-8 h-8 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-lg transform rotate-45"
              style={{
                animation: `float ${4 + Math.random() * 2}s ease-in-out infinite ${i * 0.3}s`
              }}
            />
          </div>
        ))}
        
        {/* Floating circles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${4 + Math.random() * 2}s ease-in-out infinite ${i * 0.7}s`
            }}
          >
            <div
              className="w-12 h-12 bg-gradient-to-br from-pink-400/15 to-blue-600/15 rounded-full"
              style={{
                animation: `float ${5 + Math.random() * 2}s ease-in-out infinite reverse ${i * 0.4}s`
              }}
            />
          </div>
        ))}
      </div>
      
      {/* CSS-only 3D effect */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotateZ(0deg);
          }
          33% {
            transform: translateY(-10px) translateX(5px) rotateZ(2deg);
          }
          66% {
            transform: translateY(5px) translateX(-5px) rotateZ(-1deg);
          }
        }
      `}</style>
    </div>
  )
}
