const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creche: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creche'
  },
  dateDebut: {
    type: Date,
    default: Date.now
  },
  dateFin: {
    type: Date,
    default: Date.now
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports.model = Reservation;
module.exports.schema = reservationSchema;

