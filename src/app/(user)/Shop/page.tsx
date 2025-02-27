import { ProductsFilters } from "@/components/Filters/products-filter";
import Breadcrumb from "@/components/ui/breadcrumb";

type Props = {
  searchParams: {
    category?: string;
    price?: string;
    page?: number;
  };
};
export default async function  Products({ searchParams: { category, price, page } }: Props) {
  
 if(price !== undefined ){
    
    const result1 = price.replaceAll('-', ',');
    const result2 = result1.replaceAll('"', "");
    const result3 = result2.split(',');
    const numbers = result3.map((n) => {
      return parseInt(n, 10);
  });
  let min = Math.min(...numbers);
  let max = Math.max(...numbers);
   console.log(min);
   console.log(max);


 }
  return (
    <div>
      <section className="  h-12 py-10  bg-lightkblue dark:bg-gray-900 flex justify-center items-center ">
        <Breadcrumb />
      </section>
      <div className="container">
        <div className="flex lg:pb-20">
          <div className=" flex-shrink-0 pr-20 bg-lightkblue  hidden lg:block w-96 pt-1 px-3   h-full border-r">
            <ProductsFilters/>
          </div>
          <div className="w-full pl-6">
           
            <section className="w-full">
             
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
