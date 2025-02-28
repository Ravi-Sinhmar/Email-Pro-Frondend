
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom" // Import useNavigate hook
import { Mail, FileText, Zap } from "lucide-react"
import { authState } from "@/states/atoms/auth"
import { useRecoilState, useRecoilValue } from "recoil"

export default function AuthPage() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const  [isAuth,setIsAuth]  = useRecoilState(authState)
  const navigate = useNavigate() // Initialize navigate

  // Redirect to /send-email if already authenticated
  useEffect(() => {
    if (isAuth) {
      setIsAuthenticating(false)
      navigate("/send-email")
    }
  }, [isAuth, navigate])

  // Function to handle authentication
  const handleAuth = () => {
    setIsAuthenticating(true)
    // Redirect to the backend endpoint to start OAuth flow
    window.location.href = "http://localhost:3000/auth"
  }

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    if (code) {
      // Exchange the authorization code for a JWT
      fetch(`http://localhost:3000/auth/callback?code=${code}`, {
        method: "GET",
        credentials: "include", // Include cookies in the request
      })
        .then((response) => response.text())
        .then((data) => {
          setIsAuth(true);
          navigate("/send-email") // Redirect to the send-email page
        })
        .catch((err) => {
          console.error("Error during OAuth callback:", err)
          setIsAuthenticating(false) // Reset authentication state on error
        })
    }
  }, [ navigate])

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">Email Automation Platform</h1>
      <p className="text-xl text-zinc-400 mb-8 text-center max-w-2xl">
        Streamline your job search with our powerful email automation tool. Send personalized emails to hundreds of HR
        professionals with just one click!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="w-full max-w-sm bg-zinc-800 border border-zinc-700 rounded-lg shadow-md">
          <div className="flex flex-col items-center p-6">
            <Mail className="w-12 h-12 text-zinc-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-white">Mass Emailing</h2>
            <p className="text-center text-zinc-400">Send personalized emails to multiple recipients simultaneously.</p>
          </div>
        </div>

        <div className="w-full max-w-sm bg-zinc-800 border border-zinc-700 rounded-lg shadow-md">
          <div className="flex flex-col items-center p-6">
            <FileText className="w-12 h-12 text-zinc-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-white">Resume Attachment</h2>
            <p className="text-center text-zinc-400">Easily attach your resume to all outgoing emails.</p>
          </div>
        </div>

        <div className="w-full max-w-sm bg-zinc-800 border border-zinc-700 rounded-lg shadow-md">
          <div className="flex flex-col items-center p-6">
            <Zap className="w-12 h-12 text-zinc-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-white">Time-Saving</h2>
            <p className="text-center text-zinc-400">Save hours by automating your email outreach process.</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleAuth}
        disabled={isAuthenticating}
        className="text-lg px-8 py-6 bg-white text-zinc-900 hover:bg-zinc-200 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        {isAuthenticating ? "Authenticating..." : "Get Started with Email OAuth"}
      </button>
    </div>
  )
}

