import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const BIDDING_URL = `${BACKEND_URL}/bidding/`;


const getBiddingHistory = async (productId) => {
    try {
        const response = await axios.get(`${BIDDING_URL}${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching bidding history:", error);
        throw error;
    }
};

const sellProduct = async (productId) => {
    try {
        const response = await axios.post(`${BIDDING_URL}sell`, productId);
        return response.data;
    } catch (error) {
        console.error("Error selling product:", error);
        throw error;
    }
};

const placeBid = async (bidData) => {
    try {
        const response = await axios.post(BIDDING_URL, {
            productId: bidData.productId || bidData.ProductId,
            price: Number(bidData.price)
        }, {
            withCredentials: true // Add this to ensure cookies are sent
        });
        return response.data;
    } catch (error) {
        console.error("Error placing bid:", error.response?.data || error.message);
        throw error;
    }
};

const biddingService = {
    getBiddingHistory,
    sellProduct,
    placeBid,
};

export default biddingService;
