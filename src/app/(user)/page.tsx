
import Banner from '@/components/Banner/index';
import Companies from '@/components/Companies/Companies';
import Courses from '@/components/Courses/index';
import Mentor from '@/components/Mentor/index';
import Testimonials from '@/components/Testimonials/index';
import Newsletter from '@/components/Newsletter/Newsletter';
import Shop from '@/components/Shop/index'
import React from "react";
import ScrollAnimationWrapper from '../scrolAnimationWraper';

export default async function Home() {
 
  return (
    <main>
     
        <Banner />
        <Companies />
       
      <ScrollAnimationWrapper>
      <Courses />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper>
      <Shop />
      </ScrollAnimationWrapper>
     
      <ScrollAnimationWrapper>
      <Mentor />
      </ScrollAnimationWrapper>
     <ScrollAnimationWrapper>
     <Testimonials />
     </ScrollAnimationWrapper>
     
      <Newsletter />
    </main>
  )
}
