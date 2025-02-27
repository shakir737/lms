"use client";

import { motion } from "framer-motion";

export default function ScrollAnimationWrapper({children}: {
  children: React.ReactNode;

}) {
  return (
    <motion.div
    initial={{y: 250, opacity:0}}
    whileInView={{y: 0, opacity: 1}}
    transition={{ duration: 0.5, delay: 0.25, ease:"easeOut"}}
  >
    {children}
  </motion.div>
  );
}