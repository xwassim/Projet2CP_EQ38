import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './Components/Compte/Inscription/Formulaire/SignUp';

import PageAuthentification from './Components/Compte/Inscription/Authentification/PageAuthentification';
import PageLogin from './Components/Compte/Connexion/PageLogin';
import PageChoice from './Components/Compte/TypeUtilisateur/PageChoice';
import Menu from './Components/UTILISATION/PagesProprio/Menu'
import Menu2 from './Components/UTILISATION/PagesParent/Menu2';
import Home from './Components/HomePage/Home';
import Search from './Components/SearchPage/Recherche/Search';
import DetailsCreche from './Components/SearchPage/DetailsCreche/DetailsCreche';
import MesEnfants from './Components/UTILISATION/Enfants/MesEnfants';
import MesCreches from './Components/UTILISATION/PagesProprio/MesCreches/MesCreches';
import MonProfil from './Components/UTILISATION/Profil/MonProfil';
import PageReservation from './Components/Demande/Reservation/PageReservation';
import AjoutCreche from './Components/UTILISATION/PagesProprio/AjoutCreche/AjoutCreche';
import DynamicDescriptionCreche from './Components/SearchPage/DynamicDescriptionCreche'
import FormEnfant from './Components/UTILISATION/Enfants/AjoutEnfant/FormEnfant';
import DynamicDescriptionMesCreches from './Components/UTILISATION/PagesProprio/MesCreches/DetailsMesCreches/DynamicDescriptionMesCreches';
import DynamicDescriptionCrecheRDV from './Components/Demande/Prise RDV/DynamicDescriptionCrecheRDV';
import DynamicDescriptionCrecheReservation from './Components/Demande/Reservation/DynamicDescriptionCrecheReservation';
import SearchResults from './Components/SearchPage/Recherche/SearchResults/SearchResults';
import ForgotPassword from './Components/Compte/Connexion/ForgotPassword';
import MailSent from './Components/Compte/Connexion/MailSent';
import MesNotifs from './Components/UTILISATION/Notifications/MesNotifs';
import AboutUs from './Components/AboutUs/AboutUs';
import RdvProprio from './Components/UTILISATION/PagesProprio/RdvProprio';
import RdvParent from './Components/UTILISATION/PagesParent/RdvParent';
import ReservationProprio from './Components/UTILISATION/PagesProprio/ReservationProprio';
import DeleteConfirmation from './Components/Functions/DeleteConfirmation';
import ReservationParent from './Components/UTILISATION/PagesParent/ReservationParent';
import Unauthorized from './Components/Unauthorized';
import RequireAuth from './Components/RequireAuth';
import RequirenotAuth from './Components/RequirenotAuth';

// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const PROP = 'proprietaire'
const PARENT = 'parent'

function App() {
  return (

    <>
    <Routes>
      <Route path='/' element={<Home />} />    
      <Route path="/Search" element={< Search />} />
      <Route path='/AboutUs' element={<AboutUs/>}/>
      <Route path='/Unauthorized' element={<Unauthorized />} />
      <Route path="/DescriptionCreche" element={<DynamicDescriptionCreche/>}></Route>
      <Route path="/SearchResults" element={<SearchResults/>}/> 



 
      <Route element={<RequirenotAuth  />} >
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Login" element={<PageLogin/>} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[PROP, PARENT]} />} >
      <Route path='/MonProfil'  element={<MonProfil/>}/>
      <Route path='/MesEnfants' element={<MesEnfants/>}/>
      <Route path='/FormEnfant' element={<FormEnfant/>}/>
      <Route path="/MenuParent" element={<Menu2 />} />
      </Route>

    
       <Route element={<RequireAuth allowedRoles={[PROP]} />} >
       <Route path='/MesCreches' element={<MesCreches/>}></Route>  
       <Route path='/AjoutCreche' element={<AjoutCreche/>}></Route>
       <Route path="/MenuProprio" element={<Menu />} />
       </Route>

     
      <Route path="/Authentification" element={<PageAuthentification />} />
      <Route path="/Choice" element={<PageChoice />} />
      <Route path='/Reservation'  element={<PageReservation/>}/>
      <Route path='/kkkk' element={<App/>}> </Route>
      <Route path="/DescriptionMesCreches" element={<DynamicDescriptionMesCreches/>}></Route>
      <Route path='/DescriptionCrecheRDV' element={<DynamicDescriptionCrecheRDV/>}/>
      <Route path='/DescriptionCrecheReservation' element={<DynamicDescriptionCrecheReservation/>}/>
      <Route path='/ForgotPassword' element={<ForgotPassword/>} />
      <Route path='/MailSent' element={<MailSent/>} />
      <Route path='/MesNotifs' element={<MesNotifs/>} />
      <Route path='/RdvProprio' element={<RdvProprio/>} />
      <Route path='/RdvParent' element={<RdvParent/>} />
      <Route path='/ReservationProprio' element={<ReservationProprio/>} />
      <Route path='/ReservationParent' element={<ReservationParent/>} />
      <Route path='/sup' element={<DeleteConfirmation/>} />
    
     
    </Routes>
      

       </>
  );
}

export default App;
