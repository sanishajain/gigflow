import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !budget) {
      alert("All fields are required");
      return;
    }

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
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",   // ✅ IMPORTANT (cookie auth)
          body: JSON.stringify(gigData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Gig created");
        navigate("/dashboard");
      } else {
        if (res.status === 401) {
          alert("Session expired. Please log in again.");
          navigate("/login");
        } else {
          alert(data.message || "Failed to create gig");
        }
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Post a Gig</h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2">
          Create Gig
        </button>
      </form>
    </div>
  );
}
