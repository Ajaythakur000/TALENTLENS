import { createSlice } from "@reduxjs/toolkit";
import { setSearchCompanyByText } from "./companySlice";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",

    },
    reducers:{
        //actions
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action)=>{
            state.allAdminJobs = action.payload;
        },
        setSearchCompanyByText:(state,action)=>{
            state.allAdminJobs = action.payload;
        }
    }
});
export const {setAllJobs, setSingleJob, setAllAdminJobs} = jobSlice.actions;
export default jobSlice.reducer;