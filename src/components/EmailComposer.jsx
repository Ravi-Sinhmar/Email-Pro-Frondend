
import { useState, useRef, useEffect } from "react"

export default function EmailComposer({ sharedArray, sendEmailHandler }) {
  const scrollContainerRef = useRef(null)
  const [subject, setSubject] = useState()
  const [message, setMessage] = useState()
  const [resume, setResume] = useState(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth
    }
  }, []) // Updated dependency array

  // sendEamil button onClick
  const sendEmail = () => {
    sendEmailHandler(subject, message, resume)
  }

  return (
    <div className="md:col-span-2 bg-zinc-950 text-white border border-zinc-800 rounded-md pt-4 shadow-md">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="from" className="min-w-[3rem] text-sm font-medium">
              From
            </label>
            <div className="flex items-center space-x-2 flex-1">
              <input
                id="from"
                defaultValue="sender@gmail.com"
                className="w-full rounded-md bg-zinc-800 px-2 py-2 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                readOnly
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="to" className="min-w-[3rem] text-sm font-medium">
              To
            </label>

            <div
              ref={scrollContainerRef}
              className="flex p-2 border border-zinc-700 rounded-md overflow-x-scroll space-x-2 min-w-14 min-h-9 w-full"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {sharedArray.map((email, index) => (
                <div key={index} className="flex-shrink-0 bg-zinc-700 px-2 py-1 rounded text-xs">
                  {email}
                </div>
              ))}
            </div>
          </div>
        </div>

        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-transparent border border-zinc-700 rounded-md text-lg font-semibold px-2 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
        />

        <textarea
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ whiteSpace: "pre-wrap" }}
          className="w-full min-h-[320px] bg-transparent border border-zinc-800 rounded-md resize-none px-2 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
        />
        <div className="flex justify-between">
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            accept=".pdf,.doc,.docx"
            className="text-sm text-zinc-300"
          />
          <button
            onClick={sendEmail}
            className="bg-white text-zinc-800 hover:bg-zinc-200 px-4 py-2 rounded-md font-medium transition-colors"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  )
}

