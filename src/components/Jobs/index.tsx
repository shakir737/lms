
import { StarIcon } from '@heroicons/react/24/solid';
import SetParams from '../SetParams';


// CAROUSEL SETTINGS
export default async function Jobs ({data, count} : {data?:any, count?:number})  {
        return (
            <div >
                <div className=''>

                    <div className="">
                        <h3 className="flex justify-center items-center text-midnightblue text-4xl lg:text-2xl font-semibold mb-5 sm:mb-0">Available Jobs</h3>
                        
                    </div>
                        {
                         data.map((items:any, i:number) => (
                            <SetParams  value={items.id}>
                            <div key={i} className="md:basis-1/2 lg:basis-1/3 cursor-pointer">
                            <div >

                                <div className='bg-white m-3 px-3 pt-3 pb-2 my-3 shadow-courses rounded-2xl'>
                                    

                                    <div className="px-3">
                                        <div className="flex flex-row gap-2">
                                        <h3 className='text-2xl text-gray-500'>Looking For:
                                        </h3>  
                                     <h4 className='text-2xl font-bold text-black'>{items.name}</h4>
                                        </div>
                                    </div>
                                    <div className="px-3">
                                        <div className="flex flex-row gap-2">
                                        <h3 className='text-2xl text-gray-500'>Specialization:
                                        </h3>  
                                     <h4 className='text-2xl font-bold text-black'>{items.specialization}</h4>
                                        </div>
                                        <div>
                                            <h3 className='text-base font-normal pt-6 opacity-75'>{items.description}</h3>
                                        </div>

                                        <div className="flex justify-between items-center py-6">
                                            <div className="flex gap-4">
                                                <h3 className="text-red text-2xl font-medium">{new Intl.DateTimeFormat("en-US").format(items.endDate)}</h3>
                                                <div className="flex">
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-medium">Negotiable</h3>
                                            </div>
                                        </div>

                                        <hr style={{ color: "#C4C4C4" }} />

                                       
                                    </div>
                                </div>
                            </div>
                            </div>
                            </SetParams>
                        ) ) }
                        </div>  
                        
                </div>
                
        );
    }

