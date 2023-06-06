import { useState } from 'react';
import react from 'react';
import { useRef } from 'react';


const StarRating = ({setNote}) => {
  const ref = useRef(null);
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {

    for(var j=0 ; j< 5 ;j++)
    {
      if(j < value ){ ref.current.childNodes[j].style.color = "#FFD700" ;}else{
        ref.current.childNodes[j].style.color = "#757575" ;
      }
     

    }
    console.log("clicked")
    setRating(value);
    setNote(value);
    console.log(value);
  };

 

  return (
   
      <div className="flex" ref={ref}>

        {[...Array(5)].map((_, i) => {

          const starValue = i + 1;
          const fill = starValue <= rating ? 'text-[#FFD700] ' : 'text-gray-400';
          return (
            <button
              key={i}
              className={`text-3xl text-gray-600 ${fill}`}
              onClick={() => handleClick(starValue)}
            >
                ★
            </button>
          );
        })}
      </div>
    
   
  );
};

export default StarRating;




