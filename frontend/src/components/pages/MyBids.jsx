import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyBids() {
  const [bids, setBids] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not logged in");
      return;
    }

    fetch("http://localhost:5000/api/bids/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then(data => setBids(data))
      .catch(() => setError("Failed to load your bids"));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bids</h1>

      {error && <p className="text-red-500">{error}</p>}
      {!error && bids.length === 0 && <p>No bids yet</p>}

      {bids.map(bid => (
        <div key={bid._id} className="border p-4 mb-4 rounded">
          <p>
            <b>Gig:</b>{" "}
            <span
              className="text-blue-600 cursor-pointer underline"
              onClick={() => navigate(`/gig/${bid.gig?._id}`)}
            >
              {bid.gig?.title}
            </span>
          </p>

          <p><b>Amount:</b> ₹{bid.amount}</p>
          <p><b>Status:</b> {bid.status}</p>
        </div>
      ))}
    </div>
  );
}
