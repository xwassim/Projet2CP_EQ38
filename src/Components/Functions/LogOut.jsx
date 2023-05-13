import React from 'react'
import {RiErrorWarningFill} from 'react-icons/ri'
import { useNavigate } from "react-router-dom";
const LogOut = () => {
    const navigate = useNavigate();
    return (
      
        <>
        <div className="  mx-auto max-w-[300px] ld:max-w-[500px]">
          <div className="">
            <div className=" flex flex-col mx-[5%]  ring-4  rounded-lg p-10 mt-[50px]">
              <h2 className="ld:text-xl text-base text-blue-950 text-center font-semibold">
              Etes vous sur de vouloir vous deconnecter ?
              </h2>
  
              <div className="mt-6 flex flex-col items-center justify-center gap-x-6">
               <div className=" text-[#8a2424] text-4xl mb-5 ring-[#ea1d1d] ring rounded-full"> <RiErrorWarningFill/></div>
              <div className="flex flex-row ">
               <button
                   onClick={() => navigate(-1)}
                   //                 type="button"
                  className="rounded-md bg-[#2c15d6] mr-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 hover:scale-105 duration-100 ring-2 ring-[#050538] "
                >
                  Non
  
                </button>
             
                <button
                  type="button"
                  className="rounded-md ml-3 bg-[#b81818] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-900 hover:scale-105 duration-100 ring-2 ring-[#050538] "
                >
                   <a href='/'> Oui</a>
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
       </>
      )
    }
export default LogOut