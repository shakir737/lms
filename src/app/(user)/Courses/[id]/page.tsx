import Announcements from "@/components/Announcements";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const CourseDetail = async ({
  params: { id },
}: {
  params: { id: string };
}) => {


  const course = await prisma.course.findUnique({
    where: { id },
    include: {
    supervisor: true,
    },
  });
    //  (Student & {
    //     class: Class & { _count: { lessons: number } };
    //   })
    // | null
    

  if (!course) {
    return notFound();
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
     
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default CourseDetail;
