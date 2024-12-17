const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  contactNumber: {
    type: Number,
    required: true
  },
  location: {
    
      type: String,
      required: true
  
  },
  // availabilityStatus: {
  //   type: Boolean,
  //   default: true
  // },
  image: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'ambulance', // Identify the type of data
    immutable: true // Optional: Prevent changes to this field after creation
  }
}, { 
  timestamps: true 
});

// Pagination method
// AmbulanceSchema.statics.paginate = async function(options = {}) {
//     const { 
//       page = 1, 
//       limit = 10, 
//       sortBy = 'createdAt', 
//       sortOrder = 'desc',
//       conditions = {} // Add conditions parameter for filtering
//     } = options;
  
//     const skip = (page - 1) * limit;
  
//     const [results, total] = await Promise.all([
//       this.find(conditions) // Apply the conditions to filter
//         .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
//         .skip(skip)
//         .limit(Number(limit))
//         .lean(),
//       this.countDocuments(conditions) // Apply same conditions to count
//     ]);
  
//     return {
//       results,
//       total,
//       page: Number(page),
//       totalPages: Math.ceil(total / limit),
//       hasMore: total > skip + results.length
//     };
//   };

module.exports = mongoose.model('Ambulance', AmbulanceSchema);