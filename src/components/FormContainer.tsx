import prisma from "@/lib/prisma";
import FormModal from "./FormModal";


export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "subject"
    | "class"
    | "category"
    | "job"
    | "registration"
  type: "create" | "update" | "delete";
  data?: any;
  id?:  string;
  user?: any;
  jobId?: any;
};

const FormContainer = async ({ table, type, data, id, user, jobId}: FormContainerProps) => {
  let relatedData = {};


  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "registration":
        if(user){
          const userQualification = await prisma.qualification.findMany({
            where: { userId : user.id},
            select: { id:true, qualificationName: true}         
            })
          const count = await prisma.qualification.count({
            where: { userId : user.id},
          })
            relatedData = {qualification: userQualification, count};
           
        }
        break;
      case "class":
       
        const [classTeachers, categories] = await prisma.$transaction([
          prisma.user.findMany({
          where: { role: "TEACHER"},
          select: { id: true, name: true},
        }),
         prisma.category.findMany({
          where: { categoryType: "TUTORIAL"}
         })
         ]);
        relatedData = { teachers: classTeachers, categories: categories };
        break;

         case "job":
         const category = await prisma.category.findMany({
          where: {
                categoryType: "JOB"
            },
          select: { id: true, name: true},
        });
         relatedData = { category: category };
       break;
       case "teacher":
         const teacherSubjects = await prisma.subject.findMany({
           select: { id: true, name: true },
         });
         relatedData = { subjects: teacherSubjects };
       break;
      case "student":
       
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { user: true } } },
        });
        relatedData = { classes: studentClasses};
        break;
    
        // const examLessons = await prisma.lesson.findMany({
        //   where: {
        //     ...("teacher" === "teacher" ? { teacherId: currentUserId! } : {}),
        //   },
        //   select: { id: true, name: true },
        // });
        // relatedData = { lessons: examLessons };
      

      default:
        break;
    }
  }
console.log(jobId);
  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
        user={user}
        jobId={jobId}
      />
    </div>
  );
};

export default FormContainer;
