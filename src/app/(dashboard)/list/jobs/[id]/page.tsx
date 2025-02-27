import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { Job, Registration, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type RegistrationList = Registration & {user: {id: string, name: string} , job: {id:string, name: string}} 
const JobApplication  = async ({
  params: { id },
}: {
  params: { id: string };
}) => {

  const columns = [
    {
      header: "User Name",
      accessor: "name",
    },
    {
      header: "Job Name",
      accessor: "jobName",
      className: "hidden md:table-cell ml-2",
    },
    {
      header: "Application Date",
      accessor: "appliedDate",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];
  const renderRow = (item: RegistrationList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="gap-2 p-3">{item.user.name}</td>
      <td className="gap-2 p-3">{item.job.name}</td>
      <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.AppliedDate)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {"admin" === "admin" && (
            <>
              <Link href={`/list/registeredUser/${item.user.id}`}>
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

  const [data, count] = await prisma.$transaction([
    prisma.registration.findMany({
      where: { jobId: id 
      },
      include:{
        user: true , job: true },  
    }),
    prisma.registration.count({where: { jobId: id }}),
  ])
 
  
  if (!data) {
    return notFound();
  }
  return (
    <>
    { data.map((RegisteredUser) => (
      <div key={RegisteredUser.jobId} className=" text-black">
      <div className="flex p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={"/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                job Name
                </h1>
            
                  <FormContainer table="job" type="update" data={RegisteredUser} />
              
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
               
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>
                    {new Intl.DateTimeFormat("en-GB").format(RegisteredUser.AppliedDate)}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>job Name</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>job name</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {/* {teacher._count.subjects} */}
                </h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {/* {teacher._count.lessons} */}
                </h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {/* {teacher._count.classes} */}
                </h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
       
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
           <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/list/classes?supervisorId=${RegisteredUser.id}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaPurpleLight"
              href={`/list/students?teacherId=${RegisteredUser.id}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaYellowLight"
              href={`/list/lessons?teacherId=${RegisteredUser.id}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?teacherId=${RegisteredUser.id}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/list/assignments?teacherId=${RegisteredUser.id}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        
      </div>
       {/* BOTTOM */}
      
    </div>
    <div className="m-4 bg-white rounded-md p-4 h-[800px]">
       <div className="flex items-center justify-center font-bold">
        <h1 className="hidden md:block text-xl">Users List Who Applied Against This Job</h1>
        </div>
       <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-center gap-10">
        <h1 className="hidden md:block text-lg font-semibold">Users List</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          
        </div>
      </div>
      
      </div>
      {
        count > 0 ? (
          <>
           {/* LIST */}
       <Table columns={columns} renderRow={renderRow} data={data} /> 
      {/* PAGINATION */}
       <Pagination page={1} count={count} /> 
          </>
        ) : (
          <p>Empty Records</p>
        )
      }
    </div>
    </div>
    ))}
    </>
 
  );
};

export default JobApplication;
