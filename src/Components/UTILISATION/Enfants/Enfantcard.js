import React from "react";
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import PopUp from "../../Functions/PopUp";
import { useRef, useState } from "react";
import axios from "../../../api/axios";
import useRefreshToken from "../../../hooks/useRefreshToken";
import Select from "react-select";
 


function  EnfantCard (props) {

  

  const [errMsg, setErrMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const refresh = useRefreshToken();


    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const newAccessToken = await refresh();

            const response = await axios.delete(
                `../enfant/delete/${props._id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                    withCredentials: true,
                }
        );

            setSuccess(true);
            const user = response?.data?.user;
            //update user in loacal storage
            localStorage.setItem('user', JSON.stringify({ user }));
            //relaod page
            window.location.reload();
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



    



  function Modifie() {  
 
    const [showButton, setShowButton] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [age , setAge] = useState(props.age)

    const ageoptions = [
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
      { value: 5, label: "5" },
      { value: 6, label: "6" },
  ];
     
    const openPopup = () => {
      setShowPopup(true);
    };
  
    const closePopup = () => {
      setShowPopup(false);
      
    };

  
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const newAccessToken = await refresh();
          
          const response = await axios.put(
              `../enfant/modifier/${props._id}`,
              JSON.stringify({ nom : props.nom ,prenom : props.prenom , age , sexe : props.sexe }),
              {
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${newAccessToken}`
                  },
                  withCredentials: true,
              }

          );
          setSuccess(true);
          const user = response?.data?.user;
         
          //update user in loacal storage after modification of user data
          localStorage.setItem('user', JSON.stringify({ user }));
          window.location.reload();
        
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else {
              setErrMsg('Modification Failed');
              console.log(err?.response?.messqge);
          }
          //errRef.current.focus();

      }
  }

 
  
    return (
      <div className="z-50">
 
        <div className="hover:text-blue-950">
        {showButton && (

    <button 
    onClick={() => { openPopup();   }}
      
    className="bg-[#2b305e] ring ring-[#c21010]   w-fit rounded-md font-medium text-center my-2    hover:scale-105 duration-75 hover:bg-[#091278]" title="Modifier">
    < AiFillEdit size={20} className=' text-center text-white  cursor-pointer mx-1 my-1  xs:mx-2 xs:my-2 md:mx-3 md:my-3' />
  </button>

    )}
    </div>
        {showPopup && <PopUp content={<>
        <div className="xl:w-[1000px]  ld:w-[600px]">
        <div className="flex flex-col mx-[5%] ring-[#ff5353] ring-4  rounded-lg p-10 mt-[50px]">
            <h2 className="text-xl font-semibold">Modification des informations</h2>
            
            <div className="grid md:grid-cols-2 md:gap-6 my-2">
      
                <div id="select">
                    <div className="mb-2 block">
                        <label htmlFor="age" value="Select your type" s>
                            Age
                        </label>
                    </div>
                    <Select  required   
                    onChange={(value) => setAge(value.value)}
                     options={ageoptions} />
                </div>
            
               
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-blue-950 hover:text-red-500"
        >
          <a href="/MesEnfants">Annuler</a> 
        </button>
        <button
         onClick={handleSubmit}
          type="submit"
          className="rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-900 hover:scale-105 duration-100 ring-2 ring-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sauvgarder
        </button>
      </div>

        </div>
        </div>
         </>}
           closePopup={closePopup} />}
      </div>
    );
  };

return (
<div className="mx-3 my-3 rounded-2xl bg-white ring ring-[#ff7c7c] font-inter">
<div className=" grid grid-cols-3 text-center items-center w-full border-b-2 border-red-200 border-t-2 my-3 ">
       <div className="justify-self-start ml-[6%] ">
<Modifie/>
       </div>
        <h1 className="font-inter font-bold justify-self-center">{props.prenom}</h1>
        <button onClick={handleClick} className="bg-[#ff6565] justify-self-end mr-[6%]  w-fit  rounded-md font-medium text-center my-2  ring ring-[#081060]  hover:scale-105 duration-75 hover:bg-[#c21010]" title="Supprimer">
          < AiFillDelete size={20} className=' text-center text-white cursor-pointer mx-1 my-1 xs:mx-2 xs:my-2 md:mx-3 md:my-3' />
        </button>
 </div>
    <h1 className="font-inter mt-5 mb-2 "> <span className="font-bold"> Nom : </span> {props.nom} </h1>
    <h1 className="font-inter my-2 "> <span className="font-bold"> Prénom : </span>  {props.prenom} </h1>
    <h1 className="font-inter my-2 "> <span className="font-bold"> Sexe : </span> {props.sexe} </h1>
    <h1 className="font-inter mt-2 mb-5 "> <span className="font-bold"> Age : </span> {props.age} </h1>
    
</div>
    
)


}

export default EnfantCard;