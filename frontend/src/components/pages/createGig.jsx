import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}/api/gigs/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        price: Number(budget),
      }),
    });

    if (res.ok) {
      alert("Gig created");
      navigate("/dashboard");
    } else {
      alert("Failed to create gig");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-96 shadow">
        <h2 className="text-xl font-bold mb-4">Post a Gig</h2>

        <input className="w-full border p-2 mb-3"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea className="w-full border p-2 mb-3"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input type="number"
          className="w-full border p-2 mb-3"
          placeholder="Budget"
          value={budget}
          onChange={e => setBudget(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2">Create</button>
      </form>
    </div>
  );
}
