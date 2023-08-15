import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Main } from './Pages/main/Main';
import { Login } from './Pages/Login';
import { Navbar } from './Components/Navbar';
import { CreatePosts } from './Pages/create-posts/create-posts'
import './App.css';

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-posts' element={<CreatePosts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
