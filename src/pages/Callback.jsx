
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Callback() {
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    if (code) {
      // Send the code to the backend to exchange it for a JWT
      fetch(`http://localhost:3000/auth/callback?code=${code}`, {
        method: "GET",
        credentials: "include", // Include cookies
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data) // Log the success message
          navigate("/send-email") // Redirect to the send-email page after successful auth
        })
        .catch((error) => {
          console.error("Error during OAuth callback:", error)
          navigate("/") // Redirect to the home page on error
        })
    } else {
      console.error("Authorization code missing")
      navigate("/") // Redirect to the home page if no code is found
    }
  }, [navigate])

  return <div>Processing authentication...</div> // Show a loading message
}

export default Callback

