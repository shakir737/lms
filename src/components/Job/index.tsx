
import { StarIcon } from '@heroicons/react/24/solid';
import { Button } from '../ui/button';
import DialogComponent from '../Dialog';
import FormContainer from '../FormContainer';

// CAROUSEL SETTINGS
export default async function Job ({data, count, user} : {data?:any, count?:number, user:any})  {
 const jobId = data[0].id;

        return (
            <div className="">
                <div className=''>


                         {/* {postData.map((items, i) => (*/}
                            <div className="md:basis-1/2 lg:basis-1/3">
                            <div >

                                <div className='bg-white m-1 px-1 pt-3 pb-2 my-2 shadow-courses rounded-2xl'>
                                    <div className="px-3">
                                        <div className='flex justify-between'>
                                           <h4 className='text-2xl font-bold pt-6 text-black'>{data[0].name}</h4>
                                           {/* <div className="cursor-pointer flex justify-center gap-1 text-lg font-medium ml-2 py-3 px-10 transition duration-150 ease-in-out rounded-full hover:bg-semiblueviolet hover:text-white bg-Blueviolet" > */}
                                           <FormContainer table="registration" type="create" user={user} jobId={jobId} />
                                           {/* </div> */}
                                        </div>

                                        <h4 className='text-xl font-bold pt-1 text-black'>{data[0].specialization}</h4>

                                        <div>
                                            <h3 className='text-base font-normal pt-6 opacity-75'>{data[0].description}</h3>
                                        </div>

                                        <div className="flex justify-between items-center py-6">
                                            <div className="flex gap-4">
                                                <h3 className="text-red text-22xl font-medium">{new Intl.DateTimeFormat("en-US").format(data[0].endDate)}</h3>
                                                <div className="flex">
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-medium">$ 45 - 55/ Per Hour</h3>
                                            </div>
                                        </div>

                                        <hr style={{ color: "#C4C4C4" }} />


                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>

                </div>
        );
    }

