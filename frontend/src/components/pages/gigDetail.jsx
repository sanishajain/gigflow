import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function GigDetail() {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://gigflow-1-i4rk.onrender.com/api/gigs/get", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        const found = data.find((g) => g._id === id);
        setGig(found || null);
      })
      .catch(() => setError("Failed to load gig"));
  }, [id]);

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!gig) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{gig.title}</h1>
      <p className="mt-2">{gig.description}</p>
      <p className="mt-2 font-semibold">₹{gig.price}</p>
      <p className="text-sm">Posted by: {gig.user?.name}</p>
      <p className="mt-2"><b>Status:</b> {gig.status}</p>

      {gig.status === "assigned" && (
        <p className="text-green-600">
          Assigned to: {gig.assignedTo?.name}
        </p>
      )}

      {gig.status !== "assigned" ? (
        <Link
          to={`/bid/${gig._id}`}
          className="inline-block mt-4 bg-black text-white px-4 py-2"
        >
          Place Bid
        </Link>
      ) : (
        <p className="mt-4 text-gray-500">Bidding is closed for this gig.</p>
      )}
    </div>
  );
}
