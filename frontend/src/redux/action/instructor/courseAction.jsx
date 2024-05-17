import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/api";
import { appJson } from "../../../Common/configurations";

export const createCourse=createAsyncThunk('course/addcourse',async(courseData,{rejectWithValue})=>{
    try {
        const {data}=await axios.post(`${URL}/course/course`,courseData,appJson)
        return data
    } catch (error) {
     console.log('axios error while course adding',error)
     rejectWithValue(error)   
    }
})