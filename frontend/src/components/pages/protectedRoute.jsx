import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API = "https://gigflow-1-i4rk.onrender.com";

export default function ProtectedRoute({ children }) {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/profile`, { credentials: "include" })
      .then(res => setOk(res.ok))
      .catch(() => setOk(false));
  }, []);

  if (ok === null) return <p>Loading...</p>;
  return ok ? children : <Navigate to="/login" />;
}
