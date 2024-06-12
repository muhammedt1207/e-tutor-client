import { createSlice } from "@reduxjs/toolkit";
import { instructorApplication } from "../action/instructorAction";
import { getAllRequests } from "../action/AdminActions";
import { getExamByCourseId } from "../action/ExamsActions";

const ExamSlice=createSlice({
    name:'instructor',
    initialState:{
        loading:false,
        exams:null,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getExamByCourseId.pending,(state)=>{
            state.loading=true
        })
        .addCase(getExamByCourseId.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.exams=payload.data
        })
        .addCase(getExamByCourseId.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.exams=null
        })
       
    }
})


export default ExamSlice.reducer; 
export const {  } = ExamSlice.actions; 