"use client"
import React from 'react'
import { useRouter } from "next/navigation";

const SetParams = ({
    children,
    value
  }: {
    children: React.ReactNode,
    value: string
  }) => {
    const router = useRouter();
    const setParams = ( value: string ) => {
        const params = new URLSearchParams(window.location.search);
        params.set("id", value.toString());
        router.push(`${window.location.pathname}?${params}`);

    }
  return (
    <div onClick={() => setParams(value)} className='cursor-pointer'>
      {children}
    </div>
  )
}

export default SetParams
