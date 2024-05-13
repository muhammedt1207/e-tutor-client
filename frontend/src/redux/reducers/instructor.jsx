import { createSlice } from "@reduxjs/toolkit";
import { instructorApplication } from "../action/instructor/instructorAction";
import { getAllRequests } from "../action/admin/AdminActions";

const InstructorSlice=createSlice({
    name:'instructor',
    initialState:{
        loading:false,
        data:null,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(instructorApplication.pending,(state)=>{
            state.loading=true
        })
        .addCase(instructorApplication.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.data=payload
        })
        .addCase(instructorApplication.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.data=null
        })
        .addCase(getAllRequests.pending,(state)=>{
            state.loading=true
        })
        .addCase(getAllRequests.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.data=payload
        })
        .addCase(getAllRequests.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.data=null
        })
    }
})


export default InstructorSlice.reducer; 
export const {  } = InstructorSlice.actions; 