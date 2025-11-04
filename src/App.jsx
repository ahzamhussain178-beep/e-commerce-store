import React from "react";
import Routes from "./Router";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PhoneAuthGate from './components/auth/PhoneAuthGate';

const AppInner = () => {
  const { isVerified } = useAuth();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes />
      {!isVerified && <PhoneAuthGate />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

export default App;
