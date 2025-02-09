import axios from "axios";

const API_URL = "https://creditsea-lh3y.onrender.com/api";

export const uploadFile = async (file) => {
    
    try {
        const formData = new FormData();
        formData.append("file", file);
    
        const res = axios.post(`${API_URL}/file/upload`, formData)
        return res;
    } catch (error) {
        console.log("Error in uploading",error);
        alert("Error in uploading" + error.message);
    }
};

export const fetchReports = async () => {
    const { data } = await axios.get(`${API_URL}/reports`);
    return data;
};
