const Creche = require('../models/CrecheSchema')


// Search with filters function
async function findCrecheByFilters( req,response) {
    
    let filters ={};
    filters = req.filters // filter

    console.log(filters)
    
    try{
         Creche.find(filters)
        .then(data=>{
            console.log(data);
            response.json(data);
        })
        
        }catch(err){
            console.error(err);
            response.status(500).send('Server Error');
      }

}



// find  near creches to the User Locaiton

async function findNearCreches(req,response) {

      let filter = {};
      filter = req.geoFilter;  // filter geoJSON structure

      // Search creches in database
      // We are using here geoSpatial Queries (geoJSON Objects)
      try{
          Creche.find(filter)
          .then(data=>{
                console.log(data);
                response.json(data)
              });
        
        }catch(err){
            console.error(err);
            response.status(500).send('Server Error');
        }

}


// the main  Search function that choose which method of search 
// that correspond to the user request 

async function findCreches(req,response){
  
  // if the user selected some filters then we use findCrecheByFilters
  // Or he didn't choose any filter or enter a text ==> we search with an empty filter
  // that will return all Creches

    if(typeof filters === "object" ||  typeof req.geoFilter === "undefined"){
        findCrecheByFilters(req,response);
     }
  
    // if the user provided his Location coordinates
  if(req.geoFilter){
        findNearCreches(req,response);
    }
}



module.exports={findCreches}