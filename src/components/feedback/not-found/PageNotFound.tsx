import { IMAGES } from "@/constants/images";
import Image from "next/image";
import React from "react";

interface PageNotFoundProps {
  message: string;
}

const PageNotFound = ({ message }: PageNotFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="max-w-lg">
        <Image
          src={IMAGES.COMMON.NOT_FOUND}
          alt="Not Found"
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default PageNotFound;
