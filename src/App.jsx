import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { RecoilRoot } from 'recoil'; // Import RecoilRoot
import SendEmail from "@/pages/SendEmail";
import EmailOAuth from "@/pages/AuthPage";
import EmailStatus from "@/pages/EmailDashboard";
import Callback from "@/pages/Callback"; // Import the new Callback component
import ProtectedRoute from "@/auth/ProtectedRoute"; // Import ProtectedRoute


function App() {
  return (
    <RecoilRoot> {/* Wrap your app with RecoilRoot */}
      <Router>
        <Routes>
          <Route path="/" element={<EmailOAuth />} />
          <Route
            path="/send-email"
            element={
              <ProtectedRoute>
                <SendEmail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/read"
            element={
              <ProtectedRoute>
                <EmailStatus />
              </ProtectedRoute>
            }
          />
          <Route path="/email/callback" element={<Callback />} /> {/* Add this route */}
         
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;