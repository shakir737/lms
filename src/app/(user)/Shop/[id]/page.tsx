import Announcements from "@/components/Announcements";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import prisma from "@/lib/prisma";
import { Class, Student } from "@prisma/client";
import { error } from "console";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SingleProduct from "../components/singleProduct";
import { getServerSession } from "next-auth/next";
import { auth } from '@/auth';


const ProductDetail = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
   const session = await getServerSession(auth);
    const user:any = session?.user;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
    user: true,
    category: true,
    },
  });
  const review = await prisma.review.findMany({
    include: {
      user: true
    }
  })
    //  (Student & {
    //     class: Class & { _count: { lessons: number } };
    //   })
    // | null
    

  if (!product) {
    return notFound();
  }

  return (
    <div className="w-full">
   <SingleProduct product={product} user={user} review={review}/>
    </div>
  );
};

export default ProductDetail;
