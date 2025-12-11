"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { UserPlus, UserMinus, Check, X, Gamepad2 } from "lucide-react"

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
  },
  {
    id: 3,
    name: "EpicGamer",
    username: "@epicgamer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    mutualFriends: 15
  }
]

export default function FriendsPage() {
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
      case "offline": return "bg-gray-400"
      default: return "bg-gray-400"
    }
  }

  const getStatusText = (friend: Friend) => {
    if (friend.status === "playing" && friend.game) {
      return `Jogando ${friend.game}`
    }
    return friend.status === "online" ? "Online" : "Offline"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation notificationCount={requests.length} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Amigos</h1>

        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="friends">
              Meus Amigos ({friends.length})
            </TabsTrigger>
            <TabsTrigger value="requests">
              Solicitações ({requests.length})
            </TabsTrigger>
          </TabsList>

          {/* Friends List */}
          <TabsContent value="friends">
            <div className="grid gap-4">
              {friends.map((friend) => (
                <Card key={friend.id} className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback>{friend.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(friend.status)}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{friend.name}</div>
                          <div className="text-sm text-muted-foreground">{friend.username}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {friend.mutualFriends} amigos em comum
                            </Badge>
                            {friend.status === "playing" && friend.game && (
                              <Badge variant="secondary" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">
                                <Gamepad2 className="w-3 h-3 mr-1" />
                                {friend.game}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Ver Perfil
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveFriend(friend.id)}
                        >
                          <UserMinus className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Friend Requests */}
          <TabsContent value="requests">
            {requests.length === 0 ? (
              <Card className="border-purple-500/20">
                <CardContent className="p-12 text-center">
                  <UserPlus className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Nenhuma solicitação de amizade pendente</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {requests.map((request) => (
                  <Card key={request.id} className="border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={request.avatar} />
                            <AvatarFallback>{request.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-lg">{request.name}</div>
                            <div className="text-sm text-muted-foreground">{request.username}</div>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {request.mutualFriends} amigos em comum
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="gradient-purple-pink hover:opacity-90"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Aceitar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Recusar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
