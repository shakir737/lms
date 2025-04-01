"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  ProductSchema,
  productSchema,
} from "@/lib/formValidationSchemas";
import {createCourse, createProduct, updateCourse, updateProduct} from "@/lib/actions"
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import ToggleInput from "../TogleInput";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const ProductForm = ({
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
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE
  const [img, setImg] = useState<any>();
  const [state, formAction] = useFormState(
    type === "create" ? createProduct : updateProduct,
    {
      success: false,
      error: false,
    }
  );
  const [loading, setLoading] = useState( true )
  const isActive = watch("isActive");
  const isWholesale = watch("isWholesale");
  const onSubmit = handleSubmit((data: ProductSchema) => {

     const {url} = img;
     const result = {...data, imgUrl:url}
   
    formAction(result);
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

  const { users, categories, tutorialCategory} = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold flex items-center justify-center">
        {type === "create" ? "Create a new product" : "Update the product"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Product Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Product slug"
          name="slug"
          defaultValue={data?.slug}
          register={register}
          error={errors?.slug}
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
          <label className="text-xs text-gray-500">User</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("userId")}
            defaultValue={data?.users}
          >
            {users.map(
              (user: { id: string; name: string;}) => (
                <option
                  value={user.id}
                  key={user.id}
                  selected={data && user.id === data.userId}
                >
                  {user.name }
                </option>
              )
            )}
          </select>
          {errors.userId?.message && (
            <p className="text-xs text-red-400">
              {errors.userId.message.toString()}
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
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Course Category</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("courseCategoryId")}
            defaultValue={data?.catagories}
          >
            {tutorialCategory.map(
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
          label="Bar Code"
          name="barcode"
          defaultValue={data?.barcode}
          register={register}
          error={errors.barcode}
      
        />
       <InputField
          label="Product Code"
          name="productCode"
          defaultValue={data?.productCode}
          register={register}
          error={errors.productCode}
          
        />
        <InputField
          label="Unit"
          name="unit"
          defaultValue={data?.unit}
          register={register}
          error={errors?.unit}
        />
          <InputField
          label="Product Price"
          name="productPrice"
          defaultValue={data?.productPrice}
          register={register}
          error={errors?.productPrice}
          type="number"
        />

          
        <InputField
          label="Sale Price"
          name="salePrice"
          defaultValue={data?.salePrice}
          register={register}
          error={errors?.salePrice}
          type="number"
        />
         <InputField
          label="Quantity"
          name="qty"
          defaultValue={data?.qty}
          register={register}
          error={errors?.qty}
          type="number"
        />
        <InputField
          label="Product Stck"
          name="productStock"
          defaultValue={data?.productStock}
          register={register}
          error={errors?.productStock}
          type="number"
        />
       
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
     
        <div className="w-full flex justify-center gap-10">
          <div>
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
              <span>Upload a photo</span>
            </div>
          );
        }}
      </CldUploadWidget>
      </div>
      <div>
       {
        img ? !loading && (
          <>
            <img src={img.url} height={30} width={30} alt="image"/>
          </>
        ) : (
          <>
          <p>Please Upload Image</p>
          </>
        )
       }
       </div>
        </div>
        <div className="w-full">
        <ToggleInput
          label="Active Or InActive In Production"
          name="isActive"
          register={register}
        
        />
        </div>
       <div className="flex flex-col w-full">
        <div>
        <ToggleInput
          label="Supports Wholesale Selling"
          name="isWholesale"
          register={register}
        
        />
        </div>
       <div className="flex md:justify-between">
          {isWholesale && (
          <>
            <InputField
              label="Wholesale Price"
              name="wholesalePrice"
              register={register}
              error={errors.wholesalePrice}
              type="number"
           
            />
            <InputField
              label="Minimum Wholesale Qty"
              name="wholesaleQty"
              register={register}
              error={errors.wholesaleQty}
              type="number"
   
            />
          </>
        )}
        </div>
        </div>
       </div>
       
      
      <button className="bg-black text-white p-2 rounded-md" >
        {type === "create" ? "Create" : "Update"}
      </button>
  
    </form>
  );
};

export default ProductForm;
