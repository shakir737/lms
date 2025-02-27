"use client";

import { motion } from "framer-motion";

export default function TransitionImg({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}