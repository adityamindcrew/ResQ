// Interface for a single ambulance
export interface Ambulance {
    id: string;
    title: string;
    description: string;
    contactNumber: number;
    location: string;
    availabilityStatus: boolean;
  }
  
  // Interface for the API response
  export interface AmbulanceApiResponse {
    status: string;
    statusCode: number;
    message: string;
    data: Ambulance[]; // Array of ambulances
    totalItem: number;
    page: number;
    totalPages: number;
  }
  