// Interface for a single ambulance
export interface DoctorInterface {
  id: string;
  name: string;
  specialization: string;
  HospitalContactNumber: number;
  location: string;
}

// Interface for the API response
export interface DoctorApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: DoctorInterface[]; // Array of ambulances
  totalItem: number;
  page: number;
  totalPages: number;
}
