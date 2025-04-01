import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(3, { message: "Subject name is required!" }),
  description: z.string().min(5, { message: "Description is required!" }),
  specialization: z.string().min(5, { message: "Specialization is required!" }),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const questionSchema = z.object({
  id: z.coerce.number().optional(),
  description: z.string().min(5, { message: "Description is required!" }),
  productID: z.string().optional(),
});

export type QuestionSchema = z.infer<typeof questionSchema>;

export const reviewSchema = z.object({
  id: z.coerce.number().optional(),
  description: z.string().min(5, { message: "Description is required!" }),
  rating: z.number().optional(),
  userID: z.string().optional(),
  productID: z.string().optional(),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;

export const qualificationSchema = z.object({
  id: z.coerce.number().optional(),
  userId: z.string().optional(),
  qualificationName:z.string().min(3,{message: "Please Enter Qualification Name"}),
  startDate: z.coerce.date({message: "Starting Date of Degree is required"}),
  endDate: z.coerce.date({message: "End Date of Qualification is required"}),
  university: z.string().min(5, {message: "University Name is required"}),
  totalMarks: z.string().min(3,{message: "Total Marks is required"}),
  obtainMarks: z.string().min(3,{message: "Obtain MArks is required"}),
  totalCGPA: z.string().min(2,{message: "Total CGPA is required"}),
  obtainCGPA: z.string().min(2,{message: "Obatained CGPA is required"}),
  img : z.string().optional(),

})
export type QualificationSchema = z.infer<typeof qualificationSchema>;

export const productSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(5,{message: "Please Enter Product Title"}),
  slug: z.string().min(5,{message: "Please Enter Product Slug"}),
  imgUrl: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  isWholesale: z.boolean().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  productCode : z.string().optional(),
  unit: z.string().optional(),
  productPrice: z.string().optional(),
  salePrice: z.string().optional(),
  wholesalePrice: z.string().optional(),
  wholesaleQty: z.string().optional(),
  productStock: z.string().optional(),
  qty: z.string().optional(),
  userId: z.string().optional(),
  categoryId: z.string().optional(),
  courseCategoryId: z.string().optional()
})
export type ProductSchema = z.infer<typeof productSchema>;

export const registrationSchema = z.object({
  id: z.coerce.number().optional(),
  userId: z.string(),
  jobId: z.string(),
  AppliedDate: z.coerce.date({ message: "Application Date is required!" }),
  ApplicationStatus: z.enum(["APPLIED", "REVIEW", "REJECTED", "COMPLETED", "SUCCESSFULL"], { message: "Status is required!" }),
})
export type RegistrationSchema = z.infer<typeof registrationSchema>;

export const jobSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(3, { message: "Subject name is required!" }),
  description: z.string().min(5, { message: "Description is required!" }),
  specialization: z.string().min(5, { message: "Specialization is required!" }),
  requirement: z.string().min(5, { message: "Specialization is required!" }),
  mainPoints: z.string().min(5, { message: "Main points is required!" }),
  qualification: z.string().min(5, { message: "Qualification is required!" }),
  openingDate: z.coerce.date({ message: "Strart Date is required!" }),
  endDate: z.coerce.date({ message: "End Date is required!" }),
  categoryId: z.string().optional()

});

export type JobSchema = z.infer<typeof jobSchema>;


export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Subject name is required!" }),
  description: z.string().min(5, { message: "Description is required!" }),
  categoryType: z.enum(["ECOMERSE", "TUTORIAL", "JOB"], { message: "category Type is required!" }),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(3, { message: "Lesson name is required!" }),
  startTime: z.coerce.date({ message: "Strart Time is required!" }),
  endTime: z.coerce.date({ message: "End Time is required!" }),
  classId: z.string().optional(),
  lessonVideo:  z.string().min(7, { message: "video URL is must be required!" }),

})
export type LessonSchema = z.infer<typeof lessonSchema>;

export const courseSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  description: z.string().min(1, { message: "Subject description is required!" }),
  capacity: z.coerce.number().min(1,{ message: "Capacity is Required"}),
  requirement: z.string().min(1, { message: "Requirement is required!" }),
  whoTakes: z.string().min(1, { message: "who Takes is required!" }),
  mainPoints: z.string().min(1, { message: "main points is required!" }),
  startDate: z.coerce.date({ message: "Strart Time is required!" }),
  endDate: z.coerce.date({ message: "End Time is required!" }),
  supervisorId: z.string().optional(),
  categoryId: z.string().optional(),
});

export type CourseSchema = z.infer<typeof courseSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string(),
  address: z.string(),
  secure_url: z.string().optional(),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  gender: z.enum(["MALE", "FEMALE"], { message: "gender is required!" }),
  qualification: z.string(),
  specialization: z.string().min(5, { message: "Specialization is required!" }),
  subjects: z.string().optional(), // subject ids
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" }),
  phone: z.string(),
  address: z.string(),
  url: z.string().optional(),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  gender: z.enum(["MALE", "FEMALE"], { message: "gender is required!" }),
  classId: z.string().optional()
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;
