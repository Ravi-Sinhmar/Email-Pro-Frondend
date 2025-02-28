import React from 'react';
import { Paperclip } from 'lucide-react';

export default function EmailForm({ subject, setSubject, message, setMessage, resume, setResume, sendEmailHandler }) {
  return (
    <div className="md:col-span-2 space-y-4">
      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full bg-zinc-700 border-zinc-600 rounded-md p-2 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
      />
      <textarea
        placeholder="Write your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[300px] w-full bg-zinc-700 border-zinc-600 rounded-md p-2 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
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
          <button
            onClick={() => document.getElementById('resume').click()}
            className="bg-zinc-700 border border-zinc-600 text-zinc-100 hover:bg-zinc-600 px-3 py-2 rounded-md flex items-center"
          >
            <Paperclip className="mr-2 h-4 w-4" />
            Attach Resume
          </button>
          {resume && <span className="text-sm text-zinc-400">{resume.name}</span>}
        </div>
        <button
          onClick={sendEmailHandler}
          className="bg-zinc-600 hover:bg-zinc-500 text-zinc-100 px-4 py-2 rounded-md transition-colors"
        >
          Send Email
        </button>
      </div>
    </div>
  );
}