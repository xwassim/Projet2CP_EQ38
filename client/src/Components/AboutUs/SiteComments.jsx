import React from 'react'
import Section5 from '../HomePage/Section5'
import AjouterAvisSite from '../Functions/AjouterAvisSite'
import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import CommentSection from '../HomePage/Section5';
import useRefreshToken from '../../hooks/useRefreshToken';
import { Carousel } from "flowbite-react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
const SiteComments = () => {


  const [Comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(-1);
  const[avisuser,setavisuser]= useState(null);
  const[avisother,setavisother] = useState([]);
  
  let Loggedin = true;
  const [Log, setLog] = useState(false);
	
  let [storeUser, setStoreUser] = useState(JSON.parse(localStorage.getItem("user")));
  const refresh = useRefreshToken();


  const [userComment, setUserComment] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newAccessToken = await refresh();
      
      await axios.post('../Avis',{ comm:Comment}
          ,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        )
        
        .then((response) => {
          
          console.log('Comment submitted:', response.data);
          setavisuser(response.data);
          console.log(response.data.commentaire);
          console.log(response.data.NameUser);
          setComment('');

        })
        .catch((error) => {
          console.error('Error submitting comment:', error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  useEffect(() => {
    const fetchComments = async () => {

   if(storeUser!=null)
   {
     Loggedin = true;
     
   }
   if(storeUser===null)
   {
     Loggedin = false;
     
   }
   setLog(Loggedin);
      console.log(Loggedin);
      if(Loggedin === true ){
        try{
          const newAccessToken = await refresh();
          const response = await axios.get("http://localhost:8080/Avis", {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
          if(response.data.avisUser.length != 0){setavisuser(response.data.avisUser[0]);}
          
          console.log(response.data.avisUser);
          
       
  
        
      } catch (error) {
        console.log(error);
      }
      }else{
        try {
          const response = await axios.get("http://localhost:8080/Avis", {
            headers: {
              'Content-Type': 'application/json',
              
            },
          });
          setavisother(response.data.avis);
                
        } catch (error) {
          console.log(error);
        }
      }
      
    };
    fetchComments();
  }, []);


  function Commentuser({ comment }) {
    const handleDelete = async () => {
      try {
        const newAccessToken = await refresh();
        const response = await axios.delete(
          `http://localhost:8080/Avis/${comment._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );
        setavisuser(null);
        console.log('Comment deleted:', response.data);
        
       // Refresh the comments list after deleting the comment
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    };
  
    return (
      <div className="ld:mx-16 my-10">
                      <article
                        
                        className="  flex max-w-[600px] text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                      >
                        
                        <div className="relative mt-3 flex items-center gap-x-4">
                      
                          <UserCircleIcon
                            className="h-11 w-11 text-gray-700 "
                            aria-hidden="true"
                          />
                          <div className="   leading-4">
                            <p className="font-semibold text-gray-900">
                              <a>
                                <span className="absolute inset-0" />
                                {comment.NameUser}
                              </a>
                            </p>
                            <p className="text-blue-950"></p>
                          </div>
                        </div>
    
                        <div className="group relative">
                          <p className="mt-2 line-clamp-5    leading-6 text-blue-950">
                            {comment.commentaire}
                          </p>
                        </div>
                        
                      </article>
                      <div className='flex justify-end'>
                      <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2">
                             Supprimer
                       </button>
                      </div>                    
                    </div>
      
       
 
    );
  }

  const posts = [
    {
      nbAvis: 0,
  
      description:
        " Ce site est une véritable aubaine pour les parents qui cherchent une crèche pour leur enfant. Il est très facile à utiliser et propose une grande variété d'options de recherche pour trouver la crèche idéale",
      
      author: {
        name: "Michael Pitchar",
      },
    },
    {
      nbAvis: 1,
  
      description:
        " La plateforme est facile à naviguer et m'a permis de trouver rapidement une liste de crèches qui correspondaient à mes critères de recherche.",
      
  
      author: {
        name: "Rayane Remadna",
      },
    },
    {
      nbAvis: 2,
  
      description:
        "Je tiens à exprimer ma grande satisfaction quant à la procédure de réservation des crèches que j'ai trouvée sur ce site. Celle-ci est très simple et intuitive.",
      
  
      author: {
        name: "Riad Brahimi",
      },
    },
    {
      nbAvis: 3,
  
      description:
        "Je tiens à exprimer ma grande satisfaction quant à la procédure de réservation des crèches que j'ai trouvée sur ce site. Celle-ci est très simple et intuitive.",
      
  
      author: {
        name: "kader",
      },
    },
    {
      nbAvis: 4,
  
      description:
        "Je tiens à exprimer ma grande satisfaction quant à la procédure de réservation des crèches que j'ai trouvée sur ce site. Celle-ci est très simple et intuitive.",
     
  
      author: {
        name: "raouf",
      },
    },
    {
      nbAvis: 5,
  
      description:
        "Je tiens à exprimer ma grande satisfaction quant à la procédure de réservation des crèches que j'ai trouvée sur ce site. Celle-ci est très simple et intuitive.",
      
  
      author: {
        name: "wassim",
      },
    },
    {
      nbAvis: 6,
  
      description:
        "Je tiens à exprimer ma grande satisfaction quant à la procédure de réservation des crèches que j'ai trouvée sur ce site. Celle-ci est très simple et intuitive.",
     
  
      author: {
        name: "Riad Brahimi",
      },
    },
    {
      nbAvis: 0,
  
      description:
        " Ce site est une véritable aubaine pour les parents qui cherchent une crèche pour leur enfant. Il est très facile à utiliser et propose une grande variété d'options de recherche pour trouver la crèche idéale",
     
      author: {
        name: "Michael Pitchar",
      },
    },
    {
      nbAvis: 1,
  
      description:
        " La plateforme est facile à naviguer et m'a permis de trouver rapidement une liste de crèches qui correspondaient à mes critères de recherche.",
      
  
      author: {
        name: "Rayane Remadna",
      },
    },
    // More posts...
  ];



  return (
    <>
    <section class="  py-8 lg:py-16">
  <div class="max-w-[1200px] mx-auto px-4 ">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900n text-blue-950">Discussion (8)</h2>
    </div>
    <>
   {(Log === true && avisuser == null) ? (
  <form class="mb-6" onSubmit={handleSubmit}>
    <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200n bg-gray-800n border-gray-700">
      <label for="comment" class="sr-only">Votre commentaire sur le site</label>
      <textarea
        rows="6"
        class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-nonen placeholder-gray-400"
        placeholder="Ecrire un commentaire..."
        id="comment"
        value={Comment}
        onChange={(event) => setComment(event.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
        required
      ></textarea>
    </div>

    <button
      type="submit"
      class="inline-flex items-center py-2.5 px-4 text-sm hover:scale-105 duration-300 font-medium text-center text-blue-950 hover:text-[#b32f2f] bg-primary-700 rounded-lg hover:bg-primary-800"
    >
      <a>Poster</a>
    </button>
  </form>
) : (
  <div></div>
)}
    </>
    <div  >
    <div className="bg-[#ffd2cf] py-[96px] sm:py-[96px]">
      <div className="mx-auto max-w-7xl  px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold font-[Inter] tracking-tight text-blue-950 sm:text-4xl">
            Vos retours sur notre site
          </h2>
          <p className="mt-2 text-lg leading-8 text-blue-950">
            Commentaires et avis
          </p>
        </div>

        <div className="   gap-4 h-[510px] ld:h-96  max-w-[1400px]  bg-[#fdbdbc]  rounded-xl ">
          <Carousel slideInterval={8000}>
            <div className="flex ld:flex-row flex-col mx-auto">
              {posts.slice(0, 2).map((post) => (
                <div className="mx-5 ld:mx-16 my-5 md:my-10">
                  <article
                    key={post.nbAvis}
                    className="  flex max-w-[600px] text text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                  >

                    <div className="relative mt-3 flex items-center gap-x-4">
                      <UserCircleIcon
                        className="h-11 w-11 text-gray-700 "
                        aria-hidden="true"
                      />
                      <div className="   leading-4">
                        <p className="font-semibold text-gray-900">
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                        <p className="text-blue-950">{post.author.role}</p>
                      </div>
                    </div>

                    <div className="group relative">
                      <p className="mt-2 line-clamp-5    leading-6 text-blue-950">
                        {post.description}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="flex ld:flex-row flex-col mx-auto">
              
              {posts.slice(2, 4).map((post) => (
               post.nbAvis !== 0 ? (
                  <div className="ld:mx-16 my-10">
                  <article
                    key={post.nbAvis}
                    className="  flex max-w-[600px] text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                  >
                    
                    <div className="relative mt-3 flex items-center gap-x-4">
                      {/* <img
                  src={post.author.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                /> */}
                      <UserCircleIcon
                        className="h-11 w-11 text-gray-700 "
                        aria-hidden="true"
                      />
                      <div className="   leading-4">
                        <p className="font-semibold text-gray-900">
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                        <p className="text-blue-950">{post.author.role}</p>
                      </div>
                    </div>

                    <div className="group relative">
                      <p className="mt-2 line-clamp-5    leading-6 text-blue-950">
                        {post.description}
                      </p>
                    </div>
                  </article>
                </div> 
               ) :  (<div>fin
                </div>)
                
              ))}
            </div>
            <div className="flex ld:flex-row flex-col mx-auto">
              {posts.slice(4, 6).map((post) => (
                <div className="ld:mx-16 my-10">
                  <article
                    key={post.nbAvis}
                    className="  flex max-w-[600px] text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                  >
                   
                    <div className="relative mt-3 flex items-center gap-x-4">
                      {/* <img
                  src={post.author.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                /> */}
                      <UserCircleIcon
                        className="h-11 w-11 text-gray-700 "
                        aria-hidden="true"
                      />
                      <div className="   leading-4">
                        <p className="font-semibold text-gray-900">
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                        <p className="text-blue-950">{post.author.role}</p>
                      </div>
                    </div>

                    <div className="group relative">
                      <p className="mt-2 line-clamp-5    leading-6 text-blue-950">
                        {post.description}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
            <div className="flex ld:flex-row flex-col mx-auto">
              {posts.slice(6, 8).map((post) => (
                <div className="ld:mx-16 my-10">
                  <article
                    key={post.nbAvis}
                    className="  flex max-w-[600px] text-sm ld:text-base   p-3  flex-col items-start justify-between  "
                  >
                    
                    <div className="relative mt-3 flex items-center gap-x-4">
                      {/* <img
                  src={post.author.imageUrl}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                /> */}
                      <UserCircleIcon
                        className="h-11 w-11 text-gray-700 "
                        aria-hidden="true"
                      />
                      <div className="   leading-4">
                        <p className="font-semibold text-gray-900">
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                        <p className="text-blue-950">{post.author.role}</p>
                      </div>
                    </div>

                    <div className="group relative">
                      <p className="mt-2 line-clamp-5    leading-6 text-blue-950">
                        {post.description}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </Carousel>
         
          
            
          
                    
        </div>
        {(avisuser != null) ? (
          <div className="   gap-4 h-[510px] ld:h-96  max-w-[1400px]  bg-[#fdbdbc]  rounded-xl ">
           <Commentuser  comment={avisuser} />
          </div>
           )
           : (
            <div></div>
          )
           
        }
      </div>
    </div>
 </div>
  </div>
</section>
    </>
  )
}

export default SiteComments