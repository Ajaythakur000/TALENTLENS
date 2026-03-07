import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs || []);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs?.filter((job) => {
                const query = searchedQuery.toLowerCase();
                
                // Text matching (Location, Title, etc.)
                let matchesText = job?.title?.toLowerCase().includes(query) ||
                    job?.description?.toLowerCase().includes(query) ||
                    job?.location?.toLowerCase().includes(query);

                // Salary matching logic
                let matchesSalary = false;
                if (query.includes('lpa') && job?.salary) {
                    const salaryStr = query.replace('lpa', '').trim(); // "15-25" ya "60+" bachega
                    
                    if (salaryStr.includes('-')) {
                        // Agar "15-25" jaisa hai
                        const [min, max] = salaryStr.split('-').map(Number);
                        if (job.salary >= min && job.salary <= max) {
                            matchesSalary = true;
                        }
                    } else if (salaryStr.includes('+')) {
                        // Agar "60+" jaisa hai
                        const min = Number(salaryStr.replace('+', ''));
                        if (job.salary >= min) {
                            matchesSalary = true;
                        }
                    }
                }

                // Agar dono mein se koi ek bhi true hai, toh job dikhao
                return matchesText || matchesSalary;
            });
            
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs || []);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs?.length <= 0 ? <span>No jobs found!!</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs?.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs