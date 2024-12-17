const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  },
  // hospital: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
  HospitalContactNumber: {
    type: Number,
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
    default: 'doctor', // Identify the type of data
    immutable: true // Optional: Prevent changes to this field after creation
  },
  location:{
    type:String,
    default:null
  }
}, { 
  timestamps: true 
});

// Pagination method
// DoctorSchema.statics.paginate = async function(options = {}) {
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

module.exports = mongoose.model('Doctor', DoctorSchema);