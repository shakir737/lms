"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {lessonSchema, LessonSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { createSubject, createTeacher, updateSubject, updateTeacher } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

const LessonForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonSchema>({
    resolver: zodResolver(lessonSchema),
  });

  const [img, setImg] = useState<any>();
  const [state, formAction] = useFormState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );


  const onSubmit = handleSubmit((data) => {
    console.log(data);
    console.log(img);

   
  });

  const router = useRouter();

   useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
       router.refresh();
   }
 }, [state, router, type, setOpen]);

  const { course } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold flex justify-center items-center">
        {type === "create" ? "Create a new lesson" : "Update the lesson"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Lesson Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Lesson Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Start Time"
          name="startTime"
          defaultValue={data?.startTime.toISOString().split("T")[0]}
          register={register}
          error={errors.startTime}
          type="date"
        />
        <InputField
          label="End Time"
          name="endTime"
          defaultValue={data?.endTime.toISOString().split("T")[0]}
          register={register}
          error={errors.endTime}
          type="date"
        />
         {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )} 
      
        <div className="flex flex-col gap-2 w-full md:w-1/4 ">
          <label className="text-xs text-gray-500">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("lessonVideo")}
            defaultValue={data?.class}
          >
            {course.map((subject: { id: string; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>
       
       
    
      </div>
      <CldUploadWidget
          uploadPreset="LMS_FILES"
          onSuccess={(result, { widget }) => {
            setImg(result.info);
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
                <span>Upload Your Lesson File</span>
              </div>
            );
          }}
        </CldUploadWidget>
       
        <span className="text-red-500">{state.error}</span>

       {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )} 
      <button className="bg-blue-400 text-white p-2 rounded-md" onSubmit={onSubmit} >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default LessonForm;
