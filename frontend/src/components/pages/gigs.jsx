import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    fetch("https://gigflow-1-i4rk.onrender.com/api/gigs/get")
      .then(res => res.json())
      .then(data => setGigs(data))
      .catch(() => setError("Failed to load gigs"));
  }, []);

  const filteredGigs = gigs.filter(gig => {
    const matchSearch =
      gig.title.toLowerCase().includes(search.toLowerCase()) ||
      gig.description.toLowerCase().includes(search.toLowerCase());

    const matchMin = minPrice === "" || gig.price >= Number(minPrice);
    const matchMax = maxPrice === "" || gig.price <= Number(maxPrice);

    const matchStatus =
      status === "all" || gig.status === status;

    return matchSearch && matchMin && matchMax && matchStatus;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Browse Gigs</h1>

      <div className="grid md:grid-cols-4 gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2"
        />

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="border p-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="border p-2"
        />

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="border p-2"
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="assigned">Assigned</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredGigs.map(gig => (
          <div key={gig._id} className="border p-4 rounded shadow">
            <h2 className="font-bold text-lg">{gig.title}</h2>
            <p className="text-gray-600">
              {gig.description.slice(0, 80)}...
            </p>
            <p className="mt-2 font-semibold">₹ {gig.price}</p>
            <p className="text-sm text-gray-500">By {gig.user?.name}</p>
            <p className="text-sm">
              Status:{" "}
              <span className={gig.status === "assigned" ? "text-green-600" : "text-blue-600"}>
                {gig.status}
              </span>
            </p>

            <Link
              to={`/gig/${gig._id}`}
              className="inline-block mt-3 text-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
