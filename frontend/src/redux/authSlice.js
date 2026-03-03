import { createSlice } from "@reduxjs/toolkit";
// authSlice = auth related state ka section
const authSlice = createSlice({
  name: "auth", // slice ka naam
  // default state jab app start hota hai
  initialState: {
    loading: false,
  },
  reducers: {    
    // loading state update karne ka function
    setLoading: (state, action) => {
      state.loading = action.payload; 
      // payload jo bhejoge wahi loading ban jayega
    },
  },
});
// action export (dispatch karne ke liye)
export const { setLoading } = authSlice.actions;
export default authSlice.reducer;