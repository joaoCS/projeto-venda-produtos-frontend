import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../components/Navbar/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer
    }
});