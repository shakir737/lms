"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  qualificationSchema,
  QualificationSchema,
  registrationSchema,
  RegistrationSchema,
} from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import {
  createJobApplication,
  createRegistration,
  createStudent,
  createTeacher,
  updateStudent,
  updateTeacher,
} from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";
import { Checkbox } from "../ui/checkbox";

const RegistrationForm = ({
  type,
  data,
  setOpen,
  relatedData,
  user,
  jobId
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
  user: {
    id: string,
    name: string
  };
  jobId:string;
}) => {
  const {
    register:register1,
    handleSubmit:handleSubmit1,
    reset:reset1,
    formState: { errors },
  } = useForm<QualificationSchema>({
    resolver: zodResolver(qualificationSchema),
  });
   const {
     register,
     handleSubmit,
     reset,
     formState: { errors:error },
   } = useForm<RegistrationSchema>({
     resolver: zodResolver(registrationSchema),
   });
  
  const [degreeImg, setImg] = useState<any>();
  const dateTime = Date.now();
  const [loading, setLoading] = useState(true);
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [btnNext, setBtnNext] = useState(false);
  const [qualificationUploaded,setQualificationUploaded] = useState(false);
    //  const [state, formAction] = useFormState(
    //    type === "create" ? createStudent : updateStudent,
    //    {
    //    success: false,
    //    error: false,
    //   }
    // );
  const handleCheckBox1 = async() => {
  setCheckBox1(!checkBox1)
  if(checkBox1 && checkBox2) {
    setBtnNext(!btnNext)
  }
  }
  const handleCheckBox2 = async() => {
  setCheckBox2(!checkBox2)
  if(checkBox1 && checkBox2) {
    setBtnNext(!btnNext)
  }
  }
  const onSubmit = (async (data:RegistrationSchema) => {

    
    const responce = await createRegistration(data);
    if(responce.success){
     toast(`You Have Successfully Applied For Job!`);
     reset();
     setOpen(false);
    }
  
    
   
    // if(responce.success){
    //  toast(`You Have Successfully Apply For This Job!`);
    // }
  
 });
 

  const onSubmit1 = (async (data:QualificationSchema) => {

     const userId = user.id;
     const {url:img} = degreeImg;
     const Qualification:QualificationSchema = {...data, img, userId}
     const responce = await createJobApplication(Qualification);
     if(responce.success){
      toast(`Academic Record has been ${type === "create" ? "created" : "updated"}!`);
      reset1();
      setImg("");
     }
   
  });

  const router = useRouter();

//    useEffect(() => {
//      if (state.success) {
//        toast(`Student has been ${type === "create" ? "created" : "updated"}!`);
//        setOpen(false);
//        router.refresh();
//     }
//  }, [state, router, type, setOpen]);

  const { qualification, count } = relatedData;


  return (
    <>
     <h1 className="text-xl font-semibold flex justify-center items-center">
        {type === "create" ? "Job Application Form" : "Update the student"}
      </h1>
      {
        qualificationUploaded ? (
          <><form className="flex flex-col gap-6 mt-2" onSubmit={handleSubmit(onSubmit)}>
          <InputField
          label="Job ID" 
          name="jobId"
          defaultValue={jobId}
          register={register}
          error={error?.jobId}
          hidden/>      
         <InputField
          label="Applied User"
          name="userId"
          defaultValue={user.id}
          register={register}
          error={error?.userId}
          hidden
        />
        <InputField
          label="Applied Date"
          name="AppliedDate"
          register={register}
          error={error.AppliedDate}
          type="date"
        />
        <label className="text-xs text-gray-500">Select Today Date And Submit The Application</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("ApplicationStatus")} hidden
          >
            <option value="APPLIED" selected >Goin To Apply</option>
          </select>
          {error.ApplicationStatus?.message && (
            <p className="text-xs text-red-400">
              {error.ApplicationStatus.message.toString()}
            </p>
          )}
                <button type="submit" className="bg-black text-white p-2 rounded-md"  >
        Submit
          </button>
    
            </form></>
        ) : (
    <form className="flex flex-col gap-6 mt-2" onSubmit={handleSubmit1(onSubmit1)}>
      <span className="text-xs text-gray-400 font-medium">
        Please Enter Your Academic Records One By One Untill The Required Qualification:
      </span>
      <span className="text-xs text-gray-400 font-medium">
        Uploaded Qualification:
      </span>
      <div className="flex justify-between items-center gap-2">
      {qualification ? ( qualification?.map((qualification: any) => (
        <div key={qualification.id} className="flex justify-between gap-2">
          {qualification.qualificationName}
          <Checkbox
              name={qualification.id}
              checked={true}
            
            />

        </div>
      )) ) : ( <span className="text-sm text-red">No Records Are Uploaded yet!</span>) }
      </div>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Degree Name"
          name="qualificationName"
          defaultValue={data?.qualificationName}
          register={register1}
          error={errors?.qualificationName}
        />
        <InputField
          label="University Name"
          name="university"
          defaultValue={data?.university}
          register={register1}
          error={errors?.university}
        />
      <InputField
          label="Start Date"
          name="startDate"
          register={register1}
          error={errors.startDate}
          type="date"
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
      <InputField
          label="End Date"
          name="endDate"
          register={register1}
          error={errors.endDate}
          type="date"
        />
     
        <InputField
          label="Total Marks"
          name="totalMarks"
          defaultValue={data?.totalMarks}
          register={register1}
          error={errors?.totalMarks}
        />
        <InputField
          label="Obtained Marks"
          name="obtainMarks"
          defaultValue={data?.obtainMarks}
          register={register1}
          error={errors?.obtainMarks}
        />
      </div>
      <div className="flex justify-between flex-wrap gap-4">
      
        <InputField
          label="Total CGPA"
          name="totalCGPA"
          defaultValue={data?.totalCGPA}
          register={register1}
          error={errors?.totalCGPA}
        />
        <InputField
          label="Obtained CGPA"
          name="obtainCGPA"
          defaultValue={data?.obtainCGPA}
          register={register1}
          error={errors?.obtainCGPA}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Photo Copy of Degree or Transcript
      </span>
      <div className="flex justify-between flex-wrap gap-4">
      <CldUploadWidget
        uploadPreset="LMS_FILES"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          setLoading(false);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div
              className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
              onClick={() => open()}
            >
              <Image src="/upload.png" alt="" width={28} height={28} />
              <span>Upload Copy of Degree Or Transcript</span>
            </div>
          );
        }}
      </CldUploadWidget>
       {
        degreeImg ? !loading && (
          <>
            <img src={degreeImg.url} height={30} width={30} alt="image"/>
          </>
        ) : (
          <>
          <p>Please Upload Image</p>
          </>
        )
       }
      </div>
      {count > 0 ? (
      <div className="">
      <div className="flex justify-center gap-2">
      <Checkbox
              name="checkbox1"
              checked={checkBox1}
              onCheckedChange={handleCheckBox1}
            />
        <span>If You Finished To Upload All Accademic Records</span>
      </div>
      <div className="flex justify-center gap-2">
        <Checkbox 
           name="checkbox2"
           checked={checkBox2}
           onCheckedChange={handleCheckBox2}
           />
           <span>Checked If All Records Are Correct And Best According To Your Knowledge</span>
      </div>
      </div>
      ) : (
      <></>)}
      {/* {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}  */}
      {
        user ? checkBox1 && checkBox2 ? (
          <button className="bg-black text-white p-2 rounded-md" onClick={() => setQualificationUploaded(!qualificationUploaded)} >
           Next Level
          </button>
        ) : ( 
          <button className="bg-black text-white p-2 rounded-md" disabled={loading} >
        {type === "create" ? "Create" : "Update"}
          </button>
        ) : (
          <p className="text-red flex items-center justify-center">Please Login First</p>
        )
      }
      
    </form>
     )
    }
    </>
  );
};

export default RegistrationForm;
