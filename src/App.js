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

import oferta_banner from './Components/Assets/t3.jpg'
import eveniment_banner from './Components/Assets/t2.jpg'
// import Oferte from './Pages/Oferte';

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
          {/* <Route path='/torturi' component={Torturi}/>
          <Route path='/prajituri' component={Prajituri}/>
          <Route path='/macarons' component={Macarons}/>
          <Route path='/cheesecake' component={Cheesecake}/> */}
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/user' element={<HomeCategory category="user" />} />

          <Route path="/product" element={<Product />} >
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
