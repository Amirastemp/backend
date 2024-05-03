const Schedule = require('../models/scheduleModel');
exports.createschedule = async (req, res) => {
    try {
        // Créer une nouvelle instance de Schedule en utilisant les données du corps de la requête
        const newSchedule = new Schedule({
          title:req.body.title,
          description:req.body.description,
          Nameoftrainner:req.body.Nameoftrainner,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          location: req.body.location,
          duration: req.body.duration,
          price: req.body.price
        });
    
        // Enregistrer le nouvel horaire dans la base de données
        const savedSchedule = await newSchedule.save();
    
        res.status(201).json(savedSchedule); // Répondre avec l'horaire nouvellement créé
      } catch (error) {
        res.status(400).json({ message: error.message }); // En cas d'erreur, répondre avec un statut 400 et un message d'erreur
      }
    }
    exports.deleteonetraining = async (req, res) => {
        try {
          const id = req.params.id;
          await Schedule.findByIdAndDelete(id);
          res.json({ message: 'Job Post deleted successfully' });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      };
      exports.getAlltraining = async (req, res) => {
        try {
          // Récupérer tous les job posts depuis la base de données
          const schedule = await Schedule.find();
      
          res.status(200).json({ schedule });
        } catch (error) {
          res.status(500).json({ success: false, error: error.message });
        }
      };
      exports.getonetraining= async(req, res) => {
        try{
          const id=req.params.id;
          const training=await Schedule.findById(id);
          res.status(200).json({training});
        } catch (error) {
          res.status(500).json({ success: false, error: error.message });
        }
      }
      exports.updateonetraining= async(req, res) => {
        try{
          const id=req.params.id;
          const training =req.body;
         await Schedule.findByIdAndUpdate(id,training);
          res.status(200).json({message:'updated successfully!'});
        } catch (error) {
          res.status(500).json({ success: false, error: error.message });
        }
      }