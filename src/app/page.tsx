"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Image as ImageIcon, Gamepad2, Moon, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Post {
  id: number
  user: {
    name: string
    username: string
    avatar: string
  }
  content: string
  image?: string
  likes: number
  comments: number
  timestamp: string
  gameTag?: string
  isLiked?: boolean
}

const mockPosts: Post[] = [
  {
    id: 1,
    user: {
      name: "Luna Gaming",
      username: "@lunagamer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
    },
    content: "Acabei de zerar Elden Ring! 120 horas de gameplay pura, que experiencia incrivel! Alguem ai tambem jogando?",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop",
    likes: 234,
    comments: 45,
    timestamp: "2h atras",
    gameTag: "Elden Ring",
    isLiked: false
  },
  {
    id: 2,
    user: {
      name: "StarPlayer",
      username: "@starplayer",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
    },
    content: "Montando squad para ranked no Valorant hoje a noite! Quem topa?",
    likes: 89,
    comments: 23,
    timestamp: "4h atras",
    gameTag: "Valorant"
  },
  {
    id: 3,
    user: {
      name: "NexusGamer",
      username: "@nexusgamer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    content: "Finalmente consegui a skin lendaria que eu queria! Depois de meses tentando, a sorte veio!",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    likes: 567,
    comments: 78,
    timestamp: "6h atras",
    isLiked: true
  },
  {
    id: 4,
    user: {
      name: "PixelQueen",
      username: "@pixelqueen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    content: "Alguem mais ta hypado pro novo update do Minecraft? As novas features parecem incriveis!",
    likes: 342,
    comments: 56,
    timestamp: "8h atras",
    gameTag: "Minecraft"
  }
]

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [newPost, setNewPost] = useState("")
  const [isLoggedIn] = useState(false)

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ))
  }

  return (
    <div className="min-h-screen bg-background pixel-stars scanlines">
      <Navigation notificationCount={3} isLoggedIn={isLoggedIn} />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {!isLoggedIn && (
          <Card className="mb-6 pixel-card overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 pixel-border bg-primary flex items-center justify-center moon-glow float">
                  <Moon className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="pixel-title text-sm md:text-base gradient-text mb-3">
                    BEM-VINDO À MOONSPACE!
                  </h1>
                  <p className="pixel-text text-muted-foreground mb-4">
                    A rede social para gamers da Geracao Z. Conecte-se, compartilhe suas conquistas e faca novos amigos!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button className="pixel-btn gradient-purple-pink" asChild>
                      <Link href="/signup">
                        <Sparkles className="w-4 h-4 mr-2" />
                        CRIAR CONTA
                      </Link>
                    </Button>
                    <Button variant="outline" className="pixel-btn" asChild>
                      <Link href="/login">
                        ENTRAR
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isLoggedIn && (
          <Card className="mb-6 pixel-card">
            <CardHeader>
              <div className="flex gap-4">
                <Avatar className="pixel-avatar">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea 
                    placeholder="O que voce esta jogando? Compartilhe suas conquistas..." 
                    className="min-h-[100px] resize-none pixel-input"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-between border-t-4 border-border pt-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="pixel-btn border-0 shadow-none">
                  <ImageIcon className="w-5 h-5 text-purple-500" />
                </Button>
                <Button variant="ghost" size="icon" className="pixel-btn border-0 shadow-none">
                  <Gamepad2 className="w-5 h-5 text-pink-500" />
                </Button>
              </div>
              <Button 
                className="pixel-btn gradient-purple-pink"
                disabled={!newPost.trim()}
              >
                PUBLICAR
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="pixel-title text-xs gradient-text">FEED PUBLICO</h2>
          <Badge className="pixel-text bg-purple-500/20 text-purple-400">
            {posts.length} posts
          </Badge>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="pixel-card hover:border-primary/50 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <Avatar className="pixel-avatar">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="pixel-text font-bold">{post.user.name}</div>
                      <div className="pixel-text text-sm text-muted-foreground">
                        {post.user.username} · {post.timestamp}
                      </div>
                    </div>
                  </div>
                  {post.gameTag && (
                    <Badge variant="secondary" className="pixel-text text-xs bg-purple-500/20 text-purple-400">
                      <Gamepad2 className="w-3 h-3 mr-1" />
                      {post.gameTag}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="py-0">
                <p className="pixel-text mb-4">{post.content}</p>
                {post.image && (
                  <img 
                    src={post.image} 
                    alt="Post" 
                    className="w-full pixel-border"
                  />
                )}
              </CardContent>
              <CardFooter className="flex gap-4 pt-4 border-t-4 border-border mt-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`pixel-btn border-0 shadow-none ${post.isLiked ? "text-pink-500" : ""}`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={`w-5 h-5 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                  <span className="pixel-text">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="pixel-btn border-0 shadow-none">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span className="pixel-text">{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="pixel-btn border-0 shadow-none">
                  <Share2 className="w-5 h-5 mr-2" />
                  <span className="pixel-text hidden sm:inline">Compartilhar</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="pixel-text text-muted-foreground mb-4">
            Quer ver mais? Crie sua conta e faca parte da comunidade!
          </p>
          {!isLoggedIn && (
            <Button className="pixel-btn gradient-purple-pink" asChild>
              <Link href="/signup">
                <Sparkles className="w-4 h-4 mr-2" />
                JUNTE-SE AO MOONSPACE
              </Link>
            </Button>
          )}
        </div>

        <footer className="mt-12 py-6 text-center border-t-4 border-border">
          <p className="pixel-text text-muted-foreground text-sm">
            2024 Moonspace - A rede social da Geracao Z
          </p>
        </footer>
      </div>
    </div>
  )
}
