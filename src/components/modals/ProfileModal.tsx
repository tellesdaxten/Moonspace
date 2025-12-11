"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Trophy, Gamepad2, Users, Heart, Settings, LogOut } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isLoggedIn?: boolean
}

const userProfile = {
  name: "Player One",
  username: "@playerone",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  bio: "Gamer desde 2005. Amo RPGs e FPS!",
  stats: {
    posts: 142,
    friends: 89,
    achievements: 23
  },
  favoriteGames: ["Valorant", "Elden Ring", "Minecraft"],
  achievements: [
    { id: 1, name: "Primeiro Post", icon: "📝" },
    { id: 2, name: "10 Amigos", icon: "👥" },
    { id: 3, name: "100 Curtidas", icon: "❤️" },
    { id: 4, name: "Maratonista", icon: "🎮" }
  ]
}

export function ProfileModal({ open, onOpenChange, isLoggedIn = false }: ProfileModalProps) {
  if (!isLoggedIn) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="pixel-card max-w-sm p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b-4 border-border">
            <DialogTitle className="pixel-title text-sm gradient-text flex items-center gap-2">
              <User className="w-4 h-4" />
              ENTRAR
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 text-center">
            <div className="w-20 h-20 mx-auto mb-4 pixel-border bg-muted flex items-center justify-center">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="pixel-text text-muted-foreground mb-6">
              Faca login para acessar seu perfil e todas as funcionalidades!
            </p>
            <div className="space-y-3">
              <Button className="w-full pixel-btn gradient-purple-pink">
                ENTRAR
              </Button>
              <Button variant="outline" className="w-full pixel-btn">
                CRIAR CONTA
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pixel-card max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b-4 border-border">
          <DialogTitle className="pixel-title text-sm gradient-text flex items-center gap-2">
            <User className="w-4 h-4" />
            MEU PERFIL
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[450px]">
          <div className="p-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20 pixel-avatar">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback>P1</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="pixel-text text-xl font-bold">{userProfile.name}</h2>
                <p className="pixel-text text-sm text-muted-foreground">{userProfile.username}</p>
                <p className="pixel-text text-sm mt-1">{userProfile.bio}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="pixel-border p-3 text-center bg-card">
                <div className="pixel-text text-xl font-bold text-primary">{userProfile.stats.posts}</div>
                <div className="pixel-text text-xs text-muted-foreground">Posts</div>
              </div>
              <div className="pixel-border p-3 text-center bg-card">
                <div className="pixel-text text-xl font-bold text-primary">{userProfile.stats.friends}</div>
                <div className="pixel-text text-xs text-muted-foreground">Amigos</div>
              </div>
              <div className="pixel-border p-3 text-center bg-card">
                <div className="pixel-text text-xl font-bold text-primary">{userProfile.stats.achievements}</div>
                <div className="pixel-text text-xs text-muted-foreground">Conquistas</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="pixel-title text-xs mb-3 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                JOGOS FAVORITOS
              </h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.favoriteGames.map((game) => (
                  <Badge key={game} className="pixel-text bg-purple-500/20 text-purple-400">
                    {game}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="pixel-title text-xs mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                CONQUISTAS
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {userProfile.achievements.map((achievement) => (
                  <div key={achievement.id} className="pixel-border p-2 bg-card flex items-center gap-2">
                    <span className="text-xl">{achievement.icon}</span>
                    <span className="pixel-text text-sm">{achievement.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full pixel-btn justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Configuracoes
              </Button>
              <Button variant="outline" className="w-full pixel-btn justify-start text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
