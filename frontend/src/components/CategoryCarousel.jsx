import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';


const category = [
    "Backend Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "MERN Stack Engineer",
    "Software Development Engineer (SDE)",
    "Mobile App Developer",
    "Generative AI Developer",
    "Machine Learning Engineer",
    "Data Scientist",
    "Cloud DevOps Architect",
    "Cybersecurity Analyst",
    "Web3/Blockchain Developer"
]

const CategoryCarousel = () => {
   

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
