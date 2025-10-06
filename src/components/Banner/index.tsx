
import TextTransition from '@/app/Texttransition';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Video } from 'lucide-react';


export default async function Banner  ()  {

    return (
        <div id="home-section" className='bg-lightkblue'>
            <div className="  pt-10 sm:pb-24 ">

                <div className='flex flex-col lg:flex-row md:ml-14 pt-4 gap-15'>

                    <div className='col-span-6 flex flex-col justify-evenly gap-10'>
                        <div className='flex gap-2 mx-auto lg:mx-0'>
                            
                            <Image src="/assets/banner/check.svg" alt="check-image" width={20} height={20} />
                            
                           
                            <h3 className='text-kellygreen text-sm font-semibold text-center lg:text-start'>Get 30% off on first enroll</h3>
                        </div>
                        <TextTransition>
                        <h1 className='text-midnightblue text-4xl sm:text-5xl font-semibold text-center lg:text-start lh-120 pt-5 lg:pt-0'>Make your skills to the next level with us that apeal the audience.</h1>
                        <h3 className='text-charcoal text-2xl font-normal mt-4 text-center lg:text-start opacity-75 pt-5 lg:pt-0'>Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class universities and companies.</h3>
                                </TextTransition>
                                <TextTransition>
                        <div className='flex flex-col md:flex-row gap-2 text-charcoal text-lg font-normal opacity-75 pt-5 lg:pt-0'>
                            <div className='flex flex-row gap-1 ml-2'>
                               
                                <Image src="/assets/banner/check-circle.svg" alt="check-image" width={30} height={30}  className='smallImage'/>
                               
                                <div className='text-sm md:text-lg md:font-normal text-black md:pr-7'>
                                <p >Well Educated Teaching Staff</p>
                                </div>
                               
                            </div>
                            <div  className=' flex gap-2 rounded-2xl p-1 ml-2 flex-row'>
                                <Image src="/assets/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage'/>
                                <p className='text-sm sm:text-lg md:font-normal text-black md:pr-7'>24 Hours A Day & 7 Days of Week</p>
                            </div>
                            <div  className='flex gap-2 rounded-2xl p-1 flex-row ml-2'>
                                <Image src="/assets/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage'/>
                                <p  className='text-sm sm:text-lg md:font-normal text-black md:pr-7'>Live Video Sessions With Instructors</p>
                            </div>
                          
                       </div>
                       <div className="flex justify-center items-center gap-7 mt-5 md:mt-10">
                                <Button variant={"secondary"}><p className="px-3 py-4 text-lg">Join For Free</p></Button>
                                <Button variant={"secondary"} >  <p className='text-lg py-4 px-3'> Book A Live Demo Class</p></Button>
                            </div>
                       </TextTransition>

                       
                    </div>
                   
                   <div className='bg-paleblue rounded-3xl md:ml-10 md:mr-20'>
                     <div className='relative flex justify-evenly font-sm'>
                        
                        <Image src="/assets/banner/mahila.png" alt="nothing" width={1000} height={805} />
                       
                       
                       <TextTransition>
                       <div className='absolute  flex flex-col lg:pt-4 lg:pl-3 space-y-1 md:space-y-3 right-0 mr-0 md:mr-10 pl-5'>
                            <div className='ml-14 flex flex-row bg-white rounded-2xl p-1 gap-0 md:gap-1'>
                               
                                <Image src="/assets/banner/check-circle.svg" alt="check-image" width={30} height={30}  className='smallImage'/>
                               
                                <div className='text-sm md:text-lg md:font-normal text-black pr-6'>
                                <p >Creativity</p>
                                </div>
                               
                            </div>
                            <div  className='ml-14 flex flex-row bg-white rounded-2xl p-1 gap-0 md:gap-1 items-center'>
                                <Image src="/assets/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage'/>
                                <p className='text-sm sm:text-lg font-normal text-black pr-6'>Flexibility</p>
                            </div>
                            <div  className='ml-14 flex gap-0 md:gap-1 bg-white rounded-2xl p-1 flex-row'>
                                <Image src="/assets/banner/check-circle.svg" alt="check-image" width={30} height={30} className='smallImage'/>
                                <p className='text-sm sm:text-lg font-normal text-black pr-1'>Accessbility</p>
                            </div>
                       </div>
                       </TextTransition>
                       
                 
                      
                    </div>
                </div>
                   
                    
                    
                </div>
            </div>
        </div>
    )
}


