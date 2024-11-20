
import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Paperclip } from 'lucide-react'
import { useAuth } from '@/contexts/auth';

export default function Component() {
  const [sharedArray, setSharedArray] = useState([])
  const [inputEmails, setInputEmails] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [resume, setResume] = useState(null)
  const scrollContainerRef = useRef(null)
  const {login,isAuth} = useAuth();

  useState(()=>{
    login();
  });
  const updateArray = (newArray) => {
    setSharedArray(newArray)
  }

  const processEmails = () => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const newEmails = inputEmails.match(emailRegex) || []
    updateArray([...new Set([...sharedArray, ...newEmails])])
    setInputEmails('')
  }

  const deleteEmail = (index) => {
    updateArray(sharedArray.filter((_, i) => i !== index))
  }

  const sendEmailHandler = () => {
    const formatedMessage = message.replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
    const formData = new FormData()
    formData.append("message", formatedMessage)
    formData.append("toEmail", JSON.stringify(sharedArray))
    formData.append("subject", subject)
    formData.append("resume", resume)
    
    fetch("http://localhost:5000/sendEmail", {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Success")
      }
    })
    .catch((error) => console.error("Error fetching data:", error))
  }

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth
    }
  }, [sharedArray])

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <nav className="bg-zinc-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Email Dashboard</h1>
          <div className="space-x-4">
            <a href="/" className="text-zinc-100 hover:text-zinc-300">Status</a>
            <Button className='bg-green-700 text-white  cursor-default hover:bg-green-700'>Authenticated</Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6 space-y-6">
        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <Textarea
                  placeholder="Paste your bulk emails here..."
                  value={inputEmails}
                  onChange={(e) => setInputEmails(e.target.value)}
                  className="min-h-[150px] bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                />
                <Button onClick={processEmails} className="w-full bg-zinc-600 hover:bg-zinc-500 text-zinc-100">
                  Process Emails
                </Button>
                <div ref={scrollContainerRef} className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto p-2 bg-zinc-700 rounded-md">
                  {sharedArray.map((email, index) => (
                    <div key={index} className="flex items-center bg-zinc-600 rounded px-2 py-1">
                      <span className="text-sm mr-2">{email}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEmail(index)}
                        className="h-5 w-5 rounded-full bg-zinc-500 hover:bg-zinc-400 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <Input
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                />
                <Textarea
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[300px] bg-zinc-700 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      id="resume"
                      onChange={(e) => setResume(e.target.files[0])}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <Button
                      onClick={() => document.getElementById('resume').click()}
                      variant="outline"
                      className="bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600"
                    >
                      <Paperclip className="mr-2 h-4 w-4" />
                      Attach Resume
                    </Button>
                    {resume && <span className="text-sm text-zinc-400">{resume.name}</span>}
                  </div>
                  <Button
                    onClick={sendEmailHandler}
                    className="bg-zinc-600 hover:bg-zinc-500 text-zinc-100"
                  >
                    Send Email
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}