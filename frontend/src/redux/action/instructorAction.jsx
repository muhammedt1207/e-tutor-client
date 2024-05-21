import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../Common/api";
import { config, multiForm } from "../../Common/configurations";
import axios from "axios";


export const instructorApplication=createAsyncThunk('instructor/application',async(instructorData,{rejectWithValue})=>{
    try {
        console.log('instructo application data :',instructorData);
        const {data}=await axios.post(`${URL}/user/instructor/apply`,instructorData,config);
        console.log('response data :',data);
        return data
    } catch (error) {
        console.log('instructor application post error :',error);
        return rejectWithValue(error.response.data.message)
    }
})