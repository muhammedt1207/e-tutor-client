import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../Common/api";
import { appJson } from "../../Common/configurations";

export const createCourse=createAsyncThunk('course/addcourse',async(courseData,{rejectWithValue})=>{
    try {
        const {data}=await axios.post(`${URL}/course/course`,courseData,appJson)
        return data
    } catch (error) {
     console.log('axios error while course adding',error)
     rejectWithValue(error)   
    }
})

export const getAllCourses= createAsyncThunk('course/getCourse',async(_,{rejectWithValue})=>{
    try {
        const {data}=await axios.get(`${URL}/course/course`,appJson)
        console.table(data.data,'course data');
        return data
    } catch (error) {
        console.log('action error get all course',error);
        rejectWithValue(error)
    }
})

export const getCourse=createAsyncThunk('course.getcourse',async(id,{rejectWithValue})=>{
    try {
        const {data}=await axios.get(`${URL}/course/course/${id}`,appJson)
        console.log(data,'payload data ///////////////');
        return data
    } catch (error) {
        rejectWithValue(error)
    }
})

export const updateCourseStatus=createAsyncThunk('course/updateCoursestatus',async({id:id,action:action},{rejectWithValue})=>{
    try {
        const {data}=await axios.put(`${URL}/course/course/updateStatus`,{id,action},appJson)
        return data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const publishedCourses=createAsyncThunk('course/acceptedCourse',async(_,{rejectWithValue})=>{
    try {
        const {data}=await axios.get(`${URL}/course/course/acceptedCourses`,appJson)
        console.log('published course',data);
        return data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})

export const editCourse=createAsyncThunk('course/editCourse',async({courseId,courseData},{rejectWithValue})=>{
    try {
        const {data}=await axios.put(`${URL}/course/course/editCourse/${courseId}`,courseData,appJson)
        return data
    } catch (error) {
        console.log(error);
        rejectWithValue(error)
    }
})