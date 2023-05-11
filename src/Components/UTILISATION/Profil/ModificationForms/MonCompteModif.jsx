import React from "react";
import Navbar from "../../../Navigation/Navbar";
import { useState , useEffect,useRef} from "react";
import useRefreshToken from "../../../../hooks/useRefreshToken";
import axios from "../../../../api/axios";
import useLogout from "../../../../hooks/useLogout";

const PASSWORDVALID = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function MonCompteModif() {
  const errRef = useRef();
  
  const [oldpassword, setOldPassword] = useState('');
  

  const [newpassword, setNewPassword] = useState('');
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [newpasswordFocus, setNewPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success,setSuccess]=useState(false);


const logout = useLogout()
  
  
  
  
  useEffect(() => {
  
    setValidNewPassword(PASSWORDVALID.test(newpassword));
    setValidMatch(newpassword === matchPwd);
  }, [newpassword, matchPwd])
  
  useEffect(() => {
    setErrMsg('');
  }, [newpassword, matchPwd])

const refresh=useRefreshToken();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const v1 = PASSWORDVALID.test(newpassword);
    const v2 = newpassword === matchPwd ;
   
    if (!v1 || !v2 ) {
        setErrMsg("Entrée invalide");
        return;
    } 


    try {
        const newAccessToken = await refresh();
        const response = await axios.patch(
          'auth/changePassword',
        JSON.stringify({ oldpassword , newpassword }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAccessToken}`,
          },
          withCredentials: true,
        }
      );

      setSuccess(true);
      await logout();
      localStorage.removeItem('user');
      window.location.reload();
      window.location.href='/'
   
       
  
    
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Wrong password');
        console.log(err);
      }
      errRef.current.focus();
    
    }
  };

  return (
    <>
      <div className=" mx-[5%]">
        <form className="FormInscription" onSubmit={handleSubmit} >
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
           
            <div className="sm:col-span-5">
              <label
                htmlFor="old-pswd"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mot de passe Actuel
              </label>
              <div className="mt-2">
                <input
                  required
                  value={oldpassword }
                  onChange={(e) => setOldPassword(e.target.value)}
                  type="password"
                  name="old-pswd"
                  id="OldPswd"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-5 ">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nouveau Mot de passe
              </label>
              <div className="mt-2">
                <input
               
               
                 onChange={(e) => setNewPassword(e.target.value)}
                 value={newpassword}
                 required
                 aria-invalid={validNewPassword ? "false" : "true"}
                 aria-describedby="new-pswd"
                 onFocus={() => setNewPasswordFocus(true)}
                 onBlur={() => setNewPasswordFocus(false)}
                  type="password"
                  name="new-pswd"
                  id="new-pswd"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

<p id="new-pswd" className={newpasswordFocus && newpassword && !validNewPassword ? "instructions max-w-xs justify-self-center" : "offscreen"}>
                         Le mot de passe doit etre compose de 8 caracteres, une lettre majuscule,
                         une lettre miniscule et un chiffre.
                        </p>   
              </div>
            </div>

            <div className="sm:col-span-5 ">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirmez le nouveau mot de passe
              </label>
              <div className="mt-2">
                <input
                 
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="newPswdConfirmation"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  type="password"
                  name="newPswdConfirmation"
                  id="newPswdConfirmation"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                  <p id="newPswdConfirmation" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        Le mot de passe n'est pas identique
                        </p> 
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-blue-950 hover:text-red-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-900 hover:scale-105 duration-100 ring-2 ring-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sauvgarder
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

