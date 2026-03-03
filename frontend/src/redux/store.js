import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"; // <-- YE LINE MISSING THI

const store = configureStore({
    reducer: {
         auth: authSlice
    }
});

export default store;