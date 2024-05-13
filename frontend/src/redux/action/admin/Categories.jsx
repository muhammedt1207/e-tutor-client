import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/api";
import { appJson } from "../../../Common/configurations";

export const createCategories=createAsyncThunk('admin/addCategories',async({data},{rejectWithValue})=>{
    try {
        const {data}=await axios.post(`${URL}/course/category`,appJson)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})