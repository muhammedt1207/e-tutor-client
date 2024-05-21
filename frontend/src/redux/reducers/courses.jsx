import { createSlice } from "@reduxjs/toolkit";
import { createCourse, getAllCourses, getCourse, updateCourseStatus } from "../action/courseAction";


const CourseSlice=createSlice({
    name:'courses',
    initialState:{
        error:null,
        data:null,
        loading:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createCourse.pending,(state)=>{
            state.loading=true
        })
        .addCase(createCourse.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.data=payload.data
        })
        .addCase(createCourse.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.data=null
        })
        .addCase(getAllCourses.pending,(state)=>{
            state.loading=true
        })
        .addCase(getAllCourses.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.data=payload.data
        })
        .addCase(getAllCourses.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.data=null
        })
        .addCase(getCourse.pending,(state)=>{
            state.loading=true
        })
        .addCase(getCourse.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.data=payload.data
        })
        .addCase(getCourse.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.data=null
        })
        .addCase(updateCourseStatus.pending,(state)=>{
            state.loading=true
        })
        .addCase(updateCourseStatus.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.data=payload
        })
        .addCase(updateCourseStatus.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.data=null
        })
    }
})

export default CourseSlice.reducer;
