'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Book, Gift, Star, Trophy, Palette,Crown } from "lucide-react"
import Image from 'next/image'
import { Noto_Kufi_Arabic } from 'next/font/google'

const notoKufiArabic = Noto_Kufi_Arabic({
  weight: ['200', '400'],
  subsets: ['arabic'],
  display: 'swap',
})

const children = [
  
  {
    name: "بنان",
    avatar: "/images/benan.png",
    points: 1400,
    skills: ["الكتابة", "الفنون", "القيادة"],
    gifts: [
      { name: "أدوات رسم", progress: 90 },
      { name: "مجموعة كتب", progress: 50 },
    ]
  },
  
  {
    name: "حمزة",
    avatar: "/images/hamza.png",
    points: 980,
    skills: ["الرياضة", "العلوم", "الحاسوب"],
    gifts: [
      { name: "كرة قدم", progress: 60 },
      { name: "روبوت تعليمي", progress: 30 },
    ]
  },
  {
    name: "سارة",
    avatar: "/images/sare.png",
    points: 1250,
    skills: ["الرسم", "القراءة", "الموسيقى"],
    gifts: [
      { name: "دمية", progress: 75 },
      { name: "كتب قصص", progress: 40 },
    ]
  }
]

type ColorScheme = {
  background: string
  cardHeader: string[]
  bubbles: string[]
  text: string
  button: string
  progress: string
}

type ColorSchemes = {
  [key: string]: ColorScheme
}

const colorSchemes: ColorSchemes = {
  default: {
    background: "from-blue-50 to-purple-50",
    cardHeader: ["bg-pink-500", "bg-purple-500", "bg-blue-500"],
    bubbles: ['#FF9FF3', '#FECA57', '#54A0FF', '#5ED4F3', '#FF6B6B', '#C8D6E5'],
    text: "text-purple-800",
    button: "bg-purple-500",
    progress: "bg-purple-500",
  },
  ocean: {
    background: "from-cyan-50 to-blue-50",
    cardHeader: ["bg-cyan-500", "bg-blue-500", "bg-teal-500"],
    bubbles: ['#48dbfb', '#54a0ff', '#5f27cd', '#00d2d3', '#01a3a4', '#341f97'],
    text: "text-blue-800",
    button: "bg-blue-500",
    progress: "bg-blue-500",
  },
  
  sunset: {
    background: "from-orange-50 to-red-50",
    cardHeader: ["bg-orange-500", "bg-red-500", "bg-yellow-500"],
    bubbles: ['#ff9ff3', '#feca57', '#ff6b6b', '#ff9ff3', '#feca57', '#ff6b6b'],
    text: "text-red-800",
    button: "bg-red-500",
    progress: "bg-red-500",
  },
  forest: {
    background: "from-green-50 to-emerald-50",
    cardHeader: ["bg-green-500", "bg-emerald-500", "bg-lime-500"],
    bubbles: ['#1dd1a1', '#10ac84', '#2ecc71', '#26de81', '#54a0ff', '#48dbfb'],
    text: "text-emerald-800",
    button: "bg-green-500",
    progress: "bg-green-500",
  },
  lavender: {
    background: "from-purple-50 to-pink-50",
    cardHeader: ["bg-purple-500", "bg-pink-500", "bg-fuchsia-500"],
    bubbles: ['#a29bfe', '#dfe6e9', '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8'],
    text: "text-fuchsia-800",
    button: "bg-pink-500",
    progress: "bg-pink-500",
  },
}

interface SparklesProps {
  isActive: boolean
}

const getHighestScore = (children: { points: number }[]) => {
  return Math.max(...children.map(child => child.points))
}

const Sparkles = ({ isActive }: SparklesProps) => {
  const [sparkles, setSparkles] = useState<Array<{top: number, right: number, delay: number}>>([]);

  useEffect(() => {
    // Generate sparkle positions only on client-side
    setSparkles(
      [...Array(20)].map(() => ({
        top: Math.random() * 100,
        right: Math.random() * 100,
        delay: Math.random() * 0.5,
      }))
    );
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className={`absolute inset-0 pointer-events-none ${isActive ? 'animate-sparkle' : 'hidden'}`}>
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
          style={{
            top: `${sparkle.top}%`,
            right: `${sparkle.right}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

interface BubbleProps {
  size: string
  color: string
  duration: number
  delay: number
  position: { top: string, right: string }
}

const Bubble = ({ size, color, duration, delay, position }: BubbleProps) => (
  <div
    className="absolute rounded-full opacity-50"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      animation: `float ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      top: position.top,
      right: position.right,
      '--tx': `${Math.random() * 200 - 150}px`,
      '--ty': `${Math.random() * 200 - 150}px`,
    } as React.CSSProperties}
  />
)

interface BubbleBackgroundProps {
  bubbleColors: string[]
}

const BubbleBackground = ({ bubbleColors }: BubbleBackgroundProps) => {
  const [bubbles, setBubbles] = useState<Array<{
    size: string;
    color: string;
    duration: number;
    delay: number;
    position: { top: string; right: string };
  }>>([]);

  useEffect(() => {
    const newBubbles = Array(40).fill(null).map(() => ({
      size: `${Math.random() * 150 + 20}px`,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 1,
      position: {
        top: `${Math.random() * 100}%`,
        right: `${Math.random() * 100}%`,
      },
    }));
    setBubbles(newBubbles);
  }, [bubbleColors]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble, i) => (
        <Bubble key={i} {...bubble} />
      ))}
    </div>
  );
}

