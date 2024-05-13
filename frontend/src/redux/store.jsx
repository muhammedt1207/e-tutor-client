import { configureStore } from "@reduxjs/toolkit";
import userAuth from './reducers/usereAuth'
import instructor from './reducers/instructor'


export const store=configureStore({
    reducer:{
        user:userAuth,
        instructor:instructor
    }
})