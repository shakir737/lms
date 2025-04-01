import { CategoryFilter } from "@/components/Filters/category-filter";
import { ProductsFilters } from "@/components/Filters/products-filter";
import Breadcrumb from "@/components/ui/breadcrumb";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from '@heroicons/react/24/solid';
import SetParams from "@/components/SetParams";
import Pagination from "@/components/Pagination";

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
      <Breadcrumb />
         
      </section>     
      <div>
      <div className="flex flex-row w-[100%] gap-5">
      <div className="bg-lightkblue  hidden lg:block w-[20%] pt-1 px-1   h-full border-r">
           {
            categoryCount > 0 && (
              <ProductsFilters data={categoryData}  />
            )
           }
            
      </div>
      <div className="w-[80%] px-5">
      <section className="w-full mt-5">
            {courseData.map((items, i) => (
                            <div key={i} className="px-3 md:px-5 py-3 ">
                                <Link  href={`/Courses/${items.id}`}>
                                <div className="" >
                                <div className='bg-white '>
                                    <div className="w-full gap-7">
                                      <div className="flex flex-col w-full sm:pl-5 sm:ml-5 sm:mr-5 sm:pr-5 md:pl-10 md:ml-10 md:pr-10 md:mr-10">
                                       
                                           <div className='text-xl font-normal flex flex-col gap-2 md:gap-5  text-slategray'>
                                            <div className="flex flex-col md:flex-row gap-10">
                                             <div className="flex justify-between gap-5 ">
                                              <p>
                                              Course:
                                              </p>
                                            <h4 className='lg:text-xl md:text-xl sm:text-lg font-bold text-gray-100'>
                                             {items.name} Course</h4>
                                             </div>
                                             <div className="">
                                             <h3 className="text-red text-2xl flex justify-between font-medium md:ml-10 md:pl-10 gap-5"><p>Last Date:</p>{new Intl.DateTimeFormat("en-US").format(items.endDate)}</h3>
                                             </div>
                                             <div className='text-xl font-normal text-slategray flex justify-between gap-10 md:pl-7 md:ml-7'>
                                            <p>Seats: </p>   <h4 className=' md:text-xl sm:text-lg font-bold text-gray-600'>{60}/250</h4></div>
                                            </div>
                                             
                                           </div>
                                           <div className='text-xl font-normal flex flex-col md:flex-row gap-5  text-slategray'>
                                            <div className="hidden md:flex md:justify-between gap-10">
                                              <div className="flex justify-between gap-5">
                                                <p> Requirements: </p>
                                              <h4 className='lg:text-xl md:text-xl sm:text-lg font-bold text-gray-700'>
                                              {items.requirement}</h4>
                                              </div>
                                              <div className='text-xl font-normal gap-5  text-slategray flex justify-between gap-5'><p>Instructor: </p> <h4 className='md:text-xl sm:text-lg font-bold text-gray-600'>Stive Hawklin</h4></div>
                                              <div className='text-xl font-normal flex justify-start gap-5  text-slategray'>Availability:  <h4 className='md:text-xl sm:text-lg font-bold text-gray-600'>Live Sessions & Chat </h4></div>
                                            </div>
                                            
                                            </div>
                                        <div className="">
                                            <h3 className='text-lightgray text-[18px] font-normal pt-2'>{items.description}</h3>
                                        </div>
                                        <div className="flex justify-between items-center py-6">
                                            <div className="flex gap-4">
                                               
                                            <div className="flex -mx-0.5 ">
                                             {[...Array(5)].map((_, idx) => (
                                                 <StarIcon
                                                   key={idx}
                                                   color={idx < 3 ? "#F3B81F" : "slategray"}
                                                   className="w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5"
                                                    />
                                                 ))}
                                           </div>
                                               
                                          </div>
                                           
                                        </div>
                                     </div>
                                    </div>
                                </div>
                                </div>
                                </Link>
                                <hr />
                            </div>
                        ))}  
               </section>
               <Pagination page={p} count={courseCount} />
      </div>
      </div>
      </div>      
          
          </div>
  )
}
