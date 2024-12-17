const Doctor = require('../models/doctor.model');
const Ambulance = require('../models/ambulance.model');


  const getUniqueLocations=async (type)=> {
    if (!['doctor', 'ambulance'].includes(type.toLowerCase())) {
      throw new Error('Invalid type');
    }

    const Model = type === 'doctor' ? Doctor : Ambulance;

    return await Model.distinct('location', { location: { $ne: null } });
  }


module.exports = {getUniqueLocations};