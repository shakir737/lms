import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Category, Job, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";


type JobList = Job & { category: Category };

const SubjectListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {


  const columns = [
    {
      header: "Job Name",
      accessor: "name",
    },
    {
      header: "Category Name",
      accessor: "name",
      className: "hidden md:table-cell ml-2",
    },
    {
      header: "Specialization",
      accessor: "specialization",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: JobList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-2 p-3">{item.name}</td>
      <td className="hidden md:table-cell">
       {item.category.name}
      </td>
      <td className="hidden md:table-cell">
       {item.specialization}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {"admin" === "admin" && (
            <>
              <Link href={`/list/jobs/${item.id}`}>
             <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
               <Image src="/view.png" alt="" width={16} height={16} />
             </button>
           </Link>
           
              <FormContainer table="job" type="update" data={item} />
              <FormContainer table="job" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.JobWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

   const [data, count] = await prisma.$transaction([
     prisma.job.findMany({
       where: query,
       include: {
        category: true
       },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
     }),
     prisma.job.count({ where: query }),
   ]);
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Jobs</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
           
              <FormContainer table="job" type="create" />
           
          </div>
        </div>
      </div>
      {
        count > 0 ? (
          <>
           {/* LIST */}
       <Table columns={columns} renderRow={renderRow} data={data} /> 
      {/* PAGINATION */}
       <Pagination page={p} count={count} /> 
          </>
        ) : (
          <p>Empty Records</p>
        )
      }
    </div>
  );
};

export default SubjectListPage;
