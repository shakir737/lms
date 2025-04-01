"use client";
import { GlobeIcon, SmartphoneIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import ProductDetail from "./productDetail";
import ProductDetailsTab from "./productTab"
type Props = {
  product: Product;
  user: any;
  review:any;
};
const SingleProduct = ({ product, user, review }: Props) => {
  
  
  return (
    <div className="py-5 ">
   
      <div className="flex flex-col space-y-5 xl:flex-row px-5  md:ml-10 md:pl-10 gap-10 xl:space-x-6 container py-8">
      
        <div className="w-full xl:w-[30%] flex md:justify-end ">
          <div className="flex  space-y-5 bg-gray-100 dark:bg-background flex-col py-4 sm:px-4 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 py-4 px-4 w-full flex gap-4 justify-end ">
              <div className="max-w-[200px] w-full h-full">
                <img
                  src={product?.imageUrl as string}
                  alt={product?.title as string}
                  width={150}
                  height={140}
                  className="rounded-full "
                />
              </div>
              {/* <div>
                <h1 className="text-primary text-lg font-semibold">
                  {product?.title}
                </h1>
              </div> */}
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-sm text-gray-400">{product?.description}</p>
              <span className=" w-full border-dotted border-t-2 mt-4" />
              <div className="">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <SmartphoneIcon className="w-4 text-primary" />
                  <p className="text-base text-gray-900 dark:text-white font-medium">
                    Contact:
                  </p>
                </span>
                <p>{product?.productCode}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="flex items-center gap-1 sm:gap-2">
                  <GlobeIcon className="w-4 text-primary" />
                  <p className="text-xs sm:text-base text-gray-900 dark:text-white font-medium">
                    Website:
                  </p>
                </span>
                <p className="text-xs sm:text-base">
                  {product?.barcode}
                </p>
              </div>
              </div>
            </div>

            
          </div>
        </div>
        <div className="w-full xl:w-[75%] overflow-hidden ">
          <ProductDetail product={product} />
        </div>
      </div>
       <div className="container">
        <ProductDetailsTab  product={product} user={user} review={review} />
      </div> 
    </div>
  );
};

export default SingleProduct;
