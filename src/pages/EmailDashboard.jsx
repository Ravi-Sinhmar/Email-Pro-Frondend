import { useState, useEffect } from 'react';
import EmailList from '@/components/EmailList';
import EmailDetails from '@/components/EmailDetails';
import { authState } from '@/states/atoms/auth';
import { useRecoilValue } from 'recoil';

export default function EmailDashboard() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [allEmails, setAllEmails] = useState([]);
  const [messageCount, setMessageCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const isAuth = useRecoilValue(authState)



  useEffect(() => {
    if(isAuth){
      handleReadEmails();
    }
  },[isAuth]);

  const handleReadEmails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/readEmails', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: messageCount }),
        credentials: 'include' 
      });
      if (response.ok) {
        const data = await response.json();
        setAllEmails(data.data);
        console.log('Got All Emails:', data.data);
      } else {
        throw new Error('Error in fetching emails');
      }
    } catch (error) {
      console.error('Error during fetching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterEmails = (status) => 
    allEmails.filter(email => email.status === status);

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-zinc-400';
      case 'replied': return 'bg-green-500';
      default: return 'bg-zinc-400';
    }
  };

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
              <button 
                onClick={handleReadEmails}
                disabled={isLoading}
                className="bg-zinc-700 text-white hover:bg-zinc-600 px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Fetch Emails'}
              </button>
            </div>
            <a href="/send-email" className="text-zinc-100 hover:text-zinc-300">Compose</a>
            <button className="bg-green-700 text-white cursor-default hover:bg-green-700 px-3 py-1 rounded-md">Authenticated</button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {['sent', 'replied'].map((status) => (
            <div key={status} className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden shadow-md">
              <div className="p-4 border-b border-zinc-700">
                <div className="flex justify-between items-center text-zinc-100">
                  <h3 className="text-lg font-semibold">{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
                  <span 
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${status === 'replied' ? 'bg-green-700 text-green-100' : 'bg-zinc-700 text-zinc-100'} border border-zinc-600`}
                  >
                    {filterEmails(status).length}
                  </span>
                </div>
                <p className="text-sm text-zinc-400">Emails that have been {status}</p>
              </div>
              <div className="p-4">
                <EmailList 
                  emails={filterEmails(status)} 
                  onSelectEmail={setSelectedEmail}
                  getStatusColor={getStatusColor}
                />
              </div>
            </div>
          ))}
        </div>

        {selectedEmail && (
          <EmailDetails 
            email={selectedEmail} 
            onClose={() => setSelectedEmail(null)} 
          />
        )}

        {showComposeDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-zinc-800 text-zinc-100 rounded-lg p-6 w-full max-w-md">
              <div className="border-b border-zinc-700 pb-2 mb-4">
                <h2 className="text-xl font-bold">Compose New Email</h2>
              </div>
              <div className="mt-4">
                <p className="text-zinc-400">Email composition form would go here.</p>
                <button 
                  onClick={() => setShowComposeDialog(false)} 
                  className="mt-4 bg-zinc-700 text-zinc-100 hover:bg-zinc-600 px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}