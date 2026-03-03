import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'


// Dummy skills for designing
const skills = ["ReactJS", "NodeJS", "Express", "MongoDB", "Data Structures", "Tailwind CSS"]
const isResume = true;

const Profile = () => {
    // Local state modal open/close check karne ke liye
    

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>Ajay Thakur</h1>
                            <p className='text-gray-600'>Computer Science Engineering Student at MNNIT Allahabad | Aspiring Software Engineer</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>ajay@example.com</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>+91 9876543210</span>
                    </div>
                </div>
                
                <div className='my-5'>
                    <h1 className='font-bold text-lg mb-2'>Skills</h1>
                    <div className='flex items-center gap-2'>
                        {
                            skills.length !== 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                
                <div className='grid w-full max-w-sm items-center gap-1.5 mt-5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href='#' className='text-blue-600 w-full hover:underline cursor-pointer'>Ajay_Thakur_Resume.pdf</a> : <span>NA</span>
                    }
                </div>
            </div>
            
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table   */}
                <AppliedJobTable />
            </div>
            
        </div>
    )
}

export default Profile