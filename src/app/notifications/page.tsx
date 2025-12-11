"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Heart, MessageCircle, UserPlus, Trophy, Check } from "lucide-react"

interface Notification {
  id: number
  type: "like" | "comment" | "friend_request" | "achievement" | "mention"
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  read: boolean
  actionable?: boolean
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "friend_request",
    user: {
      name: "GamerPro",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop"
    },
    content: "enviou uma solicitação de amizade",
    timestamp: "5 min atrás",
    read: false,
    actionable: true
  },
  {
    id: 2,
    type: "like",
    user: {
      name: "Luna Gaming",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
    },
    content: "curtiu seu post sobre Valorant",
    timestamp: "15 min atrás",
    read: false
  },
  {
    id: 3,
    type: "comment",
    user: {
      name: "StarPlayer",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
    },
    content: "comentou: 'Cara, essa skin é incrível! 🔥'",
    timestamp: "1h atrás",
    read: false
  },
  {
    id: 4,
    type: "achievement",
    user: {
      name: "Moonspace",
      avatar: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=100&h=100&fit=crop"
    },
    content: "Você desbloqueou a conquista 'Maratonista' - Jogou por 100 horas!",
    timestamp: "2h atrás",
    read: true
  },
  {
    id: 5,
    type: "friend_request",
    user: {
      name: "NightPlayer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    content: "enviou uma solicitação de amizade",
    timestamp: "3h atrás",
    read: true,
    actionable: true
  },
  {
    id: 6,
    type: "mention",
    user: {
      name: "NexusGamer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    content: "mencionou você em um comentário",
    timestamp: "5h atrás",
    read: true
  },
  {
    id: 7,
    type: "like",
    user: {
      name: "PixelQueen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    content: "curtiu seu comentário",
    timestamp: "1 dia atrás",
    read: true
  }
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-pink-500 fill-current" />
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case "friend_request":
        return <UserPlus className="w-5 h-5 text-purple-500" />
      case "achievement":
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case "mention":
        return <Bell className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const unreadNotifications = notifications.filter(n => !n.read)
  const readNotifications = notifications.filter(n => n.read)

  return (
    <div className="min-h-screen bg-background">
      <Navigation notificationCount={unreadCount} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Notificações</h1>
            {unreadCount > 0 && (
              <p className="text-muted-foreground mt-1">
                Você tem {unreadCount} {unreadCount === 1 ? 'notificação não lida' : 'notificações não lidas'}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={markAllAsRead}
              className="border-purple-500/50"
            >
              <Check className="w-4 h-4 mr-2" />
              Marcar todas como lidas
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="all">
              Todas ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Não lidas ({unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer ${
                    !notification.read ? 'bg-purple-500/5' : ''
                  }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="mt-1">
                        <AvatarImage src={notification.user.avatar} />
                        <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-1">
                          {getIcon(notification.type)}
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-semibold">{notification.user.name}</span>{" "}
                              {notification.content}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.timestamp}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                          )}
                        </div>
                        {notification.actionable && notification.type === "friend_request" && (
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className="gradient-purple-pink hover:opacity-90">
                              Aceitar
                            </Button>
                            <Button size="sm" variant="outline">
                              Recusar
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unread">
            {unreadNotifications.length === 0 ? (
              <Card className="border-purple-500/20">
                <CardContent className="p-12 text-center">
                  <Check className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <p className="text-muted-foreground">Você está em dia! Nenhuma notificação não lida.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {unreadNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className="border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer bg-purple-500/5"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="mt-1">
                          <AvatarImage src={notification.user.avatar} />
                          <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            {getIcon(notification.type)}
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-semibold">{notification.user.name}</span>{" "}
                                {notification.content}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.timestamp}
                              </p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                          </div>
                          {notification.actionable && notification.type === "friend_request" && (
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" className="gradient-purple-pink hover:opacity-90">
                                Aceitar
                              </Button>
                              <Button size="sm" variant="outline">
                                Recusar
                              </Button>
                            </div>
                          )}
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
