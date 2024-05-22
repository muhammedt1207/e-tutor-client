import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../Common/api";

export const makePayment = createAsyncThunk('user/getUserData', async ({data}, { rejectedWithValue }) => {
    try {
        const { data } = await axios.get(`${URL}/payment/`,data, config)
        console.log(data, '111111111111111111111111111111111111');
        return data
    } catch (error) {
        return error
    }
})
