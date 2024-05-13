import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from "../../../Common/api";
import axios from "axios";
import { appJson } from "../../../Common/configurations";


export const getAllRequests = createAsyncThunk(
    'admin/allrequests',
    async (_,{rejectWithValue}) => {
      try {
        const response = await axios.get(`${URL}/users/instructor`,); 
        return response.data;
      } catch (error) {
          return rejectWithValue(error.response.data.message);
        throw error;
      }
    }
  );

  export const acceptRequest = createAsyncThunk('admin/acceptRequest',async({requestId,status},{rejectWithValue})=>{
    try {
        const {data}=await axios.patch(`${URL}/user/instructor/${requestId}/${status}`,appJson)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
  })