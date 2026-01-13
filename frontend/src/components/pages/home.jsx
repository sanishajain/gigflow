export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">Welcome to GigFlow</h1>
      <p className="mt-4 text-gray-600">
        Post gigs, browse gigs, and hire talent easily.
      </p>

      <div className="mt-6 flex justify-center gap-4">
              <a href="/gigs">Browse Gigs</a>

        <a href="/create-gig" className="border px-6 py-2 rounded">
          Post a Gig
        </a>

      </div>
    </div>
  );
}
