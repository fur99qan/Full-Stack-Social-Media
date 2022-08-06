import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import axios from 'axios';


function App() {

  const [authState, setAuthState] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:3001/auth/validate-token', {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false)
        }
        else {
          setAuthState(true)
        }
      })
  }, [])

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <div className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/createpost'>Create a Post</Link>
            {
              !authState && (
                <>
                  <Link to='/login'>Login</Link>
                  <Link to='/registration'>Register</Link>
                </>
              )}
          </div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createpost' element={<CreatePost />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider >
    </div>


  );
}

export default App;
