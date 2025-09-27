import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import AdminPanel from './pages/AdminPanel';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = React.useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {user && <Route path="/create" element={<CreatePost />} />}
          <Route path="/post/:slug" element={<PostDetail />} />
          {user && user.role === 'admin' && <Route path="/admin" element={<AdminPanel />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
