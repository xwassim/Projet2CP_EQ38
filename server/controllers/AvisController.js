const Avis = require('../models/AvisSchema')
const mongoose = require('mongoose')



async function commenter(req,response){

  const idUser = req.body.idUser;  
  const idCreche = req.body.idCreche;
  
  const user = new mongoose.Types.ObjectId(idUser)
  const ConcernedCreche = new mongoose.Types.ObjectId(idCreche)
  const existingAvis = await Avis.findOne({
    IdUser:idUser,
    IdCreche:idCreche
  })
  
  try{
      if(!existingAvis){
          const newAvis = new  Avis({
              commentaire: [req.body.comm] ,
              IdUser: user,
              IdCreche:ConcernedCreche,
      });

      await newAvis.save()
      response.json("Comment inserted successfully")
  }else{
   const UpdatedAvis = await Avis.updateOne(
      {_id:existingAvis.id},
      {$push:{
          commentaire:req.body.comm
      }})
        
      response.json("Comment inserted successfully")
  
    }}catch(error){
        console.log(error)
  }
}



async function Evaluer(req,response){

  
  const idUser = req.body.idUser;  
  const idCreche = req.body.idCreche;
  
  const user = new mongoose.Types.ObjectId(idUser)
  const ConcernedCreche = new mongoose.Types.ObjectId(idCreche)
  const existingAvis = await Avis.findOne({
    IdUser:idUser,IdCreche:idCreche
  })
  
  try{
      if(!existingAvis){
          const newAvis = new  Avis({
              NoteEvaluation: req.body.NoteEvaluation,
              IdUser: user,
              IdCreche:ConcernedCreche,
      });

      await newAvis.save()
        response.json("Note Evaluation inserted successfully")
  
      }else{
          const UpdatedAvis = await Avis.updateOne(
                     {_id:existingAvis.id},
                     {
                         NoteEvaluation: req.body.NoteEvaluation,
                      })
          response.json("Note Evaluation inserted successfully")
  
        }}catch(error){
          console.log(error)
        }
}


async function CommenterEtEvaluer(req,response){

  
  const idUser = req.body.idUser;  
  const idCreche = req.body.idCreche;
  
  const user = new mongoose.Types.ObjectId(idUser)
  const ConcernedCreche = new mongoose.Types.ObjectId(idCreche)

  const existingAvis = await Avis.findOne({IdUser:idUser,IdCreche:idCreche})
  
  try{
      if(!existingAvis){
          const newAvis = new  Avis({
              commentaire: [req.body.comm] ,
              NoteEvaluation: req.body.NoteEvaluation,
              IdUser: user,
              IdCreche:ConcernedCreche,
      });

      await newAvis.save()
      response.json("Note Evaluation inserted successfully")
  
    }else{
   
      const UpdatedAvis = await Avis.updateOne(
                            {_id:existingAvis.id},
                            {$push:{
                              commentaire:req.body.comm
                              },
                              NoteEvaluation: req.body.NoteEvaluation,
                              })
    
         response.json("Note Evaluation and comment inserted successfully")
  
        }}catch(error){
    
          console.log(error)
  
        }
}


async function GiveAvis(req,response){
  console.log(req.body.comm)
  try{
    if(req.body.comm && req.body.NoteEvaluation){
      CommenterEtEvaluer(req,response);
    }else{
      if(req.body.comm){
        commenter(req,response);
      }else{
        if(req.body.NoteEvaluation){
          Evaluer(req,response);
        }else{
          response.send("Invalid Avis, provide a comment or an evaluation")
        }
      }

    }

  }catch(err){
    response.status(400).send(err)
  }
  

  

}













module.exports= {GiveAvis}