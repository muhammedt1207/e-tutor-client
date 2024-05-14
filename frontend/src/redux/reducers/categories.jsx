import { createSlice } from "@reduxjs/toolkit";
import { createCategories, editCategory, getAllCategories } from "../action/admin/Categories";

const categorySlice=createSlice(
    {
        name:'category',
        initialState:{
            loading:false,
            error:null,
            data:null
        },
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(createCategories.fulfilled,(state,{payload})=>{
                state.loading=false,
                state.error=null,
                state.data=payload.data
            })
            .addCase(createCategories.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(createCategories.rejected,(state,{payload})=>{
                state.loading=false,
                state.error=payload,
                state.data=null
            })
            .addCase(getAllCategories.fulfilled,(state,{payload})=>{
                state.loading=false,
                state.error=null,
                state.data=payload.data
            })
            .addCase(getAllCategories.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(getAllCategories.rejected,(state,{payload})=>{
                state.loading=false,
                state.error=payload.data.error,
                state.data=null
            })
            .addCase(editCategory.fulfilled,(state,{payload})=>{
                state.loading=false,
                state.error=null,
                state.data=payload.data
            })
            .addCase(editCategory.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(editCategory.rejected,(state,{payload})=>{
                state.loading=false,
                state.error=payload,
                state.data=null
            })
        }

    }
)

export default categorySlice.reducer; 
export const {  } = categorySlice.actions;