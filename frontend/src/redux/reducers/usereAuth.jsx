import { createSlice } from "@reduxjs/toolkit";
import { changePassword, getUserData, googleSignup, login, logout, signup, updateProfile } from "../action/userAction";


const userSlice=createSlice({
    name:"user",
    initialState:{
        loading:false,
        user:null,
        error:null
    },
    reducers:{
        updateUserOnOTPValidation:(state,{payload})=>{
            state.user=payload;
        },
        updateError:(state,{payload})=>{
            state.error=payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(signup.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.user=payload.data
        })
        .addCase(signup.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(signup.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.user=null
        })
        .addCase(login.pending,(state)=>{
            state.loading=true
        })
        .addCase(login.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.user=payload.data
        })
        .addCase(login.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.user=null 
        })
        .addCase(googleSignup.pending,(state)=>{
            state.loading=true 
        })
        .addCase(googleSignup.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.user=payload.data
        })
        .addCase(googleSignup.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.user=null
        })
        .addCase(getUserData.pending,(state)=>{
            state.loading=true 
        })
        .addCase(getUserData.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.user=payload.data
        })
        .addCase(getUserData.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.user=null
        })
        .addCase(logout.pending,(state)=>{
            state.loading=true 
        })
        .addCase(logout.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.user=null
        })
        .addCase(logout.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.user=null
        })
        .addCase(updateProfile.pending,(state)=>{
            state.loading=true 
        })
        .addCase(updateProfile.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.user=payload.data
        })
        .addCase(updateProfile.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.user=null
        })
        .addCase(changePassword.pending,(state)=>{
            state.loading=true 
        })
        .addCase(changePassword.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.user=payload.data
        })
        .addCase(changePassword.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.user=null
        })
    }
})

export const {updateUserOnOTPValidation,updateError}=userSlice.actions
export default userSlice.reducer;