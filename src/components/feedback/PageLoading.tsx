"use client";

import { motion } from "framer-motion";
import { CircleDollarSign } from "lucide-react";

interface PageLoadingProps {
  message?: string;
}

const TRACK_WIDTH = 288;
const ICON_SIZE = 28;
const TRACK_PADDING = 8;

export default function PageLoading({
  message = "Loading...",
}: PageLoadingProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-10" style={{ width: TRACK_WIDTH }}>
          {/* Timeline */}
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border" />

          {/* Milestones */}
          {[0.2, 0.5, 0.8].map((position) => (
            <div
              key={position}
              className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-border"
              style={{ left: `${position * 100}%` }}
            />
          ))}

          {/* Moving Coin */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            animate={{
              x: [
                TRACK_PADDING,
                TRACK_WIDTH / 2 - ICON_SIZE / 2,
                TRACK_WIDTH - ICON_SIZE - TRACK_PADDING,
              ],
              y: [0, -8, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <CircleDollarSign className="size-7 text-primary drop-shadow-md" />
          </motion.div>
        </div>

        <motion.p
          className="text-sm font-medium text-muted-foreground"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}
