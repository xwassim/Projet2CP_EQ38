import React from "react";
import Navbar from "../../Navbar";
import DescriptionProfile from "./Descriptions/DescriptionProfile";
import Footer from "../../HomePage/Footer";
import DescriptionCompte from "./Descriptions/DescriptionCompte";
import useAuth from "../../../hooks/useAuth";
import { users } from '../../../data';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

const MonProfil = () => {
  
  const { auth } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  
  return (
    <>
  
      <nav>
        <Navbar />
      </nav>
      <div>
        <h2 className="text-xl text-blue-950  text-center mb-5 font-medium sm:text-3xl ">
          Informations concernat votre compte
        </h2>

      
         <DescriptionProfile 
         email={auth?.user?.email} username={auth?.user?.username} nom={auth?.user?.nom} 
         prenom={auth?.user?.prenom}  telephone={auth?.user?.telephone} adresse={auth?.user?.adresse}  
         codePostal={auth?.user?.roles} commune={auth?.user?.commune} wilaya={auth?.user?.wilaya} />

      

        <DescriptionCompte />
      </div>
      <footer className="mt-10">
        <Footer />
      </footer>
    </>
  );
};

export default MonProfil;
