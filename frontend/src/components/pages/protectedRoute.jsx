import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch("https://gigflow-1-i4rk.onrender.com/api/profile", {
      credentials: "include",
    })
      .then(res => setAuthorized(res.ok))
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authorized) return <Navigate to="/login" />;

  return children;
}
