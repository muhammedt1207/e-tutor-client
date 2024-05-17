import { createSlice } from "@reduxjs/toolkit";
import { createCourse } from "../action/instructor/courseAction";


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
    }
})

export default CourseSlice.reducer;
