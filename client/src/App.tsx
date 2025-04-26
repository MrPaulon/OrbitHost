import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'

// Assets
import './assets/css/App.scss'

// Components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

// Pages
import Home from './pages/Home/Home'
import Manage from './pages/Manage/Manage';


const App = () => (
  <>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <div className="blank"></div>
            <Home />
            <div className="blank"></div>
            <Footer />
          </>
        } />

        <Route path="/manage" element={<Manage />} />
      </Routes>
    </Router>
  </>
);


export default App
