"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageWrapper({
  src,
  alt,
  className,
  containerClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative w-full ${containerClassName || ""}`}>
      {/* Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
      )}

      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className={`rounded-lg transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className || "w-full h-auto"}`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
