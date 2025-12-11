"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Users, Star } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Game {
  id: number
  name: string
  image: string
  players: number
  genre: string
  rating: number
}

const mockGames: Game[] = [
  {
    id: 1,
    name: "Valorant",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    players: 45230,
    genre: "FPS",
    rating: 4.5
  },
  {
    id: 2,
    name: "League of Legends",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=200&fit=crop",
    players: 89500,
    genre: "MOBA",
    rating: 4.3
  },
  {
    id: 3,
    name: "Minecraft",
    image: "https://images.unsplash.com/photo-1587573089734-599d584e68ba?w=200&h=200&fit=crop",
    players: 67800,
    genre: "Sandbox",
    rating: 4.8
  },
  {
    id: 4,
    name: "Elden Ring",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=200&h=200&fit=crop",
    players: 23400,
    genre: "RPG",
    rating: 4.9
  },
  {
    id: 5,
    name: "Fortnite",
    image: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=200&h=200&fit=crop",
    players: 156000,
    genre: "Battle Royale",
    rating: 4.2
  },
  {
    id: 6,
    name: "GTA V",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f4d02?w=200&h=200&fit=crop",
    players: 78900,
    genre: "Acao",
    rating: 4.7
  }
]

interface GamesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GamesModal({ open, onOpenChange }: GamesModalProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>("all")

  const genres = ["all", "FPS", "MOBA", "RPG", "Sandbox", "Battle Royale", "Acao"]

  const filteredGames = selectedGenre === "all" 
    ? mockGames 
    : mockGames.filter(game => game.genre === selectedGenre)

  const formatPlayers = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pixel-card max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b-4 border-border">
          <DialogTitle className="pixel-title text-sm gradient-text flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            GAMING HUB
          </DialogTitle>
        </DialogHeader>

        <div className="p-3 border-b-4 border-border">
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  size="sm"
                  className={`pixel-btn text-xs whitespace-nowrap ${
                    selectedGenre === genre ? "gradient-purple-pink" : ""
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre === "all" ? "Todos" : genre}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <ScrollArea className="h-[400px]">
          <div className="p-3 grid grid-cols-2 gap-3">
            {filteredGames.map((game) => (
              <div 
                key={game.id} 
                className="pixel-border bg-card hover:bg-primary/10 transition-all cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={game.image} 
                    alt={game.name}
                    className="w-full h-24 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 pixel-text text-xs bg-black/70">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {game.rating}
                  </Badge>
                </div>
                <div className="p-3">
                  <h3 className="pixel-text font-bold text-sm truncate">{game.name}</h3>
                  <Badge variant="secondary" className="pixel-text text-xs mt-1 bg-purple-500/20 text-purple-400">
                    {game.genre}
                  </Badge>
                  <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span className="pixel-text text-xs">{formatPlayers(game.players)} jogando</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
