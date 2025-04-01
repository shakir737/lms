
import { Disclosure } from '@headlessui/react';
import Signdialog from "./Signdialog";
import Image from 'next/image';
import Navigation from './Navigation';
import DrawerComponent from './DrawerComponent';
import { getServerSession } from 'next-auth/next';
import { auth } from '@/auth';
const Navbar =  async () => {
    const session = await getServerSession(auth);
    const user:any = session?.user;
    return (
        <Disclosure as="nav" className="navbar bg-lightkblue ">
            <>
                <div className="md:ml-10 ms:mr-10">
                    <div className="flex h-12 md:h-20 items-center justify-between">
                        <div className="flex flex-1 sm:justify-start">

                            {/* LOGO */}

                            <div className="flex justify-between ">
                               <Image  src={'/assets/logo/logo.png'} alt="logo" height={45} width={40}/>
                              <div className='font-bold flex justify-center sm:text-small md:text-medium lg:text-xl items-center text-[#1c03fc]'>
                              <p>E Learning Plateform</p>
                                </div>
                            </div>   

                            {/* LINKS */} 

                           <Navigation />
                        </div>

                        {/* SIGNIN DIALOG */}

                        <Signdialog user={user}/>


                        {/* REGISTER DIALOG */}

                        {/* <Registerdialog /> */}


                        {/* DRAWER FOR MOBILE VIEW */}

                        {/* DRAWER ICON */}

                        <DrawerComponent />
                    </div>
                </div>
            </>
         <hr className='text-white'/>
        </Disclosure>
    );
};

export default Navbar;
