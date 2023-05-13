import React, { useState } from 'react';
import AccordionSection from './AccordionSection';
import Select from "react-select";
import {FaStreetView} from "react-icons/fa"


const AccordionRayon = () => {
    const Rayon = [
        { value: 1, label: "Aucun" },
        { value: 2, label: "2 Km" },
        { value: 3, label: "5 Km" },
        { value: 4, label: "10 Km" },
        { value: 5, label: "15 Km" },
        { value: 6, label: "30 Km" },
        { value: 7, label: "50 Km" },
        { value: 8, label: "100 Km" },
      ];
   
    const [sections, setSections] = useState([
        { title: <>
        <div className=' flex justify-center border-2 border-[#ff3e3e] p-4 rounded-lg text-white bg-[#63132f] hover:scale-105 duration-300 hover:bg-[#f3817f] hover:cursor-pointer' title="Filtrer dans un rayon ">
      <FaStreetView/>
      </div>
    </>, content: <>
    <div className="  my-1 ">
                    <label
                      htmlFor="rayon"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Rayon
                    </label>
                    <div className="mt-2">
                      <Select className="z-[71]  text-black" options={Rayon} />
                    </div>
                  </div>
        </>, isOpen: false },
        // { title: 'Section 2', content: 'Contenu de la section 2', isOpen: false },
        // { title: 'Section 3', content: 'Contenu de la section 3', isOpen: false },
      ]);
    
      const toggleSection = (index) => {
        const newSections = [...sections];
        newSections[index].isOpen = !newSections[index].isOpen;
        setSections(newSections);
      };
    
      return (
        <div>
          {sections.map((section, index) => (
            <AccordionSection
              key={index}
              title={section.title}
              content={section.content}
              isOpen={section.isOpen}
              toggleSection={() => toggleSection(index)}
            />
          ))}
        </div>
      );
    }

export default AccordionRayon