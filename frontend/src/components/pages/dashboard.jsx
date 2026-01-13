import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Load profile
    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) setError(data.message);
        else setUser(data);
      })
      .catch(() => setError("Profile error"));

    // Load my gigs
    fetch("http://localhost:5000/api/gigs/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setGigs(data))
      .catch(() => setError("Failed to load gigs"));
  }, [navigate]);

  const deleteGig = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/gigs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setGigs(gigs.filter(g => g._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {user && (
        <div className="mt-4">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6">My Gigs</h2>

      {gigs.length === 0 && <p className="mt-2">No gigs yet</p>}

     {gigs.map(gig => (
  <div key={gig._id} className="border p-3 mt-3 rounded">
    <h3 className="font-bold">{gig.title}</h3>
    <p>{gig.description}</p>
    <p>₹{gig.price}</p>
    <p>Status: {gig.status}</p>

    {gig.status === "assigned" && (
      <p className="text-green-600">
        Assigned to: {gig.assignedTo?.name}
      </p>
    )}

    <div className="flex gap-3 mt-2">
      <button
        onClick={() => deleteGig(gig._id)}
        className="bg-red-500 text-white px-3 py-1"
      >
        Delete
      </button>

      <button
        onClick={() => navigate(`/gig/${gig._id}/bids`)}
        className="bg-black text-white px-3 py-1"
      >
        View Bids
      </button>
    </div>
  </div>
))}


      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
