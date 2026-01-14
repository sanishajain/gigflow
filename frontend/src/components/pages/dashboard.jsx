import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://gigflow-1-i4rk.onrender.com";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const profileRes = await fetch(`${API}/api/profile`, {
          credentials: "include",
        });

        if (!profileRes.ok) {
          navigate("/login");
          return;
        }

        setUser(await profileRes.json());

        const gigsRes = await fetch(`${API}/api/gigs/my`, {
          credentials: "include",
        });

        const gigsData = await gigsRes.json();
        setGigs(Array.isArray(gigsData) ? gigsData : []);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate]);

  const deleteGig = async (id) => {
    await fetch(`${API}/api/gigs/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setGigs(prev => prev.filter(g => g._id !== id));
  };

  if (loading) return <p className="p-6">Loading...</p>;

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

      {gigs.length === 0 && <p>No gigs yet</p>}

      {gigs.map(gig => (
        <div key={gig._id} className="border p-3 mt-3 rounded">
          <h3 className="font-bold">{gig.title}</h3>
          <p>{gig.description}</p>
          <p>₹{gig.price}</p>
          <p>Status: {gig.status}</p>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => deleteGig(gig._id)}
              className="bg-red-500 text-white px-3 py-1">
              Delete
            </button>

            <button
              onClick={() => navigate(`/gig/${gig._id}/bids`)}
              className="bg-black text-white px-3 py-1">
              View Bids
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
