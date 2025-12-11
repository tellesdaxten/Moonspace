"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Heart, MessageCircle, UserPlus, Trophy, Check, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

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
    content: "enviou uma solicitacao de amizade",
    timestamp: "5 min atras",
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
    timestamp: "15 min atras",
    read: false
  },
  {
    id: 3,
    type: "comment",
    user: {
      name: "StarPlayer",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
    },
    content: "comentou: 'Cara, essa skin e incrivel!'",
    timestamp: "1h atras",
    read: false
  },
  {
    id: 4,
    type: "achievement",
    user: {
      name: "Moonspace",
      avatar: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=100&h=100&fit=crop"
    },
    content: "Voce desbloqueou a conquista 'Maratonista'!",
    timestamp: "2h atras",
    read: true
  },
  {
    id: 5,
    type: "friend_request",
    user: {
      name: "NightPlayer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    content: "enviou uma solicitacao de amizade",
    timestamp: "3h atras",
    read: true,
    actionable: true
  }
]

interface NotificationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationsModal({ open, onOpenChange }: NotificationsModalProps) {
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
        return <Heart className="w-4 h-4 text-pink-500 fill-current" />
      case "comment":
        return <MessageCircle className="w-4 h-4 text-blue-400" />
      case "friend_request":
        return <UserPlus className="w-4 h-4 text-purple-400" />
      case "achievement":
        return <Trophy className="w-4 h-4 text-yellow-400" />
      case "mention":
        return <Bell className="w-4 h-4 text-green-400" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pixel-card max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b-4 border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="pixel-title text-sm gradient-text flex items-center gap-2">
              <Bell className="w-4 h-4" />
              NOTIFICACOES
            </DialogTitle>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={markAllAsRead}
                className="pixel-text text-xs"
              >
                <Check className="w-3 h-3 mr-1" />
                Ler todas
              </Button>
            )}
          </div>
        </DialogHeader>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-2 bg-muted/50 p-1">
            <TabsTrigger value="all" className="pixel-text text-sm">
              Todas ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="pixel-text text-sm">
              Novas ({unreadCount})
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px]">
            <TabsContent value="all" className="m-0 p-2">
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 pixel-border cursor-pointer transition-all hover:bg-primary/10 ${
                      !notification.read ? 'bg-purple-500/10' : 'bg-card'
                    }`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10 pixel-avatar">
                        <AvatarImage src={notification.user.avatar} />
                        <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          {getIcon(notification.type)}
                          <div className="flex-1">
                            <p className="pixel-text text-sm leading-tight">
                              <span className="font-bold text-primary">{notification.user.name}</span>{" "}
                              {notification.content}
                            </p>
                            <p className="pixel-text text-xs text-muted-foreground mt-1">
                              {notification.timestamp}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-purple-500 mt-1" />
                          )}
                        </div>
                        {notification.actionable && notification.type === "friend_request" && (
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" className="pixel-btn gradient-purple-pink text-xs h-7">
                              Aceitar
                            </Button>
                            <Button size="sm" variant="outline" className="pixel-btn text-xs h-7">
                              Recusar
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="unread" className="m-0 p-2">
              {unreadCount === 0 ? (
                <div className="p-8 text-center">
                  <Check className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <p className="pixel-text text-muted-foreground">Tudo lido!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.filter(n => !n.read).map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-3 pixel-border cursor-pointer transition-all hover:bg-primary/10 bg-purple-500/10"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10 pixel-avatar">
                          <AvatarImage src={notification.user.avatar} />
                          <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2">
                            {getIcon(notification.type)}
                            <div className="flex-1">
                              <p className="pixel-text text-sm leading-tight">
                                <span className="font-bold text-primary">{notification.user.name}</span>{" "}
                                {notification.content}
                              </p>
                              <p className="pixel-text text-xs text-muted-foreground mt-1">
                                {notification.timestamp}
                              </p>
                            </div>
                            <div className="w-2 h-2 bg-purple-500 mt-1" />
                          </div>
                          {notification.actionable && notification.type === "friend_request" && (
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" className="pixel-btn gradient-purple-pink text-xs h-7">
                                Aceitar
                              </Button>
                              <Button size="sm" variant="outline" className="pixel-btn text-xs h-7">
                                Recusar
                              </Button>
                            </div>
                          )}
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
