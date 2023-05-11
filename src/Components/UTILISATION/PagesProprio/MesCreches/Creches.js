import React from "react";
import {CrecheUserx} from '../../../../data';

import CrecheCard from "./CrecheCard";
import { useState, useEffect } from "react";
 const Creches = () => { 
  const [creches , setCreches] = useState([]);
  let storeUser ;
  useEffect(() => {
    storeUser = JSON.parse(localStorage.getItem('user'));

    if (storeUser !== null) {
        setCreches(storeUser.user.liste_creches);
       
    }
  }
    ,[])
  const datacamp = CrecheUserx.map((data) => {
   
    return (
      
        <CrecheCard  name={data.name} Commune={data.Commune} Wilaya={data.wilaya} Description={data.Description}  />
      
    )
  }) 

  
      return ( 
      <div className="w-full grid xs:grid-cols-2 ">
             {datacamp}
      </div>
            

          );
        };

 export default Creches;