import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GigBids() {
  const { id } = useParams();
  const [bids, setBids] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
   fetch(`https://gigflow-1-i4rk.onrender.com/api/bids/${id}`, {
  credentials: "include",
})

      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => setBids(data))
      .catch(() => setError("Failed to load bids"));
  }, [id]);

  const acceptBid = async (bidId) => {
    await fetch(
      `https://gigflow-1-i4rk.onrender.com/api/bids/accept/${bidId}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    setBids((prev) =>
      prev.map((b) =>
        b._id === bidId
          ? { ...b, status: "accepted" }
          : { ...b, status: "rejected" }
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bids for this Gig</h1>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {bids.length === 0 && !error && <p className="mt-2">No bids yet</p>}

      {bids.map((bid) => (
        <div key={bid._id} className="border p-3 mt-3 rounded">
          <p><b>Bidder:</b> {bid.bidder?.name}</p>
          <p><b>Email:</b> {bid.bidder?.email}</p>
          <p><b>Amount:</b> ₹{bid.amount}</p>
          <p><b>Message:</b> {bid.message}</p>
          <p><b>Status:</b> {bid.status}</p>

          {bid.status === "pending" && (
            <button
              onClick={() => acceptBid(bid._id)}
              className="mt-2 bg-green-600 text-white px-3 py-1"
            >
              Accept Bid
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
