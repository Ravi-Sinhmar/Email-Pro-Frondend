import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, FileText, Zap } from "lucide-react"

export default function Component() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const handleAuth = async () => {
    setIsAuthenticating(true)
    try {
      const response = await fetch('https://email-pro-backend.onrender.com/authenticate', { method: 'POST', credentials: "include" })
      if (response.ok) {
        // Handle successful authentication
        console.log('Authentication successful')
      } else {
        throw new Error('Authentication failed')
      }
    } catch (error) {
      console.error('Error during authentication:', error)
    } finally {
      setIsAuthenticating(false)
    }
  }
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Email Automation Platform</h1>
      <p className="text-xl text-zinc-400 mb-8 text-center max-w-2xl">
        Streamline your job search with our powerful email automation tool.
        Send personalized emails to hundreds of HR professionals with just one click!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="w-full max-w-sm bg-zinc-800 border-zinc-700">
          <CardContent className="flex flex-col items-center p-6">
            <Mail className="w-12 h-12 text-zinc-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-white">Mass Emailing</h2>
            <p className="text-center text-zinc-400">Send personalized emails to multiple recipients simultaneously.</p>
          </CardContent>
        </Card>
        
        <Card className="w-full max-w-sm bg-zinc-800 border-zinc-700">
          <CardContent className="flex flex-col items-center p-6">
            <FileText className="w-12 h-12 text-zinc-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-white">Resume Attachment</h2>
            <p className="text-center text-zinc-400">Easily attach your resume to all outgoing emails.</p>
          </CardContent>
        </Card>
        
        <Card className="w-full max-w-sm bg-zinc-800 border-zinc-700">
          <CardContent className="flex flex-col items-center p-6">
            <Zap className="w-12 h-12 text-zinc-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-white">Time-Saving</h2>
            <p className="text-center text-zinc-400">Save hours by automating your email outreach process.</p>
          </CardContent>
        </Card>
      </div>
      
      <Button 
        size="lg" 
        onClick={handleAuth}
        disabled={isAuthenticating}
        className="text-lg px-8 py-6 bg-white text-zinc-900 hover:bg-zinc-200 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        {isAuthenticating ? 'Authenticating...' : 'Get Started with Email OAuth'}
      </Button>
    </div>
  )
}