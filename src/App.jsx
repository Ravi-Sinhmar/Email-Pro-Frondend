import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/auth";
import SendEmail from "@/pages/SendEmail";
import EmailOAuth from "@/pages/emailOAuth";
import EmailStatus from "@/pages/emailStatus";
import { useEffect } from "react";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<EmailOAuth />} />
          <Route path="/send-email" element={<SendEmail />} />
          <Route path="/" element={<EmailStatus />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
