import axios from "axios";
import { AmbulanceApiResponse } from "interfaces/AmbulanceInterface";
const baseUrl = import.meta.env.VITE_BASE_URL;

const AuthAmbulanceServices = {

    async fetchLocationAmbulances(payload: string,
        callback: (data: any | null, error?: any) => void
    ) {
        try {
            const response = await axios.get(`${baseUrl}getLocation/${payload}`, {
                headers: {
                    "content-type": "application/json"
                },
            });
            // Pass the response data to the callback
            const result: AmbulanceApiResponse = response.data;
            callback(result);
        } catch (error) {
            console.error("Error fetching ambulances:", error);
            // Pass the error to the callback
            callback(null, error);
        }
    },


    async fetchAmbulances(payload: { location: string, page: number },
        callback: (data: any | null, error?: any) => void
    ) {
        try {
            const { location, page } = payload;  // Destructure location from the payload
            const response = await axios.get(`${baseUrl}getAmbulances`, {
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
            const result: AmbulanceApiResponse = response.data;
            callback(result);
        } catch (error) {
            console.error("Error fetching ambulances:", error);
            // Pass the error to the callback
            callback(null, error);
        }
    },

    async addAmbulances(
        payload: any,
        callback: (data: any | null, error?: any) => void
    ) {
        try {
            const response = await axios.post(`${baseUrl}createAmbulances`, payload);
            // Pass the response data to the callback
            const result: AmbulanceApiResponse = response.data;
            callback(result);
        } catch (error) {
            console.error("Error fetching ambulances:", error);
            // Pass the error to the callback
            callback(null, error);
        }
    },

    async updateAmbulances(
        payload: any,
        callback: (data: any | null, error?: any) => void
    ) {
        try {
            const response = await axios.put(`${baseUrl}updateAmbulances/${payload.id}`, payload);
            // Pass the response data to the callback
            const result: AmbulanceApiResponse = response.data;
            callback(result);
        } catch (error) {
            console.error("Error fetching ambulances:", error);
            // Pass the error to the callback
            callback(error);
        }
    },

    async deleteAmbulances(payload: string,
        callback: (data: any | null, error?: any) => void
    ) {
        try {
            const response = await axios.delete(`${baseUrl}deleteAmbulances/${payload}`, {
                headers: {
                    "content-type": "application/json"
                },
            });
            // Pass the response data to the callback
            const result: AmbulanceApiResponse = response.data;
            callback(result);
        } catch (error) {
            console.error("Error fetching ambulances:", error);
            // Pass the error to the callback
            callback(null, error);
        }
    },
};

export default AuthAmbulanceServices;
