import { CategoryFilter } from "@/components/Filters/category-filter";
import { ProductsFilters } from "@/components/Filters/products-filter";
import Breadcrumb from "@/components/ui/breadcrumb";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from '@heroicons/react/24/solid';

export default async function  Courses({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const [categoryData, categoryCount] = await prisma.$transaction([
    prisma.category.findMany({
     where:{
       categoryType: "TUTORIAL",}    
      }),
      prisma.category.count({ 
       where:{
       categoryType: "TUTORIAL",}    
       }),
       
   ]);
   
//  if(price !== undefined ){
    
//     const result1 = price.replaceAll('-', ',');
//     const result2 = result1.replaceAll('"', "");
//     const result3 = result2.split(',');
//     const numbers = result3.map((n) => {
//       return parseInt(n, 10);
//   });
//   let min = Math.min(...numbers);
//   let max = Math.max(...numbers);
//    console.log(min);
//    console.log(max);
// }

const { page, ...queryParams } = searchParams;

const p = page ? parseInt(page) : 1;

// URL PARAMS CONDITION

const query: Prisma.CourseWhereInput = {};
if (queryParams) {
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "category":
          query.categoryId =  value
          break;
        default:
          break;
      }
    }
  }
}
const [courseData, courseCount] = await prisma.$transaction([
  prisma.course.findMany({
    where: query,
  
   take: ITEM_PER_PAGE,
   skip: ITEM_PER_PAGE * (p - 1),
  }),
  prisma.course.count({ where: query }),
]);

  return (
    <div>
      <section className="  h-12 py-10  bg-lightkblue dark:bg-gray-900 flex justify-center items-center ">
         {categoryCount > 0 ? (<>
                      <CategoryFilter data={categoryData} type="TUTORIAL"/>
                    
                    </>) : (
                      <p>
                      Pending</p>
                    )}
         
      </section>           
            <section className="container ">
            {courseData.map((items, i) => (
                            <div key={i} className="md:basis-1/4  lg:basis-1/3">
                            <div className="card flex justify-between w-[1/4]" >
                                <div className='bg-white '>
                                    <div className="px-3">
                                        <h4 className='text-2xl font-bold pt-6 text-black'>{items.name}</h4>
                                        <h4 className='text-2xl font-bold pt-1 text-black'>{items.description}</h4>

                                        <div>
                                            <h3 className='text-base font-normal pt-6 opacity-75'>{items.requirement}</h3>
                                        </div>

                                        <div className="flex justify-between items-center py-6">
                                            <div className="flex gap-4">
                                                <h3 className="text-red text-22xl font-medium">{5}</h3>
                                                <div className="flex">
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                    <StarIcon className="h-5 w-5 text-gold" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-medium">$444</h3>
                                            </div>
                                        </div>

                                        <hr style={{ color: "#C4C4C4" }} />

                                        <div className="flex justify-between pt-6">
                                            <div className="flex gap-4">
                                                {/* <Image src={'/assets/courses/book-open.svg'} alt="users" width={24} height={24} className="inline-block m-auto" /> */}
                                                <h3 className="text-base font-medium text-black opacity-75">{items.name} classes</h3>
                                            </div>
                                            <div className="flex gap-4">
                                                {/* <Image src={'/assets/courses/users.svg'} alt="users" width={24} height={24} className="inline-block m-auto" /> */}
                                                <h3 className="text-base font-medium text-black opacity-75">{items.name} students</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                        ))}  
               </section>
          </div>
  )
}
