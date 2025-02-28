import { useState, useRef, useEffect } from 'react';
import { authState } from '@/states/atoms/auth';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import RecipientList from '@/components/RecipientList';
import EmailForm from '@/components/EmailForm';

export default function SendEmail() {
  const [sharedArray, setSharedArray] = useState([]);
  const [inputEmails, setInputEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();
  const isAuth = useRecoilValue(authState);

  const updateArray = (newArray) => {
    setSharedArray(newArray);
  };

  const processEmails = () => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const newEmails = inputEmails.match(emailRegex) || [];
    updateArray([...new Set([...sharedArray, ...newEmails])]);
    setInputEmails('');
  };

  const deleteEmail = (index) => {
    updateArray(sharedArray.filter((_, i) => i !== index));
  };

  const sendEmailHandler = async () => {
    if (!isAuth) {
      alert('Please authenticate first.');
      navigate('/');
      return;
    }

    const formatedMessage = message.replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    const formData = new FormData();
    formData.append("message", formatedMessage);
    formData.append("toEmail", JSON.stringify(sharedArray));
    formData.append("subject", subject);
    if (resume) {
      formData.append("resume", resume);
    }

    try {
      const response = await fetch('http://localhost:3000/sendEmail', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Emails sent successfully!');
          setInputEmails('');
          setSharedArray([]);
          setResume(null);
          setInputEmails('');
          setSubject('');
          setMessage('');
        } else {
          alert('Failed to send emails.');
        }
      } else {
        alert('Failed to send emails.');
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Error sending emails.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <nav className="bg-zinc-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Email Dashboard</h1>
          <div className="space-x-4">
            <a href="/read" className="text-zinc-100 hover:text-zinc-300">Read Emails</a>
            <button className={`bg-green-700 text-white cursor-default hover:bg-green-700 px-3 py-1 rounded-md ${!isAuth ? 'hidden' : ''}`}>
              Authenticated
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6 space-y-6">
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg shadow-md">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RecipientList 
                inputEmails={inputEmails}
                setInputEmails={setInputEmails}
                sharedArray={sharedArray}
                processEmails={processEmails}
                deleteEmail={deleteEmail}
              />
              <EmailForm 
                subject={subject}
                setSubject={setSubject}
                message={message}
                setMessage={setMessage}
                resume={resume}
                setResume={setResume}
                sendEmailHandler={sendEmailHandler}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}