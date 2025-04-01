"use client"
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import useQueryParam from "@/hooks/use-query-params";

interface Category{
  data? : any,
  type? :string
}
export const CourseCategoryFilter = ({data,type} : Category) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? "/");
  const [formState, setFormState] = useState<string[]>([]);

  const hasQueryKey = searchParams?.get("courseCategory");







  useEffect(() => {
 
    updateQueryparams("courseCategory", formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, [formState]);


  useEffect(() => {
    setFormState(hasQueryKey?.split(",") ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  function handleItemClick(slug: string) {
    setFormState((prevFormState) =>
      prevFormState.includes(slug)
        ? prevFormState.filter((item) => item !== slug)
        : [...prevFormState, slug]
    );
  }

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7 mt-2">
      <div className={`underline ${type === "JOBS" || type === "TUTORIAL"  ? ("flex mt-5 items-center justify-center") : ("")} text-gray-900 dark:text-white text-sm md:text-base font-semibold mb-7 `}>
        <h6>Course Categories</h6>
      </div>
      <div className={`flex ${type === "JOBS" || type === "TUTORIAL"  ? ("flex-row gap-3 mt-1") : ("flex-col space-y-4")} `}>
       {data?.map((item: any) => (
          <div key={item.slug} className={`${type === "JOBS" || type === "TUTORIAL" ? ("space-x-2") : ("flex items-center space-x-2")}`}>
            <Checkbox
              name={item.name}
              checked={formState.includes(item.id)}
              value={item.id}
              onCheckedChange={() => handleItemClick(item.id)}
            />

            <Label>{item.name}</Label>
          </div>
        ))} 
      </div>
    </div>
  );
};
