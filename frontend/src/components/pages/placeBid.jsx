import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PlaceBid() {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to place a bid");
      navigate("/login");
      return;
    }

    const bidData = { amount: Number(amount), message };

    try {
      const res = await fetch(`https://gigflow-1-i4rk.onrender.com/api/bids/${gigId}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bidData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Bid placed successfully");
        navigate(`/gigs/${gigId}`);
      } else {
        alert(data.message || "Failed to place bid");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Place a Bid</h2>

        <input
          type="number"
          className="w-full border p-2 mb-3"
          placeholder="Bid Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-3"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2">
          Submit Bid
        </button>
      </form>
    </div>
  );
}
