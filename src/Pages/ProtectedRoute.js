/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";
// import { useAuth } from "../Context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  // Use useEffect to redirect if user is not authenticated
  useEffect(() => {
    // If user is not authenticated, redirect to the homepage
    if (!isAuthenticated) navigate("/signin");
  }, [isAuthenticated, navigate]);

  // Render children only if user is authenticated, otherwise return null
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
