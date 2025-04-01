"use client"

import StarIcon from "@/components/star-icon";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Product } from "@prisma/client";
import { HeartIcon, RefreshCwIcon } from "lucide-react";
import Image from "next/image";



type Props = {
  product: Product;
};
const ProductDetail = ({ product }: Props) => { 

  
  return (
    <div className="mt-4 flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/2 product-gallery ">
        {!!product?.imageUrl ? (
         <></>
        ) : (
          <div className="flex items-center justify-center w-auto">
            <Image
              src={product?.imageUrl as string}
              alt={product?.title}
              width={450}
              height={390}
            />
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 flex flex-col  space-y-4 relative ">
        <div className="flex flex-col space-y-3 justify-center">
          <div className="flex flex-col gap-2 md:justify-center ">
            <h2 className="text-xl font-medium text-gray-800 dark:text-white">
              {product?.title}
            </h2>
            {product?.unit ? (
              <div className="text-sm font-medium md:text-15px hidden md:block">
                {product?.unit}
              </div>
            ) : (
              // <VariationPrice
              //   selectedVariation={selectedVariation}
              //   minPrice={product?.min_price}
              //   maxPrice={product?.max_price}
              // />
              <></>
            )}
        
              <div className="flex flex-col items-start md:flex-row  md:justify-between ">
                <div className="flex items-center ">
                  <div className="text-primary font-bold text-base md:text-xl xl:text-[22px]">
                    {product?.salePrice}
                  </div>
                 
                
                </div>

                <div className="flex items-center mt-2 md:px-3">
                  <div className="flex md:-mx-0.5 ">
                    {[...Array(5)].map((_, idx) => (
                      <StarIcon
                        key={idx}
                        color={idx < 4 ? "#F3B81F" : "#DFE6ED"}
                        className="w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5"
                      />
                    ))}
                    <p className="text-[#F3B81F] ml-3 text-sm">
                      {product?.id} Reveiws
                    </p>
                  </div>
                </div>
              </div>
          
          </div>
          <span className="border-t border-dashed w-full" />

          <div className="">
            <h3 className="text-xl text-gray-800 dark:text-white font-medium">
              Product Details:
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-200">
              {product?.description}
            </p>
          </div>
          <span className="border-t border-dashed w-full" />
        </div>
        <div className="">
      
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-4">
            {/* <Counter
              variant="single"
              value={selectedQuantity}
              onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
              }
             
            /> */}

            <button>
              <RefreshCwIcon className="w-5 h-5" />
              <span className="sr-only">Compare</span>
            </button>

            <button>
              <HeartIcon className="w-5 h-5" />
              <span className="sr-only">Wishlish</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Button
             variant={"secondary"}
              className="  flex items-center gap-3 w-full"
              
            >
              <Icons.cart className="ml-3 w-4 animate-pulse duration-600 transition " />
              <p>Add_TO_CART</p>
            </Button>
            <Button
              variant={"outline"}
              className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition duration-300 ease-in-out"
            >
              Buy Now
            </Button>
          </div>
        </div>
        <div
className={""}
>
<div>
  <h6 className="font-[calc(13px + 1 * (100vw - 320px) / 1600)] font-normal mb-2">
    Please hurry! Only{" "}
  
    left in stock
  </h6>

</div>
</div>

        <div className="py-4 border-t border-dashed w-full">
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
