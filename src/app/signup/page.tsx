"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Moon, Sparkles, ArrowLeft, Gamepad2 } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-background pixel-stars scanlines flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-20 h-20 mx-auto pixel-border bg-primary flex items-center justify-center moon-glow float mb-4">
              <Moon className="w-10 h-10 text-white" />
            </div>
          </Link>
          <h1 className="pixel-title text-sm gradient-text">MOONSPACE</h1>
        </div>

        <Card className="pixel-card">
          <CardHeader className="border-b-4 border-border">
            <CardTitle className="pixel-title text-sm text-center flex items-center justify-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              CRIAR CONTA
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div>
              <label className="pixel-text text-sm text-muted-foreground block mb-2">NOME</label>
              <Input 
                type="text" 
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pixel-input"
              />
            </div>
            <div>
              <label className="pixel-text text-sm text-muted-foreground block mb-2">USERNAME</label>
              <Input 
                type="text" 
                placeholder="@seuusername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pixel-input"
              />
            </div>
            <div>
              <label className="pixel-text text-sm text-muted-foreground block mb-2">EMAIL</label>
              <Input 
                type="email" 
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pixel-input"
              />
            </div>
            <div>
              <label className="pixel-text text-sm text-muted-foreground block mb-2">SENHA</label>
              <Input 
                type="password" 
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pixel-input"
              />
            </div>
            <Button className="w-full pixel-btn gradient-purple-pink">
              <Sparkles className="w-4 h-4 mr-2" />
              CRIAR CONTA
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-4 border-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-4 pixel-text text-muted-foreground text-sm">OU</span>
              </div>
            </div>

            <Button variant="outline" className="w-full pixel-btn">
              Cadastrar com Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t-4 border-border pt-6">
            <p className="pixel-text text-center text-muted-foreground text-sm">
              Ja tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Entrar
              </Link>
            </p>
            <Link href="/" className="flex items-center justify-center gap-2 pixel-text text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao feed
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
