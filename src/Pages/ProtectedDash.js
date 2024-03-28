import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";
import { useAccounts } from "../components/Context/AccountsContext";

function ProtectedDash({ children }) {
  const { isAuthenticated } = useAuth();
  const { currAcc } = useAccounts();
  const navigate = useNavigate();

  // Use useEffect to redirect if user is not authenticated or if role is not admin
  useEffect(() => {
    // If user is not authenticated or if role is not admin, redirect to the appropriate route
    if (!isAuthenticated) {
      // Redirect to the signin page if not authenticated
      navigate("/signin");
    } else if (currAcc.role !== "admin") {
      // Redirect to the previous page if role is not admin
      navigate(-1);
    }
  }, [isAuthenticated, navigate, currAcc.role]);

  // Render children only if user is authenticated and role is admin, otherwise return null
  return isAuthenticated && currAcc.role === "admin" ? children : null;
}

export default ProtectedDash;
