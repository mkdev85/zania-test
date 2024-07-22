import React from "react";
import { Loader } from "../Loader/Loader";

export const PageLoader: React.FC = () => {
  return (
    <div className="h-dvh flex items-center justify-center">
      <Loader />
    </div>
  );
};

PageLoader.displayName = "PageLoader";
