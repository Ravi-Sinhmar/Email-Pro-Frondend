
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/auth';

export default function EmailDashboard() {
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [showComposeDialog, setShowComposeDialog] = useState(false)
  const [allEmails, setAllEmails] = useState([])
  const [messageCount, setMessageCount] = useState(10)
  const [isLoading, setIsLoading] = useState(false);
  const {login,isAuth } = useAuth();

useEffect(()=>{
  if(!isAuth){
    login();
  }
},[isAuth]);

 useEffect(()=>{
  if(isAuth){
    handleReadEmails();
  }
 },[isAuth]);

  const handleReadEmails = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/readEmails', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: messageCount }),
        credentials: 'include' 
      })
      if (response.ok) {
        const data = await response.json()
        setAllEmails(data.data)
        console.log('Got All Emails:', data.data)
      } else {
        throw new Error('Error in fetching emails')
      }
    } catch (error) {
      console.error('Error during fetching:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterEmails = (status) => 
    allEmails.filter(email => email.status === status)

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-zinc-400'
      case 'replied': return 'bg-green-500'
      default: return 'bg-zinc-400'
    }
  }

  const EmailList = ({ emails }) => (
    <ScrollArea className="h-[400px]">
      {emails.map(email => (
        <div key={email.id} className="mb-2 last:mb-0">
          <div 
            className="flex items-center space-x-4 p-4 text-zinc-100 hover:text-black hover:bg-zinc-100 cursor-pointer border border-zinc-700 rounded-lg transition-all duration-200 ease-in-out hover:shadow-md" 
            onClick={() => setSelectedEmail(email)}
          >
            <div className={`w-3 h-3 rounded-full ${getStatusColor(email.status)}`} />
            <div className="flex-1">
              <p className="font-medium">{email.to}</p>
              <p className="text-sm line-clamp-2">{email.subject}</p>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  )

  const renderAttachments = (attachments) => (
    <div className="mt-4">
      <h4 className="font-semibold text-zinc-200">Attachments:</h4>
      <div className="space-y-2">
        {attachments.map((attachment, index) => (
          <a
            key={index}
            href={`data:${attachment.mimeType};base64,${attachment.data}`}
            download={attachment.filename}
            className="text-blue-400 hover:underline"
          >
            {attachment.filename} ({(attachment.size / 1024).toFixed(2)} KB)
          </a>
        ))}
      </div>
    </div>
  )

  return (
    <div className="mx-auto bg-zinc-900 min-h-screen text-zinc-100">
      <nav className="bg-zinc-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Email Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="1"
                max="100"
                value={messageCount}
                onChange={(e) => setMessageCount(e.target.value)}
                className="w-32"
              />
              <span className="text-zinc-100">{messageCount}</span>
              <Button 
                onClick={handleReadEmails}
                disabled={isLoading}
                className="bg-zinc-700 text-white hover:bg-zinc-600"
              >
                {isLoading ? 'Loading...' : 'Fetch Emails'}
              </Button>
            </div>
            <a href="/send-email" className="text-zinc-100 hover:text-zinc-300">Compose</a>
            <Button className='bg-green-700 text-white cursor-default hover:bg-green-700'>Authenticated</Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {['sent', 'replied'].map((status) => (
            <Card key={status} className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-zinc-100">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  <Badge 
                    variant="outline" 
                    className={`${status === 'replied' ? 'bg-green-700 text-green-100' : 'bg-zinc-700 text-zinc-100'}`}
                  >
                    {filterEmails(status).length}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-zinc-400">Emails that have been {status}</CardDescription>
              </CardHeader>
              <CardContent>
                <EmailList emails={filterEmails(status)} />
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
          <DialogContent className="bg-zinc-800 text-zinc-100 w-full max-w-4xl h-[80vh] flex flex-col p-6">
            <DialogHeader className="flex-shrink-0 mb-4">
              <DialogTitle className="text-2xl font-bold">Email Details</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col flex-grow overflow-hidden space-y-4">
              <div className="space-y-2">
                <p><strong>Subject:</strong> {selectedEmail?.subject}</p>
                <p><strong>To:</strong> {selectedEmail?.to}</p>
                <p><strong>Last Message Time:</strong> {selectedEmail && new Date(selectedEmail.messages[selectedEmail.messages.length-1].sentAt).toLocaleString()}</p>
                <p className={`font-semibold ${selectedEmail?.status === 'replied' ? 'text-green-400' : ''}`}>
                  <strong>Status:</strong> {selectedEmail?.status.toUpperCase()}
                </p>
              </div>
              <div className="flex-grow overflow-hidden">
                <h4 className="font-semibold mb-2">Email Body:</h4>
                <ScrollArea className="h-[calc(80vh-250px)] pr-4 border border-zinc-700 rounded-md p-4 pb-8">
                  <div className="space-y-4">
                    {selectedEmail?.attachments && selectedEmail.attachments.length > 0 && renderAttachments(selectedEmail.attachments)}
                    {selectedEmail?.messages && selectedEmail.messages.length > 0 && (
                      <>
                        <hr className="border-t border-zinc-700 my-4" />
                        {selectedEmail.messages.map((reply, index) => (
                          <div key={index} className="mt-2 p-2 bg-zinc-700 border border-zinc-600 rounded-md">
                            <div className='flex items-center gap-2 mb-1'>
                              <p className='text-zinc-400 text-xs'>Time:</p>
                              <p className="text-xs text-zinc-300">{new Date(reply.sentAt).toLocaleString()}</p>
                            </div>
                            <div className='flex items-center gap-2 mb-1'>
                              <p className='text-zinc-400 text-xs'>Sent By:</p>
                              <p className="text-xs text-zinc-300">{reply.from}</p>
                            </div>
                            <div className="text-zinc-100 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: reply.content }}></div>
                            {reply.attachments && reply.attachments.length > 0 && renderAttachments(reply.attachments)}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
          <DialogContent className="bg-zinc-800 text-zinc-100">
            <DialogHeader>
              <DialogTitle>Compose New Email</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-zinc-400">Email composition form would go here.</p>
              <Button onClick={() => setShowComposeDialog(false)} className="mt-4 bg-zinc-700 text-zinc-100 hover:bg-zinc-600">Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}