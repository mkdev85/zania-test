import React from "react";

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center">
    <img src="/spinner.gif" alt="Loading..." className="h-16 w-16" />
  </div>
);

export default Spinner;
