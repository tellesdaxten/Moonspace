"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Gamepad2, Users, Calendar, Heart, MessageCircle, MapPin, Link as LinkIcon } from "lucide-react"

interface Game {
  id: number
  name: string
  icon: string
  hours: number
  achievements: number
  totalAchievements: number
}

interface Post {
  id: number
  content: string
  image?: string
  likes: number
  comments: number
  timestamp: string
}

const mockGames: Game[] = [
  { id: 1, name: "Valorant", icon: "🎯", hours: 520, achievements: 45, totalAchievements: 50 },
  { id: 2, name: "Elden Ring", icon: "⚔️", hours: 120, achievements: 30, totalAchievements: 42 },
  { id: 3, name: "League of Legends", icon: "🏆", hours: 890, achievements: 67, totalAchievements: 80 },
  { id: 4, name: "Minecraft", icon: "⛏️", hours: 340, achievements: 89, totalAchievements: 95 }
]

const mockPosts: Post[] = [
  {
    id: 1,
    content: "Acabei de conseguir rank Diamante no Valorant! 🎉",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    likes: 234,
    comments: 45,
    timestamp: "2 dias atrás"
  },
  {
    id: 2,
    content: "Montando squad para ranked hoje à noite! 🔥",
    likes: 89,
    comments: 23,
    timestamp: "5 dias atrás"
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-6 border-purple-500/20 overflow-hidden">
          {/* Cover Image */}
          <div className="h-48 gradient-purple-pink relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200')] bg-cover bg-center opacity-30" />
          </div>
          
          <CardContent className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20">
              <Avatar className="w-32 h-32 border-4 border-background moon-glow">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 mt-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">Seu Nome</h1>
                    <p className="text-muted-foreground">@seunome</p>
                    <p className="mt-2">Gamer apaixonado por FPS e RPG 🎮 | Diamante no Valorant 💎</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        São Paulo, BR
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Entrou em Janeiro 2024
                      </div>
                      <div className="flex items-center gap-1">
                        <LinkIcon className="w-4 h-4" />
                        <a href="#" className="text-purple-400 hover:underline">twitch.tv/seunome</a>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="gradient-purple-pink hover:opacity-90">
                    Editar Perfil
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold gradient-text">48</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold gradient-text">234</div>
                    <div className="text-sm text-muted-foreground">Amigos</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold gradient-text">1.2K</div>
                    <div className="text-sm text-muted-foreground">Curtidas</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="games">Jogos</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts">
            <div className="space-y-4">
              {mockPosts.map((post) => (
                <Card key={post.id} className="border-purple-500/20">
                  <CardContent className="p-6">
                    <p className="mb-4">{post.content}</p>
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full rounded-lg border border-border/40 mb-4"
                      />
                    )}
                    <div className="flex gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" /> {post.comments}
                      </span>
                      <span className="ml-auto">{post.timestamp}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Games Tab */}
          <TabsContent value="games">
            <div className="grid md:grid-cols-2 gap-4">
              {mockGames.map((game) => (
                <Card key={game.id} className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{game.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{game.name}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Gamepad2 className="w-4 h-4" />
                            <span>{game.hours}h jogadas</span>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="flex items-center gap-1">
                                <Trophy className="w-4 h-4" />
                                Conquistas
                              </span>
                              <span>{game.achievements}/{game.totalAchievements}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="gradient-purple-pink h-2 rounded-full"
                                style={{ width: `${(game.achievements / game.totalAchievements) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Primeira Vitória", desc: "Ganhe sua primeira partida", icon: "🏆", rarity: "Comum" },
                { title: "Combo Killer", desc: "Elimine 5 inimigos seguidos", icon: "⚔️", rarity: "Raro" },
                { title: "Maratonista", desc: "Jogue por 100 horas", icon: "⏰", rarity: "Épico" },
                { title: "Mestre Supremo", desc: "Alcance o rank mais alto", icon: "👑", rarity: "Lendário" },
                { title: "Amigo Fiel", desc: "Tenha 50 amigos", icon: "🤝", rarity: "Comum" },
                { title: "Streamer", desc: "Compartilhe 100 posts", icon: "📢", rarity: "Raro" }
              ].map((achievement, i) => (
                <Card key={i} className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.desc}</p>
                    <Badge 
                      variant="secondary" 
                      className={
                        achievement.rarity === "Lendário" ? "gradient-purple-pink text-white" :
                        achievement.rarity === "Épico" ? "bg-purple-500/20 text-purple-400" :
                        achievement.rarity === "Raro" ? "bg-blue-500/20 text-blue-400" :
                        "bg-muted"
                      }
                    >
                      {achievement.rarity}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
