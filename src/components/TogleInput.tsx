import React from "react";

export default function ToggleInput({
  label,
  name,
  register,
}: {label:any, name:any, register: any}) {

  return (
    <div className={`${"sm:col-span-2 flex flex-wrap"}`}>
      <div className="w-full sm:w-1/2">
        <h2 className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2">
          {label}
        </h2>
      </div>
      <div className="w-full sm:w-1/2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            {...register(`${name}`)}
            type="checkbox"
            className="sr-only peer"
          />
          <div className="w-11 border h-6 bg-gray-200 peer-focus:outline-none ring-4 ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-800 peer-checked:bg-purple-600"></div>
         
        </label>
      </div>
    </div>
  );
}
