import React  from "react";
import {EnfantUserx} from '../../../data';
import EnfantCard from './Enfantcard';
import useAuth from "../../../hooks/useAuth";

const Enfants = () => { 
    
  const { auth } = useAuth();


  const datacamp= auth?.user?.Enfant.map((data) => {

    return (
      <EnfantCard key={data.key} nom={data.nom} prenom={data.prenom} sexe={data.sexe} age={data.age} />
    )
  }) 

  
      return ( 
      <div className="w-full grid pio:grid-cols-2 ">
             {datacamp}
      </div>
            

          );
        };

 export default Enfants;
