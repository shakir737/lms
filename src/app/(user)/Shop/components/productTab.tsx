import { Pagination } from "@/components/ui/pagination";
import RatingsBadge from "@/components/ui/ratingBag";
import RatingProgressBar from "@/components/ui/ratingProgressBar";
import { cn } from "@/lib/utils";
import { IPaginatorInfo } from "@/types";
import { Tab } from "@headlessui/react";
import { Product } from "@prisma/client";
import { useAtom } from "jotai";
import { useState } from "react";
import ProductRating from "./productRating";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"
import {
  questionSchema,
  QuestionSchema,
  reviewSchema,
  ReviewSchema,
} from "@/lib/formValidationSchemas";
import { createReview } from "@/lib/actions";
import ReviewCard from "./reviewCartd";

interface Props {
  product: Product;
  user: any;
  review: any;
}
export default function ProductDetailsTab({ product, user, review }: Props) {
  let [tabHeading] = useState({
    Product_Details: "",
    Review_Rating: "",
    QA: "",
  });
   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<QuestionSchema>({
      resolver: zodResolver(questionSchema),
    });
    const {
      register: register1,
      handleSubmit: handleSubmit1,
      formState: { errors: errors1 },
    } = useForm<ReviewSchema>({
      resolver: zodResolver(reviewSchema),
    });
  const [page, setPage] = useState(1);
  const [reviewPage, setReviewPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
 
 const onSubmit = (async (data:QuestionSchema) => {

   
   
  });


  const onSubmit1 = (async (data:ReviewSchema) => {
   const userID = user.id;
   const productID = product.id;
   const review = { ...data, userID, rating, productID};
   const result = await createReview(review);

     if(result.success){
          toast(`Review Has Bess Generated!`)
        
        } else {
         toast(`Error In Generating Review!`)
        }
  });


  function onPagination(current: number) {
    setPage(current);
  }

  function onReviewPagination(current: number) {
    setReviewPage(current);
  }

  // const globalModal = useGlobalModalStateStore((state) => state);

  // if (isLoading && isEmpty(data?.docs)) {
  //   return <Spinner />;
  // }
  return (
    <div className="w-full py-11 lg:py-14 xl:py-16 ">
      <Tab.Group>
        <Tab.List className="block flex items-center justify-center border-b border-border-base text-xs sm:text-sm md:text-base">
          {Object.keys(tabHeading).map((item) => (
            <Tab
              key={item}
              className={({ selected }) =>
                cn(
                  "relative inline-block transition-all text-15px lg:text-17px leading-5 text-gray-700 focus:outline-none pb-3 lg:pb-5 hover:text-primary  ml-8",
                  selected
                    ? "font-semibold after:absolute after:w-full after:h-0.5 after:bottom-0 after:translate-y-[1px] after:right-0 after:bg-primary"
                    : ""
                )
              }
            >
              {item.split("_").join(" ")}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-9">
          <Tab.Panel className="lg:flex">
            <div className="text-md text-slategray sm:text-15px px-5 md:ml-10 md:pl-10  text-brand-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
              <p>
                Go sporty this summer with this vintage navy and white striped
                v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing
                with denim and white kicks for a stylish sporty vibe. Will fit a
                UK 8-10, model shown is a UK 8 and 5’5. !!
              </p>
              <p>
                Typography is the work of typesetters, compositors,
                typographers, graphic designers, art directors, manga artists,
                comic book artists, graffiti artists, and now—anyone who
                arranges words, letters, numbers, and symbols for publication,
                display, or distribution—from clerical workers and newsletter
                writers to anyone self-publishing materials.
              </p>
              <p>
                Hit your next boxing workout with a combination it’s never seen
                before in the Combat Drop Arm Tank, including a
                freedom-instilling regular fit and dropped armhole to allow you
                to throw jabs and hooks at the punching bag with ease. A
                lightweight material keeps you fighting fit, and fresh.
              </p>
              <p>
                Go sporty this summer with this vintage navy and white striped
                v-neck t-shirt from the Abercrombie & Fitch. Perfect for pairing
                with denim and white kicks for a stylish sporty vibe. Will fit a
                UK 8-10, model shown is a UK 8 and 5’5. !!
              </p>
            </div>
          </Tab.Panel>
          <Tab.Panel className="min-w-[270px] w-full mx-auto md:gap-10 md:ml-10 md:pl-10 md:mr-10 md:pr-10">
            <div className="flex flex-col justify-center space-y-8 md:space-y-0 md:flex-row gap-10 px-5 ">
              <div className="md:ml-10 md:pl-10 md:max-w-md w-full px-3">
                <RatingsBadge
                  rating={2}
                  className="mb-4"
                  totalRating={2}
                  variant="large"
                />
                <div className="w-full space-y-3 py-0.5 pt-4 sm:w-auto sm:pt-0  sm:pr-8  md:border-r">
                  <RatingProgressBar
                    ratingProgressItem={5}
                    ratingId={5}
                    totalReviews={1}
                  />
                  <RatingProgressBar
                    ratingProgressItem={4}
                    ratingId={4}
                    totalReviews={1}
                    
                  />
                    <RatingProgressBar
                    ratingProgressItem={3}
                    ratingId={3}
                    totalReviews={1}
           
                  /> 
                  <RatingProgressBar
                  ratingProgressItem={2}
                  ratingId={2}
                  totalReviews={1}
               
                />
                 <RatingProgressBar
                    ratingProgressItem={1}
                    ratingId={1}
                    totalReviews={1}
                
                  />
                   <ProductRating rating={rating} setRating={setRating} />
                  <div className=" flex mt-4 flex-col justify-center space-y-6">
                    <div className="gap-2">
                      <h1 className="text-xl text-gray-900 dark:text-white font-medium">
                        Review this product
                      </h1>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Let other customers know what you think
                      </p>
                    </div>
                 </div>
                    <form onSubmit={handleSubmit1(onSubmit1)}>
                  <div className="flex flex-col w-full gap-5 ">
                   <div className="w-full md:w-[1410px]">
                     <InputField
                       label=""
                       name="description"
                       register={register1}
                       error={errors.description}
                   
                      /></div>
                       <Button
                     variant={"secondary"}
                     type="submit"
                     >
                     Post Your Review
                  </Button>
                
                  </div>
                  <div>
                 
                  </div>
                  </form>
             
                </div>
              </div>

              <div className="w-full sm:px-3">
                <div>
                <div>
                  {review?.length !== 0 ? (
                    <div
                      className={cn("border-b border-border border-opacity-70")}
                    >
                      <div className="space-y-6 w-full mx-auto">
                        {review?.map((review: any) => (
                          <ReviewCard
                            key={`review-no-${review.id}`}
                            review={review}
                          />
                        ))}
                        {/* Pagination */}
                      

                           
                          </div>
                        
                      </div>
                    
                  ) : (
                    <div className="flex flex-col items-center justify-center border-b border-border border-opacity-70 px-5 py-16">
                      <h3 className="text-lg font-semibold text-gray-400 dark:text-white">
                        No Review Found
                      </h3>
                    </div>
                  )}
                </div>
               
                   
              
                </div>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="flex flex-col ">
              <div className="flex flex-col ">
                <h1 className="flex justify-center items-center text-sm sm:text-lg text-gray-800 dark:text-white font-medium">
                  Have Doubts Regarding This Product ?
                </h1>
                <div className="">
                  <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-center gap-5 w-full flex-wrap">
                     <InputField
                       label=""
                       name="description"
                       register={register}
                       error={errors.description}
                       
                      />
                       <Button
                     variant={"secondary"}
                     type="submit"
                     >
                     Post Your Question
                  </Button>
                  </div>
                  <div>
                 
                  </div>
                  </form>
                 
                </div>
              
              </div>

              <div>
            
                  <div className="flex flex-col items-center justify-center border-b border-border border-opacity-70 px-5 py-16">
                    <h3 className="text-lg font-semibold text-gray-400 dark:text-white">
                      No Question Found
                    </h3>
                  </div>
              
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
