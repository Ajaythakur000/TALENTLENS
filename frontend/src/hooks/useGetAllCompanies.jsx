import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                
                if(res.status === 200){
                    dispatch(setCompanies(res.data.data));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[dispatch])
}

export default useGetAllCompanies