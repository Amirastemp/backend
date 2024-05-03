const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma de modèle pour Schedule
const scheduleSchema = new Schema({
  title:{type:String,required:true},
  description:{type:String,required:true},
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  Nameoftrainner: {
   type:String,
   required:true
  },
  status: {
    type: String,
    enum: ['draft', 'closed', 'open'],
    default: 'draft'
  },
});

// Méthode pour calculer la durée
scheduleSchema.methods.calculateDuration = function() {
  const diffInMilliseconds = this.endDate.getTime() - this.startDate.getTime();
  // Convertir la différence de temps en jours (arrondi à l'entier le plus proche)
  return Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));
};

// Création du modèle Schedule à partir du schéma
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
