"use server";
import { parse } from "path";
import {
  CategorySchema,
  CourseSchema,
  ExamSchema,
  JobSchema,
  ProductSchema,
  QualificationSchema,
  RegistrationSchema,
  ReviewSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import Prisma from "./prisma";
import bcrypt from "bcryptjs";


type CurrentState = { success: boolean; error: boolean };
type SignupSchema = {
  name: string,
  username: string,
  email: string,
  password: string,
  phoneNumber: string,
}

export const Registration = async (data: SignupSchema) => {
 
try{ 
  const {name,phoneNumber,email,password} = data
  const username = email;
  const hashedPassword = await bcrypt.hash(password, 10);
 

  const newUser = await Prisma?.user.create({
    data: {
      name,
      username,
      email,
      password:hashedPassword,
      phone:phoneNumber,
      role: "USER",
      Gender: "MALE",
      birthday: Date.UTC.toString()
    },
  });
 console.log(newUser);
  return { success: true, error: false };

}catch (error:any){
  return { success: false, error: true };
}

};
export const createJobApplication = async (
data: QualificationSchema
) => {
  try {
    await Prisma.qualification.create({
       data: {
         qualificationName: data.qualificationName,
         startDate: data.startDate,
         endDate: data.endDate,
         totalMarks: data.totalMarks,
         obtainMarks: data.obtainMarks,
         totalCGPA: data.totalCGPA,
         obtainCGPA: data.obtainCGPA,
         university: data.university,
         img: data.img,
         userId: data.userId,       
      },
     });

    console.log(data);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
}

export const createRegistration = async (
  data: RegistrationSchema
) => {
  try {
    await Prisma.registration.create({
      data: {
        jobId: data.jobId,
        userId: data.userId,
        AppliedDate: data.AppliedDate,
        ApplicationStatus: data.ApplicationStatus 
       
      },
    });

    
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await Prisma.subject.create({
      data: {
        name: data.name,
        description: data.description,
        specialization: data.specialization
       
      },
    });

    
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
   

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
   

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createJob = async (
  currentState: CurrentState,
  data: JobSchema
) => {
  try {
    await Prisma.job.create({
      data: {
        name:           data.name,
        description:    data.description,
        specialization: data.specialization,
        requirement:    data.requirement,
        mainPoints:     data.mainPoints,
        qualification:  data.qualification,
        openingDate:    data.openingDate,
        endDate:        data.endDate,
        categoryId:     data.categoryId,
      },
    });

    
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateJob = async (
  currentState: CurrentState,
  data: SubjectSchema
) => {
  try {
    await Prisma.subject.create({
      data: {
        name: data.name,
        description: data.description,
        specialization: data.specialization
       
      },
    });

    
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
export const createCategory = async (
  currentState: CurrentState,
  data: CategorySchema
) => {
  try {
    await Prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        categoryType: data.categoryType
       
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createCourse = async (
  currentState: CurrentState,
  data: CourseSchema
) => {
  try {
    await Prisma.course.create({
      data: {
        name: data.name,
        capacity: (data.capacity)?.toString(),
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        requirement: data.requirement,
        whoTakes: data.whoTakes,
        mainPoints: data.mainPoints,
        supervisorId: data.supervisorId,
        categoryId: data.categoryId
       
      },
    });
    
    // revalidatePath("/list/subjects");
    return { success: true, error: false}
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createReview = async (

  data: ReviewSchema
) => {
  try {
    await Prisma.review.create({
      data: {
        description: data.description,
        rating: (data.rating)?.toString(),
        userId: data.userID,
        productId: data.productID,
       
      },
    });
    
    // revalidatePath("/list/subjects");
    return { success: true, error: false}
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createProduct = async (
  currentState: CurrentState,
  data: ProductSchema
) => {
  console.log(data);
  try {
    await Prisma.product.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        imageUrl: data.imgUrl,
        isActive: data.isActive,
        isWholesale: data.isWholesale,
        sku: data.sku,
        productCode: data.productCode,
        barcode: data.barcode,
        categoryId: data.categoryId || "",
        courseCategoryId: data.courseCategoryId || "",
        userId: data.userId || "",
        unit: data.unit,
        productPrice: parseFloat(data.productPrice || ""),
        salePrice: parseFloat(data.salePrice || ""),
        wholesalePrice: parseFloat(data?.wholesalePrice || ""),
        wholesaleQty: parseInt(data?.wholesaleQty || ""),
        productStock: parseInt(data?.productStock || ""),
        qty: parseInt(data?.qty || ""),
        
        // wholesalePrice: parseFloat(data.wholeSalePrice),
      },
    });
    
    // revalidatePath("/list/subjects");
    return { success: true, error: false}
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
export const updateProduct = async (
  currentState: CurrentState,
  data: ProductSchema
) => {
  try {
   

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
export const updateCourse = async (
  currentState: CurrentState,
  data: CourseSchema
) => {
  try {
   

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
  

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createTeacher = async (
  // currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    await Prisma.teacher.create({
      data: {
        name: data.name,
        username: data.username,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.secure_url,
        Gender: data.gender,
        qualification: data.qualification,
        specialization: data.specialization,
        birthday: data.birthday


    }
  });

    //  revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
 
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
 
};

export const createStudent = async (
  data: StudentSchema
) => {
  
  try {
    await Prisma.student.create({
      data: {
        name: data.name,
        username: data.username,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: data.url,


    }
  })
    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateStudent = async (

  data: StudentSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
 
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
 
};

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher") {
    //   const teacherLesson = await Prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    // }

    // await Prisma.exam.create({
    //   data: {
    //     title: data.title,
    //     startTime: data.startTime,
    //     endTime: data.endTime,
    //     lessonId: data.lessonId,
    //   },
    // });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // if (role === "teacher") {
    //   const teacherLesson = await Prisma.lesson.findFirst({
    //     where: {
    //       teacherId: userId!,
    //       id: data.lessonId,
    //     },
    //   });

    //   if (!teacherLesson) {
    //     return { success: false, error: true };
    //   }
    // }

    // await Prisma.exam.update({
    //   where: {
    //     id: data.id,
    //   },
    //   data: {
    //     title: data.title,
    //     startTime: data.startTime,
    //     endTime: data.endTime,
    //     lessonId: data.lessonId,
    //   },
    // });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;

  // const { userId, sessionClaims } = auth();
  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  try {
    // await Prisma.exam.delete({
    //   where: {
    //     id: parseInt(id),
    //     // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
    //   },
    // });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
