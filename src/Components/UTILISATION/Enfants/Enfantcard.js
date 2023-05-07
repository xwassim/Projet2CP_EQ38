import React from "react";
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { useRef , useState } from "react";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";


function  EnfantCard (props) {
  const {auth} = useAuth();
  const accessToken = auth?.accessToken ;
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [success , setSuccess] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.delete(
        `../enfant/delete/${props._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true,
        }
      );
  
      setSuccess(true);
  
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else 
        {
        setErrMsg( ' Enfant n"existe pas ');
        console.log(err.response.message);
      }
      //errRef.current.focus();
    
    }
  };
  

 

 const URL='/Formenfant2?_id='+props._id
return (
<div className="mx-1 my-3 rounded-2xl bg-white font-inter">
<div className=" grid grid-cols-3 text-center items-center w-full border-b-2 border-gray-100 border-t-2 my-3 ">
        <button className="bg-[#5560d8] justify-self-start ml-[5%]  w-fit rounded-md font-medium text-center my-2  ring-2 ring-gray-100  hover:scale-105 duration-0" title="Modifier">
        <Link to={URL}>  < AiFillEdit size={20} className=' text-center text-white  cursor-pointer mx-1 my-1  xs:mx-2 xs:my-2 md:mx-3 md:my-3' /> </Link>
        </button>
        <h1 className="font-inter font-bold justify-self-center">{props.prenom}</h1>
        <button onClick={handleClick} className="bg-[#f92912] justify-self-end mr-[5%]  w-fit  rounded-md font-medium text-center my-2  ring-2 ring-gray-100  hover:scale-105 duration-0" title="Supprimer">
          < AiFillDelete  size={20} className=' text-center text-white cursor-pointer mx-1 my-1 xs:mx-2 xs:my-2 md:mx-3 md:my-3' />
        </button>
 </div>
    <h1 className="font-inter mt-5 mb-2"> <span className="font-bold"> Nom : </span> {props.nom} </h1>
    <h1 className="font-inter my-2"> <span className="font-bold"> Prénom : </span>  {props.prenom} </h1>
    <h1 className="font-inter my-2"> <span className="font-bold"> Sexe : </span> {props.sexe} </h1>
    <h1 className="font-inter mt-2 mb-5"> <span className="font-bold"> Age : </span> {props.age} </h1>
    <h1 className="font-inter mt-2 mb-5"> <span className="font-bold"> id : </span> {props._id} </h1>
    
</div>
    
)


}

export default EnfantCard;