import React, { useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function RecipientList({ inputEmails, setInputEmails, sharedArray, processEmails, deleteEmail }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className="space-y-4">
      <textarea
        placeholder="Paste your bulk emails here..."
        value={inputEmails}
        onChange={(e) => setInputEmails(e.target.value)}
        className="min-h-[150px] w-full bg-zinc-700 border-zinc-600 rounded-md p-2 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
      />
      <button 
        onClick={processEmails} 
        className="w-full bg-zinc-600 hover:bg-zinc-500 text-zinc-100 py-2 px-4 rounded-md transition-colors"
      >
        Process Emails
      </button>
      <div 
        ref={scrollContainerRef} 
        className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto p-2 bg-zinc-700 rounded-md"
      >
        {sharedArray.map((email, index) => (
          <div key={index} className="flex items-center bg-zinc-600 rounded px-2 py-1">
            <span className="text-sm mr-2">{email}</span>
            <button
              onClick={() => deleteEmail(index)}
              className="h-5 w-5 rounded-full bg-zinc-500 hover:bg-zinc-400 p-0 flex items-center justify-center"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}