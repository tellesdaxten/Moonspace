"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UserPlus, UserMinus, Check, X, Gamepad2, Users } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Friend {
  id: number
  name: string
  username: string
  avatar: string
  status: "online" | "offline" | "playing"
  mutualFriends?: number
  game?: string
}

interface FriendRequest {
  id: number
  name: string
  username: string
  avatar: string
  mutualFriends: number
}

const mockFriends: Friend[] = [
  {
    id: 1,
    name: "Luna Gaming",
    username: "@lunagamer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    status: "playing",
    mutualFriends: 5,
    game: "Valorant"
  },
  {
    id: 2,
    name: "StarPlayer",
    username: "@starplayer",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    status: "online",
    mutualFriends: 12
  },
  {
    id: 3,
    name: "NexusGamer",
    username: "@nexusgamer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    status: "playing",
    mutualFriends: 8,
    game: "Elden Ring"
  },
  {
    id: 4,
    name: "PixelQueen",
    username: "@pixelqueen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    status: "offline",
    mutualFriends: 3
  }
]

const mockRequests: FriendRequest[] = [
  {
    id: 1,
    name: "GamerPro",
    username: "@gamerpro",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    mutualFriends: 7
  },
  {
    id: 2,
    name: "NightPlayer",
    username: "@nightplayer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    mutualFriends: 2
  }
]

interface FriendsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FriendsModal({ open, onOpenChange }: FriendsModalProps) {
  const [friends, setFriends] = useState<Friend[]>(mockFriends)
  const [requests, setRequests] = useState<FriendRequest[]>(mockRequests)

  const handleAcceptRequest = (id: number) => {
    const request = requests.find(r => r.id === id)
    if (request) {
      setFriends([...friends, { ...request, status: "offline" as const }])
      setRequests(requests.filter(r => r.id !== id))
    }
  }

  const handleRejectRequest = (id: number) => {
    setRequests(requests.filter(r => r.id !== id))
  }

  const handleRemoveFriend = (id: number) => {
    setFriends(friends.filter(f => f.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500"
      case "playing": return "bg-purple-500"
      case "offline": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pixel-card max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b-4 border-border">
          <DialogTitle className="pixel-title text-sm gradient-text flex items-center gap-2">
            <Users className="w-4 h-4" />
            AMIGOS
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-muted/50 p-1">
            <TabsTrigger value="friends" className="pixel-text text-sm">
              Amigos ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="requests" className="pixel-text text-sm">
              Pedidos ({requests.length})
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px]">
            <TabsContent value="friends" className="m-0 p-2">
              <div className="space-y-2">
                {friends.map((friend) => (
                  <div key={friend.id} className="p-3 pixel-border bg-card hover:bg-primary/10 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12 pixel-avatar">
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback>{friend.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(friend.status)} border-2 border-card`} />
                        </div>
                        <div>
                          <div className="pixel-text font-bold">{friend.name}</div>
                          <div className="pixel-text text-xs text-muted-foreground">{friend.username}</div>
                          {friend.status === "playing" && friend.game && (
                            <Badge variant="secondary" className="text-xs mt-1 bg-purple-500/20 text-purple-400 pixel-text">
                              <Gamepad2 className="w-3 h-3 mr-1" />
                              {friend.game}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveFriend(friend.id)}
                        className="h-8 w-8"
                      >
                        <UserMinus className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="m-0 p-2">
              {requests.length === 0 ? (
                <div className="p-8 text-center">
                  <UserPlus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="pixel-text text-muted-foreground">Nenhum pedido pendente</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {requests.map((request) => (
                    <div key={request.id} className="p-3 pixel-border bg-card hover:bg-primary/10 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12 pixel-avatar">
                            <AvatarImage src={request.avatar} />
                            <AvatarFallback>{request.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="pixel-text font-bold">{request.name}</div>
                            <div className="pixel-text text-xs text-muted-foreground">{request.username}</div>
                            <div className="pixel-text text-xs text-muted-foreground">
                              {request.mutualFriends} amigos em comum
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            size="icon"
                            className="pixel-btn gradient-purple-pink h-8 w-8"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline"
                            size="icon"
                            className="pixel-btn h-8 w-8"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
