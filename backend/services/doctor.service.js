const Doctor = require('../models/doctor.model');


  const create=async(doctorData)=> {
    try {
      const doctor = new Doctor(doctorData);
      return await doctor.save();
    } catch (error) {
      throw new Error(`Failed to create doctor: ${error.message}`);
    }
  }


  const findAll = async ({ page, limit, location }) => {
    try {
      // Create an empty filter object
      const pageNum = Math.max(1, parseInt(page) || 1);
      const limitNum = Math.max(1, parseInt(limit) || 10);
  
      // Construct the filter object
      const filter = {};
      
      // Add location filter if provided
      if (location && location.trim() !== '') {
        filter.location = { 
          $regex: location.trim(), 
          $options: 'i' 
        };
      }
      // Use Doctor.paginate to get paginated results
      const total = await Doctor.countDocuments(filter);
     
         // Calculate total pages
         const totalPages = Math.ceil(total / limitNum);
          const docs = await Doctor.find(filter)
                 .select('name specialization location HospitalContactNumber ')
                 .skip((pageNum - 1) * limitNum)
                 .limit(limitNum)
                 .lean();
           
               // Transform documents
               const transformedDocs = docs.map(doc => ({
                 id: doc._id.toString(),
                 name: doc.name || '',
                 specialization: doc.specialization || '',
                 HospitalContactNumber: doc.HospitalContactNumber || '',
                 location: doc.location || '',
              
              }));
           
               // Return transformed documents with pagination info
               return {
                 docs: transformedDocs,
                 total,
                 page: pageNum,
                 totalPages
               };
    } catch (error) {
        console.log(error)
      throw error;
    }
  };
  

 const findById= async (id) =>{
    try {
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      return doctor;
    } catch (error) {
      throw new Error(`Failed to find doctor: ${error.message}`);
    }
  }

  const update=async (id, updateData)=> {
    try {
      const doctor = await Doctor.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
      );

      if (!doctor) {
        throw new Error('Doctor not found');
      }

      return doctor;
    } catch (error) {
      throw new Error(`Failed to update doctor: ${error.message}`);
    }
  }

 const deleteDoctor= async (id)=> {
    try {
      const doctor = await Doctor.findByIdAndDelete(id);
      
      if (!doctor) {
        throw new Error('Doctor not found');
      }

      return doctor;
    } catch (error) {
      throw new Error(`Failed to delete doctor: ${error.message}`);
    }
  }
module.exports={
    create,
    findAll,
    findById,
    update,
    deleteDoctor

}

