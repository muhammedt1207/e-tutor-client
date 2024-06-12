import { createAsyncThunk } from "@reduxjs/toolkit"
import { URL } from "../../Common/api"
import { appJson } from "../../Common/configurations"
import axios from "axios"

export const getExamByCourseId=createAsyncThunk('course.getcourse',async(courseId,{rejectWithValue})=>{
    try {
        const {data}=await axios.get(`${URL}/course/exam/${courseId}`,appJson)
    return data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

// export const submitExamResults=createAsyncThunk('course.postresult',async(courseId,{rejectWithValue})=>{
//     try {
//         const response = await axios.post(`${URL}/course/exams/${courseId}/submit`, results);
//         return response.data;
//     } catch (error) {
//         console.error('Error submitting exam results', error);
//         throw error;
//     }
// });
