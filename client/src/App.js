import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='navbar'>
          <Link to='/'>Home</Link>
          <Link to='/createpost'>Create a Post</Link>
          <Link to='/login'>Login</Link>
          <Link to='/registration'>Register</Link>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
