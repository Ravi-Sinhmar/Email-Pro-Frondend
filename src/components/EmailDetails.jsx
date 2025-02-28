import React from 'react';
import EmailAttachments from './EmailAttachments';

export default function EmailDetails({ email, onClose }) {
  if (!email) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-800 text-zinc-100 w-full max-w-4xl h-[80vh] flex flex-col p-6 rounded-lg shadow-xl">
        <div className="flex-shrink-0 mb-4 border-b border-zinc-700 pb-2">
          <h2 className="text-2xl font-bold">Email Details</h2>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col flex-grow overflow-hidden space-y-4">
          <div className="space-y-2">
            <p><strong>Subject:</strong> {email.subject}</p>
            <p><strong>To:</strong> {email.to}</p>
            <p><strong>Last Message Time:</strong> {new Date(email.messages[email.messages.length-1].sentAt).toLocaleString()}</p>
            <p className={`font-semibold ${email.status === 'replied' ? 'text-green-400' : ''}`}>
              <strong>Status:</strong> {email.status.toUpperCase()}
            </p>
          </div>
          <div className="flex-grow overflow-hidden">
            <h4 className="font-semibold mb-2">Email Body:</h4>
            <div className="h-[calc(80vh-250px)] pr-4 border border-zinc-700 rounded-md p-4 pb-8 overflow-y-auto">
              <div className="space-y-4">
                {email.attachments && email.attachments.length > 0 && 
                  <EmailAttachments attachments={email.attachments} />
                }
                {email.messages && email.messages.length > 0 && (
                  <>
                    <hr className="border-t border-zinc-700 my-4" />
                    {email.messages.map((reply, index) => (
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
                        {reply.attachments && reply.attachments.length > 0 && 
                          <EmailAttachments attachments={reply.attachments} />
                        }
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}