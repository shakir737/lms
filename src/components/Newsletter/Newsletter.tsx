import Image from "next/image";
import InputField from "../InputField";

const Newsletter = async () => {
    return (
        <>
            {/* <div className="mx-auto max-w-2xl md:max-w-7xl sm:rounded-3xl testimonialbg"> */}
            <div className="w-full px-5  sm:rounded-3xl">
                <div className="">

                    <div className="py-4 bg-imagee">
                        <div className="mb-10 mt-24 lg:mx-64 lg:my-24">
                            <h3 className="text-4xl text-center font-semibold text-white mb-3">Newsletter.</h3>
                            <h3 className="text-semibold md:text-xl font-normal opacity-75 text-white text-center mb-8">
                                Subscrible our newsletter for discounts, promo and many more.
                            </h3>
                        <div className="flex justify-center items-center">

                        <div className="relative text-white rounded-full md:w-[60%] flex justify-between">
                                    <input type="Email address" className=" w-full px-3 py-4 text-black rounded-full " placeholder="Enter your email address" autoComplete="off" />
                                    <div className="absolute right-0 mt-1 mr-1">
                                        <button type="submit" className="bg-ultramarine rounded-full py-2 px-3 ">
                                            <Image src={'/assets/newsletter/send.svg'} alt="send-icon" width={32} height={30} />
                                        </button>
                                    </div>
                                </div>
                          
                        </div>
                              
                         
                           
                        </div>
                    </div>

                </div>
            </div>
        </>


    )
}

export default Newsletter;