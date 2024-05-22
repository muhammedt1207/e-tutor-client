import { createSlice } from "@reduxjs/toolkit"
import { makePayment } from "../action/paymentAction"

const PaymentSlice=createSlice({
    name:'payment',
    initialState:{
        loading:false,
        payment:null,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(makePayment.pending,(state)=>{
            state.loading=true
        })
        .addCase(makePayment.fulfilled,(state,{payload})=>{
            state.loading=false,
            state.error=null,
            state.payment=payload
        })
        .addCase(makePayment.rejected,(state,{payload})=>{
            state.loading=false,
            state.error=payload,
            state.payment=null
        })
    }
})


export default PaymentSlice.reducer; 
