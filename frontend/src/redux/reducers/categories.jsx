import { createSlice } from "@reduxjs/toolkit";
import { createCategories } from "../action/admin/Categories";

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
                state.user=payload.data
            })
            .addCase(createCategories.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(createCategories.rejected,(state,{payload})=>{
                state.loading=false,
                state.error=payload,
                state.user=null
            })
        }

    }
)

export default categorySlice.reducer; 
export const {  } = categorySlice.actions;