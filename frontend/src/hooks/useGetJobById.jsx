import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetJobById = (jobId) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { 
                    withCredentials: true 
                });
                
                // Backend ke ApiResponse ke hisaab se res.data.data mein job aayega
                if (res.data.success || res.status === 200) {
                    dispatch(setSingleJob(res.data.data));
                }
            } catch (error) {
                console.log("Error fetching single job:", error);
            }
        };
        
        if(jobId){
            fetchSingleJob();
        }
    }, [jobId, dispatch]);
};

export default useGetJobById;