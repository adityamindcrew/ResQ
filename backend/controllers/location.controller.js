const locationService = require('../services/location.service');

  const getLocations=async(req, res) =>{
    try {
      const { type } = req.params;
      
      const locations = await locationService.getUniqueLocations(type);

      return res.status(200).json(locations);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

module.exports = {getLocations};