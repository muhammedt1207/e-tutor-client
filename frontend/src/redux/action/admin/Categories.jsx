import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../Common/api";
import { appJson } from "../../../Common/configurations";

export const createCategories=createAsyncThunk('admin/addCategories',async(CategoryData,{rejectWithValue})=>{
    try {
        const {data}=await axios.post(`${URL}/course/category`,CategoryData,appJson)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getAllCategories=createAsyncThunk('admin/getCategories',async(_,{rejectWithValue})=>{
    try {
        const {data}=await axios.get(`${URL}/course/category`,appJson)
        return data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error)
    }
})

export const editCategory=createAsyncThunk('admin/editCategory',async({id:id,categoryData:categoryData},{rejectWithValue})=>{
    try {
        console.log(categoryData,'dddd',id,'111111111111111111111111111111111111111111111');
        const {data}=await axios.put(`${URL}/course/category/${id}`,categoryData,appJson)
    return data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})