interface RTLProgressProps {
  value: number
  className?: string
  color: string
}

const RTLProgress = ({ value, className = '', color }: RTLProgressProps) => {
  return (
    <div className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-300 ease-in-out ${color}`}
        style={{
          width: `${value}%`,
          marginRight: `${100 - value}%`
        }}
      />
    </div>
  )
}

interface ColorSchemeSelectorProps {
  currentScheme: string
  onSchemeChange: (scheme: string) => void
}

const ColorSchemeSelector = ({ currentScheme, onSchemeChange }: ColorSchemeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`flex flex-row-reverse items-center gap-2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {Object.keys(colorSchemes).map((scheme) => (
          <Button
            key={scheme}
            onClick={() => {
              onSchemeChange(scheme)
              setIsOpen(false)
            }}
            className={`w-8 h-8 rounded-full ${colorSchemes[scheme].button} ${isOpen ? 'scale-100' : 'scale-0'} transition-all duration-300 ease-in-out`}
            aria-label={`Switch to ${scheme} theme`}
          />
        ))}
      </div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full ${colorSchemes[currentScheme].button} transition-all duration-300 ease-in-out`}
        aria-label="Open color scheme selector"
      >
        <Palette className="w-6 h-6" />
      </Button>
    </div>
  )
}

export function Dashboard() {
  const [clickedChild, setClickedChild] = useState<number | null>(null)
  const [colorScheme, setColorScheme] = useState('default')

  useEffect(() => {
    if (clickedChild !== null) {
      const timer = setTimeout(() => setClickedChild(null), 1000)
      return () => clearTimeout(timer)
    }
  }, [clickedChild])

  const currentScheme = colorSchemes[colorScheme]

  return (
    <div dir="rtl" className={`min-h-screen bg-gradient-to-bl ${currentScheme.background} p-8 relative overflow-hidden ${notoKufiArabic.className}`}>
      <style jsx global>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        .animate-sparkle > div {
          animation: sparkle 0.8s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(var(--tx), var(--ty)) rotate(360deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
      `}</style>
      <BubbleBackground bubbleColors={currentScheme.bubbles} />
      <ColorSchemeSelector currentScheme={colorScheme} onSchemeChange={setColorScheme} />
      <h1 className={`text-4xl font-bold text-center mb-8 ${currentScheme.text} relative z-10`}>لوحة إنجازات الأطفال</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 relative z-10 justify-items-center items-center min-h-[calc(100vh-8rem)] max-w-7xl mx-auto">
        {children.map((child, index) => (
          <Card 
            key={child.name} 
            className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg relative bg-white/80 backdrop-blur-sm max-w-sm w-full"
            onClick={() => setClickedChild(index)}
          >
            <Sparkles isActive={clickedChild === index} />
            <CardHeader className={`${currentScheme.cardHeader[index % currentScheme.cardHeader.length]} text-white`}>
              <CardTitle className="flex items-center justify-between text-xl">
                <span>{child.name}</span>
                <Badge variant="secondary" className="text-lg">
                  <Star className="ml-1 h-4 w-4 text-yellow-400" fill="currentColor" /> {child.points}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              
            <div className="flex justify-center mb-8 relative">
                {child.points === getHighestScore(children) && (
                  <Crown className="absolute -top-4 left-1/2 transform -translate-x-1/2 h-8 w-8 text-yellow-500 z-10" />
                )}                <Image
                  src={child.avatar}
                  alt={`صورة ${child.name}`}
                  width={150}
                  height={150}
                  className="rounded-full border-4 border-white shadow-lg w-[150px] h-[150px] object-cover"
                />
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <Trophy className="ml-2 h-5 w-5 text-yellow-500" />
                    المهارات المكتسبة
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {child.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <Gift className="ml-2 h-5 w-5 text-red-500" />
                    قائمة الهدايا
                  </h3>
                  {child.gifts.map((gift) => (
                    <div key={gift.name} className="mb-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span>{gift.name}</span>
                        <span>{gift.progress}%</span>
                      </div>
                      <RTLProgress value={gift.progress} color={currentScheme.progress} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}