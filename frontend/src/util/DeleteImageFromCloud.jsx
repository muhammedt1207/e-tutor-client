import axios from 'axios';

const deleteImageFromCloudinary = async (publicId) => {
    const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME;
    const api_key = import.meta.env.VITE_REACT_APP_API_KEY;
    const api_secret = import.meta.env.VITE_REACT_APP_API_SECRET;

    try {
        const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`;
        const timestamp = Math.floor(Date.now() / 1000);

        const signature = sha1(`public_id=${publicId}&timestamp=${timestamp}${api_secret}`);

        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('timestamp', timestamp);
        formData.append('api_key', api_key);
        formData.append('signature', signature);

        const res = await axios.post(url, formData);
        return res.data;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

export default deleteImageFromCloudinary;
