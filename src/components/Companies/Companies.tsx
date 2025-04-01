
import Image from "next/image";
import React, { Component } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";

// IMAGES DATA FOR CAROUSEL
interface Data {
    imgSrc: string;
}

const data: Data[] = [
    {
        imgSrc: "/assets/carousel/airbnb.svg"
    },
    {
        imgSrc: "/assets/carousel/fedex.svg"
    },
    {
        imgSrc: "/assets/carousel/google.svg"
    },
    {
        imgSrc: "/assets/carousel/hubspot.svg"
    },
    {
        imgSrc: "/assets/carousel/microsoft.svg"
    },
    {
        imgSrc: "/assets/carousel/walmart.svg"
    },
    {
        imgSrc: "/assets/carousel/airbnb.svg"
    },
    {
        imgSrc: "/assets/carousel/fedex.svg"
    }
]


// CAROUSEL SETTINGS
export default async function Companies ()  {
   

        return (

            <div className='text-center my-20'>
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-midnightblue text-2xl font-semibold">Trusted by companies of all sizes</h2>
                    <div className="py-14">
                    <Carousel
        opts={{
          align: "start",
          
        }} 
        autoplay={600}
    
        className=""
      >
        <CarouselContent> 
                            {data.map((item, i) =>
                                  <CarouselItem key={i} className="md:basis-1/5 lg:basis-1/5">
                                <div>
                                    <Image src={item.imgSrc} alt={item.imgSrc} width={116} height={36} />
                                </div>
                                </CarouselItem>
                            )}
                        </CarouselContent>  
                       
                    </Carousel>
                    </div>
                    <hr />
                </div>
            </div>

        )
    }

