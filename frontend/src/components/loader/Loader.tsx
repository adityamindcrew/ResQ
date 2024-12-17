import React, { FC } from "react"; // Import FC from React
import { Typography } from "@material-tailwind/react";
import "./styles.css";

const Loader: FC = () => { // Type the component as React.FC
  return (
    <div
      className="w-full h-screen flex justify-center items-center flex-col gap-1 absolute top-0 left-0 z-[999]"
      style={{
        background: "rgba(23,37,83,1)",
      }}
    >
      <div className="loader"></div>
      {/* <Typography variant="h6" className="text-white">
        Please wait...
      </Typography> */}
    </div>
  );
};

export default Loader;
