import React from 'react';

export default function EmailList({ emails, onSelectEmail, getStatusColor }) {
  return (
    <div className="h-[400px] overflow-y-auto pr-2">
      {emails.map(email => (
        <div key={email.id} className="mb-2 last:mb-0">
          <div 
            className="flex items-center space-x-4 p-4 text-zinc-100 hover:text-black hover:bg-zinc-100 cursor-pointer border border-zinc-700 rounded-lg transition-all duration-200 ease-in-out hover:shadow-md" 
            onClick={() => onSelectEmail(email)}
          >
            <div className={`w-3 h-3 rounded-full ${getStatusColor(email.status)}`} />
            <div className="flex-1">
              <p className="font-medium">{email.to}</p>
              <p className="text-sm line-clamp-2">{email.subject}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}