
import { CategoryFilter } from "@/components/Filters/category-filter";
import { ProductsFilters } from "@/components/Filters/products-filter";
import Job from "@/components/Job";
import Jobs from "@/components/Jobs";

import Breadcrumb from "@/components/ui/breadcrumb";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import { getServerSession } from 'next-auth/next';
import { auth } from '@/auth';

export default async function  Products({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {

  const session = await getServerSession(auth);
  const user:any = session?.user;
  const {id} = searchParams;
 
 const [categoryData, categoryCount] = await prisma.$transaction([
 prisma.category.findMany({
  where:{
    categoryType: "JOB",}    
   }),
   prisma.category.count({ 
    where:{
    categoryType: "JOB",}    
    }),
]);

const { page, ...queryParams } = searchParams;

const p = page ? parseInt(page) : 1;

// URL PARAMS CONDITION

const query1: Prisma.JobWhereInput = {};
const query2: Prisma.JobWhereInput = {};

if (queryParams) {
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "category":
          query1.categoryId =  value
          break;
        default:
          break;
      }
    }
  }
}

if (queryParams) {
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "id":
          query2.id = value;
          break;
        default:
          break;
      }
    }
  }
}
 const [jobsData, jobsCount] = await prisma.$transaction([
   prisma.job.findMany({
     where: query1,
   
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (p - 1),
   }),
   prisma.job.count({ where: query1 }),
 ]);
 

 const [jobData, jobCount] = await prisma.$transaction([
   prisma.job.findMany({
     where: query2,
   }),
   prisma.job.count({ where: query2 }),
 ]);
 

  return (
    <div>
      <section className=" h-12 py-10  bg-lightkblue dark:bg-gray-900 flex justify-center items-center ">
      
        {categoryCount > 0 ? (<>
              <CategoryFilter data={categoryData} type="JOBS"/>
            
            </>) : (
              <p>
              Pending</p>
            )}
      </section>
      
      <div className="">
        <div className="hidden md:flex md:flex-between md:w-full">
          <div className="w-[50%] border-[#c4c4c4] overflow-y-auto h-[600px]">
            { jobsCount > 0 ? ( <>
          <Jobs data={jobsData} count={jobsCount}/>
          </>) : (<>
          <p>Loading</p></>)}
         </div>
          <div className="w-[50%] overflow-y-auto h-[600px]" >
            <Job data={jobData} count={jobCount} user={user} /> 
            
          </div>
        </div>
        <div className={`md:hidden ${id == undefined ? "" : "hidden"}  md:flex md:flex-between md:w-full`}>
          <div className="w-full border-[#c4c4c4] overflow-y-auto h-[600px]">
            { jobsCount > 0 ? ( <>
          <Jobs data={jobsData} count={jobsCount}/>
          </>) : (<>
          <p>Loading</p></>)}
         </div>
         
        </div>
        <div className={` md:hidden ${ id == undefined ? "hidden" : ""} md:w-[50%] overflow-y-auto h-[600px] `} >
            <Job data={jobData} count={jobCount} user={user} /> 
            
          </div>
      </div>
    </div>
  )
}
