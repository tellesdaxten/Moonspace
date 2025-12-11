"use client"

import { useState } from "react"
import { Moon, Home, Users, Bell, User, Search, Gamepad2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { NotificationsModal } from "@/components/modals/NotificationsModal"
import { FriendsModal } from "@/components/modals/FriendsModal"
import { GamesModal } from "@/components/modals/GamesModal"
import { ProfileModal } from "@/components/modals/ProfileModal"

interface NavigationProps {
  notificationCount?: number
  isLoggedIn?: boolean
}

export default function Navigation({ notificationCount = 3, isLoggedIn = false }: NavigationProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [friendsOpen, setFriendsOpen] = useState(false)
  const [gamesOpen, setGamesOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 border-b-4 border-border bg-background pixel-stars">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="relative">
                <div className="w-10 h-10 pixel-border bg-primary flex items-center justify-center moon-glow">
                  <Moon className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="pixel-title text-xs gradient-text hidden sm:block">MOONSPACE</span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar..." 
                  className="pl-10 pixel-input"
                />
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative pixel-btn border-0 shadow-none hover:bg-primary/20"
                asChild
              >
                <Link href="/">
                  <Home className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative pixel-btn border-0 shadow-none hover:bg-primary/20"
                onClick={() => setFriendsOpen(true)}
              >
                <Users className="w-5 h-5" />
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="relative pixel-btn border-0 shadow-none hover:bg-primary/20"
                onClick={() => setGamesOpen(true)}
              >
                <Gamepad2 className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative pixel-btn border-0 shadow-none hover:bg-primary/20"
                onClick={() => setNotificationsOpen(true)}
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs gradient-purple-pink border-0 pixel-text"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-2 pixel-btn border-0 shadow-none hover:bg-primary/20"
                onClick={() => setProfileOpen(true)}
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <NotificationsModal open={notificationsOpen} onOpenChange={setNotificationsOpen} />
      <FriendsModal open={friendsOpen} onOpenChange={setFriendsOpen} />
      <GamesModal open={gamesOpen} onOpenChange={setGamesOpen} />
      <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} isLoggedIn={isLoggedIn} />
    </>
  )
}
