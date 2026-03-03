import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
const Job = () => {
    const navigate = useNavigate();
    const jobId = "fdsfalkjrdsjas";
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://5.imimg.com/data5/SELLER/Default/2022/2/XI/GC/KA/2379414/professional-logo-designing-service-500x500.jpg" alt="Company Logo" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Google</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>Frontend Developer</h1>
                <p className='text-sm text-gray-600'>
                    We are looking for an exceptional Frontend Developer to join our dynamic team. You will be responsible for building responsive and highly interactive user interfaces.
                </p>
            </div>
            
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">12 Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">Full Time</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">24LPA</Badge>
            </div>
            
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick = {() => navigate(`/description/${jobId}`)} variant="outline">Details</Button>
                <Button className="bg-[#7209b7] hover:bg-[#5f0899]">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job