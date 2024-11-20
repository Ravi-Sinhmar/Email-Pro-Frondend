import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar } from '@radix-ui/react-avatar'

export default function Component({ sharedArray, updateArray }) {
  const [inputEmails, setInputEmails] = useState('')
  const [processedEmails, setProcessedEmails] = useState([])
  const scrollContainerRef = useRef(null)
  const [shouldScrollRight, setShouldScrollRight] = useState(false)

  const processEmails = () => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const newEmails = inputEmails.match(emailRegex) || []
    setProcessedEmails(prevEmails => {
      const combinedEmails = [...prevEmails, ...newEmails]
      return Array.from(new Set(combinedEmails)) // Remove duplicates
    })
    // Update shared array with new emails
    updateArray([...sharedArray, ...newEmails])
    setInputEmails('')
    setShouldScrollRight(true)
  }

  useEffect(() => {
    if (shouldScrollRight && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth
      setShouldScrollRight(false)
    }
  }, [processedEmails, shouldScrollRight])

  const deleteEmail = (index) => {
    setProcessedEmails(prevEmails => {
      const updatedEmails = prevEmails.filter((_, i) => i !== index)
      // Update shared array when deleting an email
      updateArray(updatedEmails)
      return updatedEmails
    })
  }

  const updateEmail = (index, newValue) => {
    setProcessedEmails(prevEmails => {
      const updatedEmails = prevEmails.map((email, i) => i === index ? newValue : email)
      // Update shared array when updating an email
      updateArray(updatedEmails)
      return updatedEmails
    })
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
    <div className=" space-y-4 md:col-span-1 flex flex-col h-svh relative">

    <Textarea
      placeholder="Paste your bulk emails here..."
      value={inputEmails}
      onChange={(e) => setInputEmails(e.target.value)}
      className="min-h-[200px] bg-transparent text-white border-zinc-800"
    />
    <Button onClick={processEmails} className=" bg-white text-black hover:bg-white">Process Emails</Button>
    <div className="relative flex-1 overflow-hidden">
      <div 
        ref={scrollContainerRef}
        className="flex flex-col overflow-y-scroll h-full space-y-2 p-2 border bg-white border-zinc-700 rounded-md scrollbar-hide w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {processedEmails.map((email, index) => (
          <div key={index} className="flex items-center justify-between w-full space-x-2 rounded-md px-2 py-1">
            <Input
              type="email"
              value={email}
              onChange={(e) => updateEmail(index, e.target.value)}
              className="w-full h-full flex p-3 outline-none bg-zinc-900 text-white border-none"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteEmail(index)}
              aria-label={`Delete ${email}`}
              className="w-fit bg-red-600 text-white hover:bg-red-700 hover:text-white aspect-square"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  </div>
  </>
  
  )
}