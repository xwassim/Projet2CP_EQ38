import React from 'react'
import Navbar from '../../Navbar';
import Footer from '../../HomePage/Footer';
import AjoutEnfant from './AjoutEnfant';
import useAuth from '../../../hooks/useAuth';
import ModifEnfant from './ModifEnfant';
import { useLocation } from 'react-router-dom';



export default function FormEnfant2 ()  {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const _id = params.get('_id');
    const {auth} = useAuth();
    const filteredItems = auth?.user?.Enfant.filter(item => item._id === _id);
  
  return (
    <>
    <nav>
        <Navbar/>
    </nav>
    <div className=' mx-[20%] '> 
      
    { filteredItems.map(item => (
         <ModifEnfant nom={item.nom} prenom={item.prenom} sexe={item.sexe} age={item.age} _id={item._id} />
        ))}
    </div>
   

    </>
  )
}