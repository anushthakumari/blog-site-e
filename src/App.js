import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./components//Blog.js";
import { PostProvider } from "./components/Context/PostContext.jsx";

import SignUp from "./Pages/Signup.js";
import SignIn from "./Pages/Sigin.js";
import { AccountsProvider } from "./components/Context/AccountsContext.jsx";
import { AuthProvider } from "./components/Context/AuthContext.jsx";
import Category from "./components/Category.js";
// import PostDetail from "./components/PostDetail.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import ProtectedRoute from "./Pages/ProtectedRoute.js";
import ProtectedDash from "./Pages/ProtectedDash.js";
import PostOverview from "./components/Postoverview/PostOverview.js";
import Subscribe from "./ui/Subscribe/Subscribe";


function App() {
  return (
    <>
      <BrowserRouter>
        <AccountsProvider>
          <AuthProvider>
            <PostProvider>
              <Routes>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Blog />
                    </ProtectedRoute>
                  }
                />
                <Route path="/subscribe" element={<Subscribe />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedDash>
                      <Dashboard />
                    </ProtectedDash>
                  }
                />

                <Route path="/category/:cat" element={<Category />} />
                <Route path="/post/:id" element={<PostOverview />} />
              </Routes>
            </PostProvider>
          </AuthProvider>
        </AccountsProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
