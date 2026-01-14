import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const gigData = {
      title,
      description,
      price: Number(budget),
    };

    try {
      const res = await fetch(
        "https://gigflow-1-i4rk.onrender.com/api/gigs/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(gigData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed");
        return;
      }

      alert("Gig created");
      navigate("/dashboard");
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96 shadow">
        <h2 className="text-xl font-bold mb-4">Post a Gig</h2>

        <input className="w-full border p-2 mb-3" placeholder="Title"
          value={title} onChange={e => setTitle(e.target.value)} />

        <textarea className="w-full border p-2 mb-3" placeholder="Description"
          value={description} onChange={e => setDescription(e.target.value)} />

        <input type="number" className="w-full border p-2 mb-3" placeholder="Budget"
          value={budget} onChange={e => setBudget(e.target.value)} />

        <button className="bg-black text-white w-full py-2">Create Gig</button>
      </form>
    </div>
  );
}
