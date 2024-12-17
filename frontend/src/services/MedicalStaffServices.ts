import axios from "axios";
import { DoctorApiResponse } from "interfaces/MedicalStaffINterface";
const baseUrl = import.meta.env.VITE_BASE_URL;

const AuthDoctorServices = {

    async fetchLocationDoctor(payload: string,
        callback: (data: any | null, error?: any) => void
    ) {
        try {
            const response = await axios.get(`${baseUrl}getLocation/${payload}`, {
                headers: {
                    "content-type": "application/json"
                },
            });
            // Pass the response data to the callback
            const result: DoctorApiResponse = response.data;
            callback(result);
        } catch (error) {
            console.error("Error fetching ambulances:", error);
            // Pass the error to the callback
            callback(null, error);
        }
    },


    async fetchDoctors(payload: { location: string, page: number },
        callback: (data: any | null, error?: any) => void
    ) {
        try {
            const { location, page } = payload;  // Destructure location from the payload
            const response = await axios.get(`${baseUrl}getAllDoctors`, {
                params: {
                    page: page,
                    limit: 10,
                    location,  // Using location from payload
                },
                headers: {
                    "content-type": "application/json"
                },
            });
            // Pass the response data to the callback
            const result: DoctorApiResponse = response.data;
            callback(result);
        } catch (error) {
            console.error("Error fetching doctor:", error);
            // Pass the error to the callback
            callback(null, error);
        }
    },

    async addDoctor(
        payload: any,
        callback: (data: any | null, error?: any) => void
    ) {
        try {
            const response = await axios.post(`${baseUrl}creatDoctors`, payload);
            // Pass the response data to the callback
            const result: DoctorApiResponse = response.data;
            callback(result);
        } catch (error) {
            console.error("Error fetching doctors:", error);
            // Pass the error to the callback
            callback(null, error);
        }
    },

    async updateDoctor(
        payload: any,
        callback: (data: any | null, error?: any) => void
    ) {
        try {
            const response = await axios.put(`${baseUrl}updateDoctors/${payload.id}`, payload);
            // Pass the response data to the callback
            const result: DoctorApiResponse = response.data;
            callback(result);
        } catch (error) {
            console.error("Error fetching doctors:", error);
            // Pass the error to the callback
            callback(null, error);
        }
    },

    async deleteDoctor(payload: string,
        callback: (data: any | null, error?: any) => void
    ) {
        try {
            const response = await axios.delete(`${baseUrl}deleteDoctors/${payload}`, {
                headers: {
                    "content-type": "application/json"
                },
            });
            // Pass the response data to the callback
            const result: DoctorApiResponse = response.data;
            callback(result);
        } catch (error) {
            console.error("Error fetching doctors:", error);
            // Pass the error to the callback
            callback(null, error);
        }
    },
};

export default AuthDoctorServices;
