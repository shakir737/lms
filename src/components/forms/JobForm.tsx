"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { jobSchema, JobSchema,} from "@/lib/formValidationSchemas";
import { createJob, updateJob } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const JobForm = ({
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
  } = useForm<JobSchema>({
    resolver: zodResolver(jobSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createJob : updateJob,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Job has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { category } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold flex items-center justify-center">
        {type === "create" ? "Create A New Job" : "Update The Job"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Job name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
         <InputField
          label="Job Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
         <InputField
          label="Job Specialization"
          name="specialization"
          defaultValue={data?.specialization}
          register={register}
          error={errors?.specialization}
        />
        <InputField
          label="Job Requirement"
          name="requirement"
          defaultValue={data?.requirement}
          register={register}
          error={errors?.requirement}
        />
        <InputField
          label="Job Main Point"
          name="mainPoints"
          defaultValue={data?.mainPoints}
          register={register}
          error={errors?.mainPoints}
        />
        <InputField
          label="Job Qualification"
          name="qualification"
          defaultValue={data?.qualification}
          register={register}
          error={errors?.qualification}
        />
       <InputField
          label="Opening Date"
          name="openingDate"
          defaultValue={data?.openingDate.toISOString().split("T")[0]}
          register={register}
          error={errors.openingDate}
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
       <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Job Category</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("categoryId")}
            defaultValue={data?.categoryId}
          >
            {category.map(
              (category: { id: string; name: string; }) => (
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
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default JobForm;
