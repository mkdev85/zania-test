import React from "react";
import { Loader } from "../Loader/Loader";

export const PageLoader: React.FC = () => {
  return (
    <div className="h-dvh flex items-center justify-center">
      <Loader size={20} />
    </div>
  );
};

PageLoader.displayName = "PageLoader";
