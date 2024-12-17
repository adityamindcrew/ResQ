const AmbulanceService = require('../services/ambulance.service');
//creating ambulance by admin
const createAmbulance = async (req, res) => {
    try {
      const ambulance = await AmbulanceService.create(req.body);
      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Ambulance created successfully',
        data: ambulance
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: error.message || 'Failed to create ambulance',
        data: null
      });
    }
  };
  //it will give list of all ambulance 
  const getAllAmbulances = async (req, res) => {
    try {
      const { page, limit, location } = req.query;
    
      const result = await AmbulanceService.findAll({ 
        page, 
        limit, 
        location 
      });
      
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Ambulances retrieved successfully',
        data: result.docs,
        totalItem: result.total,
        page: result.page,
        totalPages: result.totalPages
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: error.message || 'Failed to retrieve ambulances',
        data: null
      });
    }
  };
  
  const getAmbulanceById = async (req, res) => {
    try {
      const ambulance = await AmbulanceService.findById(req.params.id);
      
      if (!ambulance) {
        return res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: 'Ambulance not found',
          data: null
        });
      }
      
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Ambulance retrieved successfully',
        data: ambulance
      });
    } catch (error) {
      res.status(404).json({
        status: 'error',
        statusCode: 404,
        message: error.message || 'Failed to retrieve ambulance',
        data: null
      });
    }
  };
  
  
//updating ambulance
  

const updateAmbulance = async (req, res) => {
    try {
      const ambulance = await AmbulanceService.update(req.params.id, req.body);
      
      if (!ambulance) {
        return res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: 'Ambulance not found',
          data: null
        });
      }
      
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Ambulance updated successfully',
        data: ambulance
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: error.message || 'Failed to update ambulance',
        data: null
      });
    }
  };
  
  const deleteAmbulance = async (req, res) => {
    try {
      const result = await AmbulanceService.deleteAmbulance(req.params.id);
      
      if (!result) {
        return res.status(404).json({
          status: 'error',
          statusCode: 404,
          message: 'Ambulance not found',
          data: null
        });
      }
      
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Ambulance deleted successfully',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: error.message || 'Failed to delete ambulance',
        data: null
      });
    }
  };
  
  module.exports = {
    createAmbulance,
    getAllAmbulances,
    getAmbulanceById,
    updateAmbulance,
    deleteAmbulance
  }