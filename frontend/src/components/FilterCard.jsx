import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
    {
        filterType: "Location",
        array: [, "Bangalore", "Hyderabad", "Pune", "Remote"]
    },
    {
        filterType: "Role",
        array: [
            "Backend Engineer",
            "MERN Stack Engineer",
            "Software Development Engineer (SDE)",
            "Generative AI Developer",
            "Machine Learning Engineer",
            "Data Scientist",
        ]
    },
    {
        filterType: "Salary",
        array: ["8-15 LPA", "15-25 LPA", "25-40 LPA", "40-60 LPA", "60+ LPA"]
    },
]

const FilterCard = () => {
    // Sirf UI update ke liye local state rakhi hai
    ///const [selectedValue, setSelectedValue] = useState('');

    ////const changeHandler = (value) => {
    //    setSelectedValue(value);
   // }

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup >
                {
                    filterData.map((data, index) => (
                        <div key={index} className="mt-5">
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-3'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId} className="cursor-pointer text-gray-700">{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard