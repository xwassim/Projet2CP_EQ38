const Reservation = require('./models/reservation');
const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const {stringify} = require("nodemon/lib/utils");
const createReservation = asyncHandler(async (req, res, next) => {
  // Check if the user is authenticated
  const user = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
  if (!user) {
    // The user is not authenticated, so they need to log in
    res.status(401).json({message: "Unauthorized."})
    return;
  }

  // Get the reservation data from the request body
  const {
    date,
    creche,
    places
  } = req.body;

  // Check if the reservation data is valid
  if (!date || !creche || !places) {
    res.status(400).json({message: "Invalid reservation data."})
    return;
  }

  // Check if the creche has enough places available
  const crecheModel = await Reservation.findOne({
    date,
    creche
  });
  if (!crecheModel || crecheModel.PlacesDisponibles<= 0) {
    res.status(400).json({message: "No more places available."})
    return;
  }

  // Create a new reservation
  const reservation = new Reservation({
    date,
    creche,
    places
  });

  // Save the reservation
  await reservation.save();

  // Send a success response
  res.status(201).json({message: "Reservation created successfully."})
});

    // Confirm a reservation
    function confirmerReservation(id) {
      Reservation.findById(id, (err, reservation) => {
        if (!err) {
          reservation.isConfirmed = true;
          reservation.save(err => {
            if (err) {
              console.log(err);
            } else {
              console.log("Reservation confirmed");
            }
          });
        }
      });
    }
    
  
  // Cancel a reservation
  function annulerReservation(id) {
    Reservation.findById(id, (err, reservation) => {
      if (!err) {
        reservation.isCancelled = true;
        reservation.save(err => {
          if (err) {
            console.log(err);
          } else {
            console.log("Reservation cancelled");
          }
        });
      }
    });
  }
  
  // Modify the dates of a reservation
  function modifierDates(id, dateDebut, dateFin) {
    Reservation.findById(id, (err, reservation) => {
      if (!err) {
        reservation.dateDebut = dateDebut;
        reservation.dateFin = dateFin;
        reservation.save(err => {
          if (err) {
            console.log(err);
          } else {
            console.log("Reservation dates modified");
          }
        });
      }
    });
  }
  
  // Get the details of a reservation
  function getDetails(id) {
    Reservation.findById(id, (err, reservation) => {
      if (!err) {
        console.log(reservation);
      }
    });
  };
  
  
  
  