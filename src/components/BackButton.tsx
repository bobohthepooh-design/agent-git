"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  label?: string;
}

export function BackButton({ className = "", label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.back()}
      className={`flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </motion.button>
  );
}
