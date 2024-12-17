const DoctorService = require('../services/doctor.service');

const createDoctor = async (req, res) => {
    try {
      const doctor = await DoctorService.create(req.body);
      return res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Doctor created successfully',
        data: doctor
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        status: 400,
        message: 'Failed to create doctor',
        error: error.message,
        data: null
      });
    }
  };
  
  const getAllDoctors = async (req, res) => {
    try {
      const { page, limit, location } = req.query;
      const doctors = await DoctorService.findAll({ page, limit, location });
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Doctor retrieved successfully',
        data: doctors.docs,
        totalItem: doctors.total,
        page: doctors.page,
        totalPages: doctors.totalPages
      });
    } catch (error) {
        console.log(error)
      return res.status(500).json({
        status: 'error',
        status: 500,
        message: 'Internal server error while fetching doctors',
        error: error.message,
        data: null
      });
    }
  };
  
  const getDoctorById = async (req, res) => {
    try {
      const doctor = await DoctorService.findById(req.params.id);
      if (!doctor) {
        return res.status(404).json({
          status: 404,
          message: 'Doctor not found',
          data: null
        });
      }
      return res.status(200).json({
        status: 'success',
        status: 200,
        message: 'Doctor retrieved successfully',
        data: doctor
      });
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        status: 404,
        message: 'Failed to retrieve doctor',
        error: error.message,
        data: null
      });
    }
  };
  
  const updateDoctor = async (req, res) => {
    try {
      const doctor = await DoctorService.update(req.params.id, req.body);
      if (!doctor) {
        return res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: 'Doctor not found',
          data: null
        });
      }
      return res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Doctor updated successfully',
        data: doctor
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'Failed to update doctor',
        error: error.message,
        data: null
      });
    }
  };
  
  const deleteDoctor = async (req, res) => {
    try {
      const result = await DoctorService.deleteDoctor(req.params.id);
      if (!result) {
        return res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: 'Doctor not found',
          data: null
        });
      }
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'doctor deleted successfully',
        data: result
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: 'Failed to delete doctor',
        error: error.message,
        data: null
      });
    }
  };
  
  module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
  };