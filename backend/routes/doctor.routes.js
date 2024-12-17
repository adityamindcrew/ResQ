const express = require('express');

const doctorController = require('../controllers/doctor.controller');

const router = express.Router();
router.post('/creatDoctors', doctorController.createDoctor);
router.get('/getAllDoctors', doctorController.getAllDoctors);
router.get('/doctors/:id', doctorController.getDoctorById);
router.put('/updateDoctors/:id', doctorController.updateDoctor);
router.delete('/deleteDoctors/:id', doctorController.deleteDoctor);
module.exports = router;