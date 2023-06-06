const Avis = require('../models/Avis')
const mongoose = require('mongoose')


async function commenter(req,response){




    const user=req.user;
    const idCreche = req.body.idCreche;
    const idUser = new mongoose.Types.ObjectId(user.id)

    const ConcernedCreche = new mongoose.Types.ObjectId(idCreche)
    const existingAvis = await Avis.findOne({
        IdUser:idUser,
        IdCreche:idCreche,

    })
   if(idCreche){
    try{
        if(!existingAvis){
            const newAvis = new  Avis({
                NameUser: user.username,
                commentaire: req.body.comm,
                IdUser: idUser,
                IdCreche:ConcernedCreche,
            });

            await newAvis.save()
            response.json(newAvis)
        }else{
           

        }}catch(error){
        console.log(error)
    }
}else{
    try{
        if(!existingAvis){
            const newAvis = new  Avis({
                NameUser: user.username,
                commentaire: req.body.comm,
                IdUser: idUser,
               
            });

            await newAvis.save()
            response.json(newAvis)
        }else{
           

        }}catch(error){
        console.log(error)
    }
   
}
}

async function Evaluer(req,response){


    const idUser = req.user.id;
    const idCreche = req.body.idCreche;

    const user = new mongoose.Types.ObjectId(idUser)
    const ConcernedCreche = new mongoose.Types.ObjectId(idCreche)

    const existingAvis = await Avis.findOne({IdUser:idUser,IdCreche:idCreche})


    try{
        if(!existingAvis){
            const newAvis = new  Avis({
                NoteEvaluation: req.body.NoteEvaluation,
                IdUser: user,
                IdCreche:ConcernedCreche,
                NameUser: req.user.username,

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


    const idUser = req.user.id;
    const idCreche = req.body.idCreche;

    const user = new mongoose.Types.ObjectId(idUser)
    const ConcernedCreche = new mongoose.Types.ObjectId(idCreche)

    const existingAvis = await Avis.findOne({IdUser:idUser,IdCreche:idCreche})

    try{
        if(!existingAvis){
            const newAvis = new  Avis({
                commentaire: req.body.comm ,
                NoteEvaluation: req.body.NoteEvaluation,
                IdUser: user,
                IdCreche:ConcernedCreche,
                NameUser: req.user.username,
            });

            await newAvis.save()
            response.json(newAvis)

        }else{

            const UpdatedAvis = await Avis.updateOne(
                {_id:existingAvis.id},
                {
                    NoteEvaluation: req.body.NoteEvaluation,
                })

            response.json("Note Evaluation and comment inserted successfully")

        }}catch(error){

        console.log(error)

    }
}


async function GiveAvis(req,response){

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
async function getAvisCreche(req,res){
    const idCreche = req.params.id;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        const avis = await Avis.find({IdCreche:idCreche}).limit(4);
        return res.json({avis})
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = decoded.user;
        const avisUser = await Avis.find({IdCreche:idCreche,IdUser:user.id});
        const avisOtherUser = await Avis.find({IdCreche:idCreche,IdUser:{$ne:user.id}}).limit(4);
        return res.json({avisUser,avisOtherUser})
    }
    catch (error) {
        const avis = await Avis.find({IdCreche:idCreche}).limit(4);
        return res.json({avis})
    }
}


async function getAvis(req,res){
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      
        const avis = await Avis.find({IdCreche:{$exists:false},IdUser:{$ne:user.id}}).limit(4);
       
        return res.json({avis})
        
    }
    const token = authHeader.split(' ')[1];
    try {
        
       const user = req.user;
        const avisUser = await Avis.find({IdCreche:{$exists:false},IdUser:await new mongoose.Types.ObjectId( user.id)});
        console.log(typeof user.id);
        console.log(avisUser);
        const avisOtherUser = await Avis.find({IdCreche:{$exists:false},IdUser:{$ne:user.id}}).limit(4);
        return res.json({avisUser,avisOtherUser})
    }
    catch (error) {
        console.log(error);
        const avis = await Avis.find({IdCreche:{$exists:false}}).limit(4);
        return res.json({avis})
    }

}
async function deelete(req, res) {
    try {
        const id = req.params.id;
        const result = await Avis.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}


















module.exports= {GiveAvis,getAvis,deelete,getAvisCreche}