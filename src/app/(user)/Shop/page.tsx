import { ProductsFilters } from "@/components/Filters/products-filter";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/ui/breadcrumb";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Pagination from "@/components/Pagination";
type Props = {
  searchParams: {
    category?: string;
    price?: string;
    page?: number;
    courseCategory?: string;
  };
};
export default async function  Products({  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };}) {
  
 if(searchParams.price !== undefined ){
    
     const result1 = searchParams.price.replaceAll('-', ',');
     const result2 = result1.replaceAll('"', "");
     const result3 = result2.split(',');
     const numbers = result3.map((n) => {
       return parseInt(n, 10);
   });
   let min = Math.min(...numbers);
   let max = Math.max(...numbers);
  }
//    console.log(min);
//    console.log(max);
 const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.ProductWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
      
          case "courseCategory":
            query.courseCategoryId = value;
            break;
          case "category":
            query.categoryId = value;
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.product.findMany({
      where: query,
      include: {user: true, category: true},
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.product.count({ where: query }),

  ]);
  const [categoryData, categoryCount] = await prisma.$transaction([
    prisma.category.findMany({
     where:{
       categoryType: "ECOMERSE",}    
      }),
      prisma.category.count({ 
       where:{
       categoryType: "ECOMERSE",}    
       }),
   ]);
   const [courseCategory, courseCategoryCount] = await prisma.$transaction([
    prisma.category.findMany({
     where:{
       categoryType: "TUTORIAL",}    
      }),
      prisma.category.count({ 
       where:{
       categoryType: "TUTORIAL",}    
       }),
   ]);
  return (
    <div>
      <section className="  h-12 py-10  bg-lightkblue dark:bg-gray-900 flex justify-center items-center ">
        <Breadcrumb />
      </section>
      <div className="">
        <div className="flex flex-row w-[100%] gap-5">
          <div className="bg-lightkblue  hidden lg:block w-[20%] pt-1 px-3   h-full border-r">
            <ProductsFilters data={categoryData} courseCategory={courseCategory} courseCategoryCount={courseCategoryCount} />
          </div>
          <div className="w-[80%] px-5">
           
            <section className="w-full flex-row">
              <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-7 pt-5">
              {data?.map((product) => (
                       <div className="">
                        <ProductCard key={product.slug} {...{ product }} />
                       </div>
                     
                     ))}
              </div>
           
            </section>
            <Pagination page={p} count={count} />
          </div>
        </div>
      
      </div>
    </div>
  )
}
