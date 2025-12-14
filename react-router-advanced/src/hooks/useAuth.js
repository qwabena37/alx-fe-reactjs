import { useState } from "react";

// Simple mock hook to simulate authentication status
export default function useAuth() {
  // You can replace this with real auth logic later
  const [isAuthenticated] = useState(false); 
  return { isAuthenticated };
}
