import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Dashboard from "./components/pages/dashboard";
import Navbar from "./components/pages/navbar";
import CreateGig from "./components/pages/createGig";
import Gigs from "./components/pages/gigs";
import GigDetail from "./components/pages/gigDetail";
import ProtectedRoute from "./components/pages/protectedRoute";
import PlaceBid from "./components/pages/placeBid";
import GigBids from "./components/pages/GigBids";
import MyBids from "./components/pages/MyBids";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-gig"
          element={
            <ProtectedRoute>
              <CreateGig />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gigs"
          element={
            <ProtectedRoute>
              <Gigs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gig/:id"
          element={
            <ProtectedRoute>
              <GigDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bid/:gigId"
          element={
            <ProtectedRoute>
              <PlaceBid />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gig/:id/bids"
          element={
            <ProtectedRoute>
              <GigBids />
            </ProtectedRoute>
          }
        />

        <Route 
        path="/my-bids" 
        element={
        <ProtectedRoute>
          <MyBids />
          </ProtectedRoute>
        } 
        />


      </Routes>
    </BrowserRouter>
  );
}
