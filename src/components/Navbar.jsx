import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        BlogPlatform
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <Link to="/create">Create Post</Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-green-500 px-3 py-1 rounded">
              Login
            </Link>
            <Link to="/register" className="bg-yellow-500 px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
