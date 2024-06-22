import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import HomeCategory from './Pages/HomeCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import Blog from './Pages/Blog';
import Contact from './Pages/Contact';
import Torturi from './Pages/Torturi';
import Prajituri from './Pages/Prajituri';
import Cheesecake from './Pages/Cheesecake';
import Macarons from './Pages/Macarons';
import oferta_banner from './Components/Assets/t3.jpg';
import eveniment_banner from './Components/Assets/t2.jpg';


function App() {
  return (
    <div>
    
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/evenimente' element={<HomeCategory banner ={eveniment_banner} category="eveniment" />} />
          <Route path='/oferte' element={<HomeCategory banner ={oferta_banner} category="oferta" />} />


          <Route path='/produse' element={<HomeCategory category="produs"/>} />
          <Route path='/torturi' element={<Torturi/>}/>
          <Route path='/prajituri' element={<Prajituri/>}/>
          <Route path='/macarons' element={<Macarons/>}/>
          <Route path='/cheesecake' element={<Cheesecake/>}/> 
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact/>} />

          <Route path="/product" element={<Product />}>
  <Route path=':productId' element={<Product/>}/>
</Route>

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
