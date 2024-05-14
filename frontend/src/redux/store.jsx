import { configureStore } from "@reduxjs/toolkit";
import userAuth from './reducers/usereAuth'
import instructor from './reducers/instructor'
import categories from "./reducers/categories";


export const store=configureStore({
    reducer:{
        user:userAuth,
        instructor:instructor,
        category:categories
    }
})