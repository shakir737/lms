"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { signOut } from "next-auth/react";
import LoginForm from '../forms/LoginForm'
import SignupForm from '../forms/SignupForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GanttChart, Heart, LayoutDashboard, ShoppingCart } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { Button } from '../ui/button';
interface Props {
    user?: {
        name?: string,
        role?: string
    };
   }
const Signin = ({user}: Props) => {
   
    let [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }
    const handleLogout = async () => {
        await signOut();
        router.push("/");
      };
    return (
        <>
            <div className="absolute hidden lg:block sm:static sm:inset-auto sm:pr-0 mr-9">
                {
                    user ? (
                        <div className="flex justify-between cursor-pointer items-center justify-center gap-4 text-lg font-medium ml-9 py-5 px-16 transition duration-150 ease-in-out rounded-full ">
                        <Link href="/wishlist">
                         <Heart size={20} />
                        </Link>
                        <Link href="/addtocart">
                       <ShoppingCart size={20} />
                        </Link>
                        <Popover>
                        <PopoverTrigger asChild>
                          <Avatar>
                            <AvatarImage src={""} alt={user?.name} />
                            <AvatarFallback>
                              {user?.name?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-60">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">{user?.name}</h4>
                              <p className="text-sm text-muted-foreground">{user?.role}</p>
                              <Separator className="my-4" /> 
                              <Link href="/admin" className="flex items-center gap-2">
                                <LayoutDashboard size={20} /> <span>Dashboard</span>
                              </Link>
                              <Separator className="my-4" />
            
                              <div>
                             <button
                                     onClick={handleLogout}
                                     className="cursor-pointer border-none outline-none flex items-center gap-2"
                                    >Sign out</button>
                               </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      </div>
                    ) : (
                        
                        <Button type="button" className="text-lg font-medium ml-9 py-5 px-16 transition duration-150 ease-in-out rounded-full hover:bg-semiblueviolet hover:text-white bg-Blueviolet" onClick={openModal}>
                            Log In
                        </Button>
                   
                    )
                }
              
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-5" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 ">
                        <div className="flex min-h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                                 <Tabs defaultValue="Login" className="w-[400px]">
                                    <TabsList className="flex justify-center">
                                      <TabsTrigger value="Login">Login</TabsTrigger>
                                      <TabsTrigger value="Signup">Sign up</TabsTrigger>
                                   </TabsList>
                                  <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                  <TabsContent value="Login"><LoginForm /></TabsContent>
                                  <TabsContent value="Signup"><SignupForm /></TabsContent>
                                  </div>
                                </Tabs>                                  
                                       <div className="mt-1 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Signin;
