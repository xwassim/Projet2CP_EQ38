const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const reservationController =require('../controllers/reservationController');

const Day = require("./models/day").model;
const Reservation = require("./models/reservation").model;
router.use(verifyJWT);
router.route("/create").post(reservationController.createReservation);

// confirm a Reservation
router.route("/confimer/:id").post(reservationController.confirmerReservation);

// annuler Reservation
router.route("/annuler/:id").delete(reservationController.annulerReservation);

// Get all details of reservations
router.route("/get/:id").get(reservationController.getDetails);
//modifier date reservation
router.route('/modifier/:id').patch(reservationController.modifierDates);


module.exports = router;