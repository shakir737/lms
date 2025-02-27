"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  courseSchema,
  CourseSchema,
} from "@/lib/formValidationSchemas";
import {createCourse, updateCourse} from "@/lib/actions"
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CourseForm = ({
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
  } = useForm<CourseSchema>({
    resolver: zodResolver(courseSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createCourse : updateCourse,
    {
      success: false,
      error: false,
    }
  );
  const [loading, setLoading] = useState( true )
  const onSubmit = handleSubmit((data: CourseSchema) => {
    
   formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    console.log(true);
    if (state.success) {
      toast(`Course has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const { teachers, categories} = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold flex items-center justify-center">
        {type === "create" ? "Create a new course" : "Update the course"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Course name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Capacity"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
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
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Supervisor</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("supervisorId")}
            defaultValue={data?.teachers}
          >
            {teachers.map(
              (teacher: { id: string; name: string;}) => (
                <option
                  value={teacher.id}
                  key={teacher.id}
                  selected={data && teacher.id === data.supervisorId}
                >
                  {teacher.name }
                </option>
              )
            )}
          </select>
          {errors.supervisorId?.message && (
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Categories</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("categoryId")}
            defaultValue={data?.categories}
          >
            {categories.map(
              (category: { id: string; name: string;}) => (
                <option
                  value={category.id}
                  key={category.id}
                  selected={data && category.id === data.categoryId}
                >
                  {category.name }
                </option>
              )
            )}
          </select>
          {errors.categoryId?.message && (
            <p className="text-xs text-red-400">
              {errors.categoryId.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Starting Date"
          name="startDate"
          defaultValue={data?.startDate.toISOString().split("T")[0]}
          register={register}
          error={errors.startDate}
          type="date"
        />
       <InputField
          label="End Date"
          name="endDate"
          defaultValue={data?.endDate.toISOString().split("T")[0]}
          register={register}
          error={errors.endDate}
          type="date"
        />
        <InputField
          label="Course Requirements"
          name="requirement"
          defaultValue={data?.requirement}
          register={register}
          error={errors?.requirement}
        />
          <InputField
          label="Course Main Points"
          name="mainPoints"
          defaultValue={data?.mainPoints}
          register={register}
          error={errors?.mainPoints}
        />
        <InputField
          label="Course Build For"
          name="whoTakes"
          defaultValue={data?.whoTakes}
          register={register}
          error={errors?.whoTakes}
        />
      
       </div>
       
       <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}

        />
      
      <button className="bg-black text-white p-2 rounded-md" disabled={state.error}>
        {type === "create" ? "Create" : "Update"}
      </button>
  
    </form>
  );
};

export default CourseForm;
