import React from "react";
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';

function  EnfantCard (props) {
return (
<div className="mx-1 my-3 rounded-2xl bg-white font-inter">
<div className=" grid grid-cols-3 text-center items-center w-full border-b-2 border-gray-100 border-t-2 my-3 ">
        <button className="bg-[#5560d8] justify-self-start ml-[5%]  w-fit rounded-md font-medium text-center my-2  ring-2 ring-gray-100  hover:scale-105 duration-0" title="Modifier">
          < AiFillEdit size={20} className=' text-center text-white  cursor-pointer mx-1 my-1  xs:mx-2 xs:my-2 md:mx-3 md:my-3' />
        </button>
        <h1 className="font-inter font-bold justify-self-center">{props.prenom}</h1>
        <button className="bg-[#f92912] justify-self-end mr-[5%]  w-fit  rounded-md font-medium text-center my-2  ring-2 ring-gray-100  hover:scale-105 duration-0" title="Supprimer">
          < AiFillDelete size={20} className=' text-center text-white cursor-pointer mx-1 my-1 xs:mx-2 xs:my-2 md:mx-3 md:my-3' />
        </button>
 </div>
    <h1 className="font-inter mt-5 mb-2"> <span className="font-bold"> Nom : </span> {props.nom} </h1>
    <h1 className="font-inter my-2"> <span className="font-bold"> Prénom : </span>  {props.prenom} </h1>
    <h1 className="font-inter my-2"> <span className="font-bold"> Sexe : </span> {props.sexe} </h1>
    <h1 className="font-inter mt-2 mb-5"> <span className="font-bold"> Age : </span> {props.age} </h1>
    
</div>
    
)


}

export default EnfantCard;