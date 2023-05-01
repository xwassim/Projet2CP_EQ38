import React from 'react';


import { Routes, Route } from 'react-router-dom';

import PageLogin from './Components/PageLogin';

import Home from './Components/HomePage/Home';






function App() {
  return (

    <>
    <Routes>
      <Route path='/' element={<Home />} />
   
 
      <Route path="/Login" element={<PageLogin/>} />
    
    

      
    </Routes>
      

   
       </>
  );
}

export default App;
