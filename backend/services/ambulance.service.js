const Ambulance = require('../models/ambulance.model');


  const create=async (ambulanceData) =>{
    try {
      const ambulance = new Ambulance(ambulanceData);
      return await ambulance.save();
    } catch (error) {
      throw new Error(`Failed to create ambulance: ${error.message}`);
    }
  }

  
  const findAll = async ({ page, limit, location }) => {
    try {
      // Ensure page and limit are valid numbers
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
  
      // Count total documents matching the filter
      const total = await Ambulance.countDocuments(filter);
  
      // Calculate total pages
      const totalPages = Math.ceil(total / limitNum);
  
      // Fetch documents
      const docs = await Ambulance.find(filter)
        .select('title description contactNumber location ')
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean();
  
      // Transform documents
      const transformedDocs = docs.map(doc => ({
        id: doc._id.toString(),
        title: doc.title || '',
        description: doc.description || '',
        contactNumber: doc.contactNumber || '',
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
      // Log the full error for server-side debugging
      console.error('Error in findAll:', {
        message: error.message,
        stack: error.stack,
        originalError: error
      });
  
      // Throw a more informative error
      throw new Error(`Failed to retrieve ambulances: ${error.message}`);
    }
  };

  const findById=async (id) =>{
    try {
      const ambulance = await Ambulance.findById(id);
      if (!ambulance) {
        throw new Error('Ambulance not found');
      }
      return ambulance;
    } catch (error) {
      throw new Error(`Failed to find ambulance: ${error.message}`);
    }
  }

  const update=async (id, updateData)=>{
    try {
      const ambulance = await Ambulance.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
      );

      if (!ambulance) {
        throw new Error('Ambulance not found');
      }

      return ambulance;
    } catch (error) {
      throw new Error(`Failed to update ambulance: ${error.message}`);
    }
  }

  const deleteAmbulance = async (id)=> {
    try {
      const ambulance = await Ambulance.findByIdAndDelete(id);
      
      if (!ambulance) {
        throw new Error('Ambulance not found');
      }

      return ambulance;
    } catch (error) {
      throw new Error(`Failed to delete ambulance: ${error.message}`);
    }
  }


module.exports= {
    create,
    findAll,
    findById,
    update,
    deleteAmbulance
}