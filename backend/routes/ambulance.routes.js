const express = require('express');
const ambulanceController = require('../controllers/ambulance.controller');


const router = express.Router();
router.post('/createAmbulances', ambulanceController.createAmbulance);
router.get('/getAmbulances', ambulanceController.getAllAmbulances);
router.get('/ambulances/:id', ambulanceController.getAmbulanceById);
router.put('/updateAmbulances/:id', ambulanceController.updateAmbulance);
router.delete('/deleteAmbulances/:id', ambulanceController.deleteAmbulance);
module.exports = router;