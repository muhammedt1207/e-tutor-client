import { configureStore } from "@reduxjs/toolkit";
import userAuth from './reducers/usereAuth'
import instructor from './reducers/instructor'
import categories from "./reducers/categories";
import courses from "./reducers/courses";
import paymentSlice from "./reducers/paymentSlice";
import ExamSlice from "./reducers/ExamSlice";


export const store=configureStore({
    reducer:{
        user:userAuth,
        instructor:instructor,
        category:categories,
        courses:courses,
        payment:paymentSlice,
        exams:ExamSlice
    }
})