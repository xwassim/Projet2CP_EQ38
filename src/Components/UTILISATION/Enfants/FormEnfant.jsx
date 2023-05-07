import React from 'react'
import Navbar from '../../Navbar';
import Footer from '../../HomePage/Footer';
import AjoutEnfant from './AjoutEnfant';
import useAuth from '../../../hooks/useAuth';




const FormEnfant = () => {

  const {auth} =useAuth();
  return (
    <>
    <nav>
        <Navbar/>
    </nav>
    <div className=' mx-[20%] '> 
        <AjoutEnfant  />
    </div>
   

    </>
  )
}

export default FormEnfant;