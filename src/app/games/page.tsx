"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gamepad2, Trophy, Users, TrendingUp, Clock, Star } from "lucide-react"

interface Game {
  id: number
  name: string
  cover: string
  genre: string
  players: number
  rating: number
  trending: boolean
}

interface Activity {
  id: number
  user: string
  game: string
  achievement: string
  timestamp: string
  icon: string
}

const mockGames: Game[] = [
  {
    id: 1,
    name: "Valorant",
    cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    genre: "FPS",
    players: 15420,
    rating: 4.8,
    trending: true
  },
  {
    id: 2,
    name: "Elden Ring",
    cover: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
    genre: "RPG",
    players: 8920,
    rating: 4.9,
    trending: true
  },
  {
    id: 3,
    name: "League of Legends",
    cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    genre: "MOBA",
    players: 23450,
    rating: 4.7,
    trending: true
  },
  {
    id: 4,
    name: "Minecraft",
    cover: "https://images.unsplash.com/photo-1606056192734-fe5c39449776?w=400&h=300&fit=crop",
    genre: "Sandbox",
    players: 12340,
    rating: 4.9,
    trending: false
  },
  {
    id: 5,
    name: "Fortnite",
    cover: "https://images.unsplash.com/photo-1589241062272-c0a000072d2a?w=400&h=300&fit=crop",
    genre: "Battle Royale",
    players: 19230,
    rating: 4.6,
    trending: false
  },
  {
    id: 6,
    name: "CS:GO",
    cover: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop",
    genre: "FPS",
    players: 11890,
    rating: 4.8,
    trending: false
  }
]

const mockActivities: Activity[] = [
  {
    id: 1,
    user: "Luna Gaming",
    game: "Valorant",
    achievement: "Alcançou Diamante!",
    timestamp: "5 min atrás",
    icon: "💎"
  },
  {
    id: 2,
    user: "StarPlayer",
    game: "Elden Ring",
    achievement: "Derrotou Malenia",
    timestamp: "15 min atrás",
    icon: "⚔️"
  },
  {
    id: 3,
    user: "NexusGamer",
    game: "League of Legends",
    achievement: "Pentakill!",
    timestamp: "30 min atrás",
    icon: "🔥"
  },
  {
    id: 4,
    user: "PixelQueen",
    game: "Minecraft",
    achievement: "Construiu castelo épico",
    timestamp: "1h atrás",
    icon: "🏰"
  }
]

export default function GamesPage() {
  const [selectedGenre, setSelectedGenre] = useState("all")

  const filteredGames = selectedGenre === "all" 
    ? mockGames 
    : mockGames.filter(game => game.genre.toLowerCase() === selectedGenre.toLowerCase())

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 gradient-text">Gaming Hub</h1>
          <p className="text-muted-foreground">Descubra jogos populares e acompanhe atividades da comunidade</p>
        </div>

        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="games">
              <Gamepad2 className="w-4 h-4 mr-2" />
              Jogos Populares
            </TabsTrigger>
            <TabsTrigger value="activity">
              <TrendingUp className="w-4 h-4 mr-2" />
              Atividade Recente
            </TabsTrigger>
          </TabsList>

          {/* Games Tab */}
          <TabsContent value="games">
            {/* Genre Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {["all", "FPS", "RPG", "MOBA", "Sandbox", "Battle Royale"].map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className={selectedGenre === genre ? "gradient-purple-pink" : ""}
                >
                  {genre === "all" ? "Todos" : genre}
                </Button>
              ))}
            </div>

            {/* Games Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game) => (
                <Card key={game.id} className="border-purple-500/20 hover:border-purple-500/40 transition-all overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={game.cover} 
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {game.trending && (
                      <Badge className="absolute top-3 right-3 gradient-purple-pink border-0">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Em alta
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{game.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{game.rating}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="mb-3">
                      {game.genre}
                    </Badge>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {game.players.toLocaleString()} jogando
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <Card key={activity.id} className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">
                              <span className="gradient-text">{activity.user}</span> em {activity.game}
                            </p>
                            <p className="text-muted-foreground">{activity.achievement}</p>
                          </div>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {activity.timestamp}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            👏 Parabenizar
                          </Button>
                          <Button size="sm" variant="ghost">
                            Comentar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Gaming Stats */}
        <Card className="mt-8 border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-400" />
              Suas Estatísticas de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <Clock className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold gradient-text">4.5h</div>
                <div className="text-sm text-muted-foreground">Tempo Jogado</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-pink-400" />
                <div className="text-2xl font-bold gradient-text">12</div>
                <div className="text-sm text-muted-foreground">Conquistas</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold gradient-text">8</div>
                <div className="text-sm text-muted-foreground">Partidas Ganhas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
