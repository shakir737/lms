import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import React, { Component } from "react";
import Image from "next/image";

// CAROUSEL DATA

interface DataType {
    profession: string;
    name: string;
    imgSrc: string;
}

const postData: DataType[] = [
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/assets/mentor/user3.png',
    },
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/assets/mentor/user2.png',
    },
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/assets/mentor/user1.png',
    },
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/assets/mentor/user3.png',
    },
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/assets/mentor/user2.png',
    },
    {
        profession: 'Senior UX Designer',
        name: 'Shoo Thar Mien',
        imgSrc: '/assets/mentor/user1.png',
    },
]

// CAROUSEL SETTINGS
export default async function Mentor () {


        return (
            <div className="py-10 sm:py-24 bg-paleblue" id="mentor">

                <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 px-4 lg:px-8 relative'>
                    <h2 className="lh-82 flex justify-center text-midnightblue text-4xl md:text-55xl text-center md:text-start font-semibold">Meet with our  mentor.</h2>
                    <Carousel
        opts={{
          align: "start",
        }}
        className=""
        autoplay={2000}
      >
        <CarouselContent>  
                   
                        {postData.map((items, i) => (
                            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
   <div>
                                <div className='m-3 py-14 md:my-10 text-center'>
                                    <div className="relative">
                                        <Image src={items.imgSrc} alt="user-image" width={306} height={0} className="inline-block m-auto" />
                                        <div className="absolute right-[84px] bottom-[102px] bg-white rounded-full p-4">
                                            <Image src={'/assets/mentor/linkedin.svg'} alt="linkedin-image" width={25} height={24} />
                                        </div>
                                    </div>
                                    <div className="-mt-10">
                                        <h3 className='text-2xl font-semibold text-lightblack'>{items.name}</h3>
                                        <h4 className='text-lg font-normal text-lightblack pt-2 opacity-50'>{items.profession}</h4>
                                    </div>
                                </div>
                            </div>
                            </CarouselItem>
                        ))}
                   
                   </CarouselContent>  
                       
                    </Carousel>
                </div>
            </div>

        );
    }

