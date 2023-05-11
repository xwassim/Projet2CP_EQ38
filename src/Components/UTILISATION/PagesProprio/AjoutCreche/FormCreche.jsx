import React, { useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import AccordionPlusImage from "../../../PagesAccordions/AccordionPlusImage";
import AccordionHoraires from "../../../PagesAccordions/AccordionHoraires";
import { useRef, useState } from "react";
import axios from "../../../../api/axios";
import useRefreshToken from "../../../../hooks/useRefreshToken";
import { Link } from "react-router-dom";
import Select from "react-select";

const FormCreche = () => {
  const [open, setOpen] = useState(false);
  const [nomcreche , SetNomcreche ] = useState('');
   const [adrcreche , SetAdrcreche ] = useState('');
   const [wilayacreche , SetWilayacreche]=useState('');
   const [communecreche , SetCommunecreche]=useState('');
   const [urlcreche , SetUrlcreche]=useState('');
   const [mailcreche , SetMailcreche]=useState('');
   const [telcreche , SetTelcreche]=useState('');
   const [typeetab , SetTypeetab]=useState('');
   const [typeacc , SetTypeacc]=useState('');
   const [pedagogie , SetPedagogie]=useState('');
   const [langesupp , SetLangesupp]=useState('');
   const [capacite , SetCapacite]=useState('');
   const [servicesup , SetServicesup]=useState([]); 
   const [placesdispo , SetPlacesdispo]=useState('');
   const [agemin , SetAgemin]=useState('');
   const [agemax , SetAgemax]=useState('');
   const [agenda , SetAgenda]=useState([]); /* array fih 14 cases */ 
   const [tarifs , SetTarifs]=useState('');
   const [mixite , SetMixite]=useState('');
   const [description , SetDescription]=useState('');


  const [images, SetImages]=useState([]);
   


   

  const menuRef = useRef();
  const inputRef = useRef();
  const formRef = useRef();

  const Typeetab = [
    { value: "Etatique", label: "Etatique" },
    { value: "Privé", label: "Privé" },
  ];

  const Typeaccueil = [
    { value: "Occasionnel", label: "Occasionnel" },
    { value: "Régulier", label: "Régulier" },
  ];

  const Mixité = [
    { value: "Les deux", label: "Les deux" },
    { value: "Garcons uniquement", label: "Garcons uniquement" },
    { value: "Filles uniquement", label: "Filles uniquement" },
  ];

  const Pedagogie = [
    { value: "Reggio Emilia", label: "Reggio Emilia" },
    { value: "Snoezelen", label: "Snoezelen" },
    { value: "Montessori", label: "Montessori" },
    { value: "Pikler-Loczy", label: "Pikler-Loczy" },
    { value: "Steiner-Waldorf", label: "Steiner-Waldorf" },
    { value: "Freinet", label: "Freinet" },
    { value: "Faber et Mazlish", label: "Faber et Mazlish" },
  ];
 

  const Langues = [
    { value: "Aucun", label: "Aucun" },
    { value: "Francais", label: "Francais" },
    { value: "Anglais", label: "Anglais" },
    { value: "Francais et Anglais", label: "Francais et Anglais" },
  ];

  
  const ServiceSupp = [
    { value: "Transport", label: "Transport" },
    { value: "Alimentation", label: "Alimentation" },
    { value: "Médecin", label: "Médecin" },
    { value: "Enfants-Handicapes", label: "Enfants-Handicapes" },
    { value: "Classes-Préparatoires", label: "Classes-Préparatoires" },
  ];


  const WilayaOptions = [
    { value: "Adrar", label: "1-Adrar" },
    { value: "Chlef", label: "2-Chlef" },
    { value: "Laghouat", label: "3-Laghouat" },
    { value: "Oum El Bouaghi", label: "4-Oum El Bouaghi" },
    { value: "Batna", label: " 5-Batna" },
    { value: "Béjaïa", label: "6-Béjaïa" },
    { value: "Biskra", label: " 7-Biskra" },
    { value: "Béchar", label: "8-Béchar" },
    { value: "Blida", label: " 9-Blida" },
    { value: "Bouira", label: "10-Bouira" },
    { value: "Tamanrasset", label: "11-Tamanrasset " },
    { value: "Tébessa<", label: "12-Tébessa<" },
    { value: "Tlemcen", label: " 13-Tlemcen" },
    { value: "Tiaret", label: "14-Tiaret" },
    { value: "Tizi Ouzou", label: " 15-Tizi Ouzou" },
    { value: "Alger", label: "16-Alger" },
    { value: "Djelfa", label: "17-Djelfa " },
    { value: "Jijel", label: "18-Jijel" },
    { value: "Sétif", label: "19-Sétif " },
    { value: "Saïda", label: "20-Saïda" },
    { value: "Skikda", label: " 21-Skikda" },
    { value: "Sidi Bel Abbès", label: "22-Sidi Bel Abbès" },
    { value: "Annaba", label: "23-Annaba " },
    { value: "Guelma", label: "24-Guelma" },
    { value: "Constantine", label: " 25-Constantine" },
    { value: "Médéa", label: "26-Médéa" },
    { value: "Mostaganem", label: " 27-Mostaganem" },
    { value: "M'Sila", label: "28-M'Sila" },
    { value: "Mascara", label: " 29-Mascara" },
    { value: "Ouargla", label: "30-Ouargla" },
    { value: "Oran", label: " 31-Oran" },
    { value: "El Bayadh", label: "32-El Bayadh" },
    { value: "Illizi", label: " 33-Illizi" },
    { value: "Bordj Bou Arreridj", label: "34-Bordj Bou Arreridj" },
    { value: "Boumerdès", label: "35-Boumerdès " },
    { value: " El Tarf", label: " 36-El Tarf" },
    { value: "Tindouf", label: " 37-Tindouf" },
    { value: "Tissemsilt", label: "38-Tissemsilt" },
    { value: "El Oued", label: "39-El Oued " },
    { value: "Khenchela", label: "40-Khenchela" },
    { value: "Souk Ahras", label: "41-Souk Ahras " },
    { value: "Tipaza", label: "42-Tipaza" },
    { value: "Mila", label: " 43-Mila " },
    { value: "Aïn Defla", label: "44-Aïn Defla" },
    { value: "Naâma", label: "  45-Naâma" },
    { value: "Aïn Témouchent", label: "46-Aïn Témouchent" },
    { value: "Ghardaïa", label: " 47-Ghardaïa " },
    { value: "Relizane", label: " 48-Relizane" },
    { value: "Timimoun", label: "49-Timimoun " },
    { value: "Bordj Badji Mokhtar", label: " 50-Bordj Badji Mokhtar" },
    { value: "Ouled Djellal", label: " 51-Ouled Djellal" },
    { value: "Béni Abbès ", label: "52-Béni Abbès " },
    { value: "In Salah", label: " 53-In Salah" },
    { value: "In Guezzam", label: "54-In Guezzam" },
    { value: "Touggourt ", label: "55-Touggourt  " },
    { value: "Djanet ", label: "56-Djanet " },
    { value: "El M'Ghair", label: " 57-El M'Ghair" },
    { value: "El Meniaa ", label: "58-El Meniaa " },
  ]
 


  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
  
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (event) => {
        imagesArray.push(event.target.result);
        SetImages(imagesArray);
      };
    }
  };

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
 const refresh = useRefreshToken();
  const [success,setSuccess]=useState(false)


  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const newAccessToken = await refresh();
          const response = await axios.post(
              '../creche/create',
          JSON.stringify({ nomCreche :  nomcreche ,adrCreche : adrcreche,wilaya: wilayacreche ,commune : communecreche , url : urlcreche ,email: mailcreche,
            tel: telcreche, typeEtablissement: typeetab ,typeAccueil: typeacc ,pedagogie : pedagogie , langeSupp : langesupp , capacite :capacite ,serviesUp: servicesup 
                      , placesDispo: placesdispo , ageMin : agemin , ageMax: agemax ,tarifs : tarifs , Mixite : mixite , Images : images , agenda : agenda , description : description }),
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
    
      } catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else {
          setErrMsg('Registration Failed');
          console.log(err);
        }
       // errRef.current.focus();
      
      }
    };
  

  return (
    <>
    {success ? (
      <section>
          <h1>Success!</h1>
          <p>
              <a href="/MesCreches">Mes Creches</a>
          </p>
      </section>
  ) : (   <section>
        <form className="FormInscription" onSubmit={handleSubmit} >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-blue-950"
              >
                Nom de la creche:
              </label>
              <div className="mt-2">
                <input
                 required
                 value={nomcreche}
                 onChange={(e) => SetNomcreche(e.target.value)}
                  type="text"
                  name="Crechename"
                  id="Crechename"
                  autoComplete="Crechename"

                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          

            <h2 className="col-span-full text-lg leading-6 text-rose-900 font-bold">
              Informations concernant la localisation
            </h2>
            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-blue-950"
              >
                Adresse complete de la creche :
              </label>
              <div className="mt-2">
                <input
                  required
                  value={adrcreche}
                  onChange={(e) => SetAdrcreche(e.target.value)}
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <div id="select">
                <div className="block text-sm font-medium leading-6 text-blue-950 ">
                  <label
                    htmlFor="type"
                    value="Select your type font-[Inter] text-blue-950"
                  >
                    Wilaya:
                  </label>
                </div>
                <div className="ring-2 ring-red-400 rounded-md mt-2">
                  <Select  required   
      onChange={(value) => SetWilayacreche(value.value)}
       options={WilayaOptions} />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-blue-950"
              >
                Commune
              </label>
              <div className="mt-2">
                <div className="ring-2 ring-red-400 rounded-md mt-2">
                  <Select className="z-[10] " 
                   required   
                   onChange={(value) => SetCommunecreche(value.value)}
                   options={WilayaOptions} />
                </div>
              </div>
            </div>

           

            <div className="sm:col-span-full">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-blue-950"
              >
                Lien Url de la localisation :
              </label>
              <div className="mt-2">
                <input
                  required
                  value={urlcreche}
                  onChange={(e) => SetUrlcreche(e.target.value)}
                  type="url"
                  name="CrecheUrl"
                  id="CrecheUrl"
                  autoComplete="given-url"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <h2 className="col-span-full text-rose-950">
              Informations sur les contacts
            </h2>
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-blue-950"
              >
                Addresse mail de la creche
              </label>
              <div className="mt-2">
                <input
                  required
                  value={mailcreche}
                  onChange={(e) => SetMailcreche(e.target.value)}
                  id="email_Creche"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-blue-950"
              >
                Numero de telephone de la creche
              </label>
              <div className="mt-2">
                <input
                    required
                    value={telcreche}
                    onChange={(e) => SetTelcreche(e.target.value)}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className=" col-span-full text-lg leading-6 text-rose-900 font-bold">
            Details de la creche{" "}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 xs:grid-cols-6">
            {/* Type etablissement */}
            <div className=" m-3 col-span-2">
              <label
                htmlFor="etab"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Type d'etablissement
              </label>
              <div className="ring-2 ring-red-400 rounded-md mt-2">
                <Select className="z-[65]"
                 
                 onChange={(value) => SetTypeetab(value.value)}
                  options={Typeetab} />
              </div>
            </div>

            {/* Type accueil */}
            <div className=" m-3 col-span-2">
              <label
                htmlFor="acceuil"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Type d'accueil
              </label>
              <div className="ring-2 ring-red-400 rounded-md mt-2">
                <Select className="z-[65] " 
                  
                 onChange={(value) => SetTypeacc(value.value)}
                 options={Typeaccueil} />
              </div>
            </div>

            {/* Pedagogie */}
            <div className=" m-3 col-span-2">
              <label
                htmlFor="pedagogie"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pédagogie
              </label>
              <div className="ring-2 ring-red-400 rounded-md mt-2">
                <Select className="z-[65] " 
                   
                 onChange={(value) => SetPedagogie(value.value)}
                options={Pedagogie} />
              </div>
            </div>

            {/* Langues  */}
            <div className=" m-3 col-span-2">
              <label
                htmlFor="Langue"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Langue supplémentaires
              </label>
              <div className="ring-2 ring-red-400 rounded-md mt-2">
                <Select className="z-[55] " 
                    
                 onChange={(value) => SetLangesupp(value.value)}
                 options={Langues} />
              </div>
            </div>

            {/* Services */}
            <div className="m-3 col-span-2">
              <label
                htmlFor="etab"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Services Particuliers
              </label>
              <div className="ring-2 ring-red-400 rounded-md mt-2">
                <Select
                  isMulti={true}
                  className="z-[55]"
                  onChange={(selectedOptions) =>
                    SetServicesup(selectedOptions.map(option => option.value))
                  }
                  options={ServiceSupp}
                />
              </div>
            </div>

            {/* mixitee */}
            <div className=" m-3 col-span-2 ">
              <label
                htmlFor="capacité"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mixité
              </label>
              <div className="ring-2 ring-red-400 rounded-md mt-2">
                <Select className="z-[45] " 
                      
                 onChange={(value) => SetMixite(value.value)}
                 options={Mixité} />
              </div>
            </div>

            {/* disponibilitee des places */}
            <div className="ml-3 col-span-2">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-blue-950"
              >
                Places diponibles
              </label>
              <div className="mt-2">
                <input
                    
                    value={placesdispo}
                    onChange={(e) => SetPlacesdispo(e.target.value)}
                  type="text"
                  name="Place_dispo"
                  id="Place_dispo"
                  autoComplete="Place_dispo"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Capacitee Max */}
            <div className=" ml-3  col-span-2">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-blue-950"
              >
                Capacitee maximale
              </label>
              <div className="mt-2">
                <input
                  
                   value={capacite}
                   onChange={(e) => SetCapacite(e.target.value)}
                  type="text"
                  name="Place_dispo"
                  id="Place_dispo"
                  autoComplete="Place_dispo"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full"></div>
            {/* Age d'accueil */}
            <h2 className=" col-span-full text-lg leading-6 text-rose-900 font-bold ">
              Age d'accueil
            </h2>
            <div className="mx-3 col-span-2">
              <label
                htmlFor="etab"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Age Minimum
              </label>
              <div className=" ring-red-400 rounded-md mt-2">
                <input
                   required
                   value={agemin}
                   onChange={(e) => SetAgemin(e.target.value)}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mx-3 col-span-2">
              <label
                htmlFor="etab"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Age maximum
              </label>

              <div className=" ring-red-400 rounded-md mt-2">
                <input
                    required
                    value={agemax}
                    onChange={(e) => SetAgemax(e.target.value)}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="xxs:col-span-full" />

            <h2 className=" text-lg  text-rose-900 font-bold">
              Jours d'accueil
            </h2>

            <div className="  col-span-full sm:mt-0">
              <h2 className="text-gray-700">
                cochez les jours de la semaine ou vous etes ouverts puis
                choisissez vos horraires d'ouverture et de fermeture
              </h2>
              <ul className="flex flex-row col-span-full">
                <div>
                  <li className="my-5 flex flex-row text-md leading-6 text-blue-950 font-bold">
                    Dimanche {" "}
                    <div className="ml-2">
                      <AccordionHoraires />
                    </div>
                  </li>

                  <li className="my-5 flex flex-row text-md leading-6 text-blue-950 font-bold">
                    Lundi {" "}
                    <div className="ml-11">
                      <AccordionHoraires />
                    </div>
                  </li>
                  <li className="my-5 flex flex-row text-md leading-6 text-blue-950 font-bold">
                    {" "}
                    Mardi {" "}
                    <div className="ml-11">
                      <AccordionHoraires  />
                    </div>
                  </li>
                  <li className="my-5 flex flex-row text-md leading-6 text-blue-950 font-bold">
                    Mercredi {" "}
                    <div className="ml-5">
                      <AccordionHoraires  />
                    </div>
                  </li>
                  <li className="my-5 flex flex-row text-md leading-6 text-blue-950 font-bold">
                    Jeudi {" "}
                    <div className="ml-12">
                      <AccordionHoraires />
                    </div>
                  </li>
                  <li className="my-5 flex flex-row text-md leading-6 text-blue-950 font-bold">
                    Vendredi 
                    <div className="ml-5">
                      <AccordionHoraires  />
                    </div>
                  </li>
                  <li className="my-5 flex flex-row text-md leading-6 text-blue-950 font-bold">
                    Samedi {" "}
                    <div className="ml-8">
                      <AccordionHoraires  />
                    </div>
                  </li>
                </div>
                {/* <div className="ml-3 font-medium">
                  <li>{props.hmar1} - {props.hmar2} </li>
                    <li>{props.hmer1} - {props.hmer2} </li>
                    <li>{props.hjeu1} - {props.hjeu2} </li>
                    <li>{props.hven1} - {props.hven2} </li>
                    <li>{props.hsam1} - {props.hsam2} </li> 
                </div>*/}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-9">
          <h2 className="ml-2 mb-3 text-lg leading-6 text-rose-900 font-bold  ">
            Tarifs{" "}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
            <div className="sm:col-span-3">
              <label
                htmlFor="Tarifs"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Paiement en Dinar/Mois
              </label>
              <div className="mt-2">
                <input
                 required
                 value={tarifs}
                 onChange={(e) => SetTarifs(e.target.value)}
                  type="text"
                  name="tarifs"
                  id="tarifs"
                  autoComplete="tarifs"
                  className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-2 ring-inset ring-red-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="ml-3 mb-5 block text-l  leading-6 text-lg  text-rose-900 font-bold"
            >
              Inserer des photos de cette creche
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-red-400 px-6 py-10 bg-white">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-400"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-red-500 focus-within:outline-none focus-within:ring-2  focus-within:ring-indigo-100 focus-within:ring-offset-2  hover:text-indigo-900"
                  >
                    <span>Inserer une image</span>
                    <input
                      multiple
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF jusqu'a 10MB
                </p>
              </div>
            </div>
            <AccordionPlusImage />
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
    </section> )
    }

    </>
  );
};

export default FormCreche;
