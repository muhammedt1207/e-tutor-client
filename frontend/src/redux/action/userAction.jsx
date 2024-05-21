import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { appJson, config, multiForm } from "../../Common/configurations";
import axios from "axios";
import { URL } from "../../Common/api";


export const signup = createAsyncThunk('user/signup', async (userCredentials, { rejectWithValue }) => {
    try {

        const { data } = await axios.post(`${URL}/auth/signup`, userCredentials, multiForm);
        console.log(data, 'signup ressponse')
        return data
    } catch (error) {
        console.log('error from signup', error.response.data.message);
        return rejectWithValue(error.response.data.message)
    }
})

export const login = createAsyncThunk('user/login', async (userCredentials, { isRejectedWithValue }) => {
    try {
        const { data } = await axios.post(`${URL}/auth/login`, userCredentials, config)
        return data
    } catch (error) {
        console.error(error);
    }
})

export const getUserData = createAsyncThunk('user/getUserData', async (_, { rejectedWithValue }) => {
    try {
        const { data } = await axios.get(`${URL}/auth/`, config)
        console.log(data, '111111111111111111111111111111111111');
        return data
    } catch (error) {
        return error
    }
})


export const googleSignup = createAsyncThunk('user/googleSignup', async (userCredentials, { rejectedWithValue }) => {
    try {
        const { data } = await axios.post(`${URL}/auth/googleSignup`, { token: userCredentials.credential }, config)
        return data
    } catch (error) {
        return error
    }
})
export const logout = createAsyncThunk('user/logout', async (_, { rejectedWithValue }) => {
    try {
        const { data } = await axios.delete(`${URL}/auth/logout`, config)
        return data
    } catch (error) {
        return error
    }
})

export const updateProfile = createAsyncThunk('user/update', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${URL}/auth/updateProfile`, userData, appJson)
        return data
    } catch (error) {
        return error
    }
})

export const changePassword = createAsyncThunk('user/changePassword',async (userData,{rejectWithValue})=>{
    try {
        const {data} = await axios.put(`${URL}/auth/changePassword`,userData,appJson)
        return data
    } catch (error) {
        return error
    }
})
