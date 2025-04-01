

import { EyeIcon, HeartIcon, RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import StarIcon from "./star-icon";
interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
 
  return (
    <div className=" flex border px-7 flex-row md:gap-5 w-full rounded-md transition-all duration-300 shadow-card hover:shadow-cardHover h-full">
      <Card className="bg-bgCard dark:bg-gray-900 border-none shadow-sm rounded-md w-full h-full group flex flex-col px-4 py-5">
        <div className="w-full min-h-[150px] flex items-center relative justify-center overflow-hidden px-4">
         <div className="w-[150px] h-[170px]">
         <Link href={`/Shop/${product.id}`}>
            <img
              className="object-center group-hover:scale-110 transition-all duration-700 "
              src={product.imageUrl as string}
              alt={product.title}
            
            /> 
          </Link>
         </div>
           
          <div className="absolute -bottom-12 bg-white dark:bg-black/80 dark:shadow-sm dark:shadow-gray-200 rounded-lg group-hover:bottom-5 transition-all duration-500 py-2 px-4 z-[100] flex items-center space-x-2">
            <button
            //   onClick={() => globalModal.setQuickViewState(true, product)}
            >
              <EyeIcon className="w-5 h-5 text-blue" />
              <span className="sr-only">Quick View</span>
            </button>
            <span className="border-l-2 h-full" />
            <button>
              <RefreshCwIcon className="w-5 h-5 text-blue" />
              <span className="sr-only">Compare</span>
            </button>
            <div className="border border-l-2 h-full"></div>

            <button>
              <HeartIcon className="w-5 h-5 text-blue" />
              <span className="sr-only">Wishlish</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-5 py-1">
          <Link
            className="text-lg sm:text-base font-semibold text-gray-700 dark:text-white w-full line-clamp-1 text-ellipsis"
            href={`/Shop/${product?.id}`}
          >
            <div className="text-lg text-slategray">
            {product.title}
            </div>
           
          </Link>
          <div className="text-lg text-slategray  ">
            {product.description}
          </div>
          {product.unit ? (
            <p className="text-lg font-semibold text-slategray">{product.unit}</p>
          ) : (
            <p className="text-lg text-slategray">1(items)</p>
          )}

          <div className="flex gap-3 items-center">
            <p className="text-slategray font-semibold text-xs xs:text-lg md:text-base">
              {product.salePrice}$
            </p>
          </div>
          <div className="mx-1 text-xs font-semibold md:text-lg text-slategray ">
                {product.courseCategoryId}
              </div>
      
        </div>

        <div className="flex items-center">
          <div className="flex -mx-0.5 ">
            {[...Array(5)].map((_, idx) => (
              <StarIcon
                key={idx}
                color={idx < 3 ? "#F3B81F" : "slategray"}
                className="w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5"
              />
            ))}
          </div>
          <p className="text-sm ml-3">
            {product.productStock  ? "In-Stock" : "Out of Stock"}
          </p>
        </div>

        <Button
          variant={"secondary"}
          className="mt-4 rounded-full"
        //   onClick={addToCart}
        >
          <p className="sm:hidden">Add</p>
          <p className="hidden sm:block">Add to Cart</p>
        </Button>
        {product.salePrice ? (
          <div className="bg-primary p-1 absolute top-3 right-3 rounded-lg">
            <p className="text-xs text-white">
              {/* {calculateDiscountPercentage({
                originalPrice: product.price,
                salePrice: product.sale_price,
              })}{" "} */}
              %
            </p>
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default ProductCard;
