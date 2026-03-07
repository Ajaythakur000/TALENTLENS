import React ,{useState } from 'react'
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Job = ({job}) => {
    const navigate = useNavigate();
   const [isStarred, setIsStarred] = useState(() => {
  const savedJobs = JSON.parse(localStorage.getItem("starredJobs")) || [];
  return savedJobs.includes(job?._id);
});
   const toggleStar = () => {

  const savedJobs = JSON.parse(localStorage.getItem("starredJobs")) || [];

  if (savedJobs.includes(job?._id)) {

    const updatedJobs = savedJobs.filter(id => id !== job?._id);
    localStorage.setItem("starredJobs", JSON.stringify(updatedJobs));
    setIsStarred(false);

  } else {

    savedJobs.push(job?._id);
    localStorage.setItem("starredJobs", JSON.stringify(savedJobs));
    setIsStarred(true);

  }

};
    
    const daysAgoFunction = (mongodbTime) => {
        if(!mongodbTime) return 0;
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    const daysAgo = daysAgoFunction(job?.createdAt);
    const shareJobHandler = () =>{
        try{
            const jobLink = `${window.location.origin}/description/${job?._id}`;
            navigator.clipboard.writeText(jobLink);
            toast.success("Job link copied!");
        }catch(error){
            toast.error("Unable to copy link");
        }
    };
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgo === 0 ? "Today" : `${daysAgo} days ago`}</p>
                <Button onClick={toggleStar} variant="outline" className="rounded-full" size="icon"><Star className={`${isStarred ? "text-yellow-400 fill-yellow-400" : ""}`}/></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button onClick={shareJobHandler} className="bg-[#7209b7]">Share </Button>

                </div>
        </div>
    )
}

export default Job