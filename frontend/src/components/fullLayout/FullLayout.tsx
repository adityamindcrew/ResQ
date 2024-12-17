// FullLayout.jsx
import React, { useState, useEffect } from "react";
import SideBarNav from "../sideBar/SideBarNav";
import Header from "@components/header/Header";
import useWindowSize from "../../hooks/useWindowSize";
import Loader from "@components/loader/Loader";

interface FullLayoutProps {
  children: React.ReactNode; // Type for children
  isLoading: boolean; // Add isLoading as a prop
}

const FullLayout: React.FC<FullLayoutProps> = ({ children, isLoading }) => {
  const windowSize = useWindowSize();
  const [isDrawer, setIsDrawer] = React.useState<boolean>(false);

  const handleDrawer = () => {
    setIsDrawer(!isDrawer);
  };

  return (
    <div className={`flex bg-primary overflow-hidden`}>
      {isLoading && <Loader />}
      <SideBarNav isDrawer={isDrawer} />
      <div
        className={`flex flex-col w-full h-auto overflow-auto min-w-96 relative ${windowSize > 1000 ? "p-4" : ""
          }`}
      >
        <div className="sticky top-0 right-0 w-full">
          <Header handleDrawer={handleDrawer} />
        </div>
        <div
          className={`flex flex-col justify-start max-h-[85vh] min-h-[85vh] items-center relative w-full${windowSize > 1000 ? "min-h-[85vh]" : "min-h-[90vh]"
            } h-auto bg-secondary overflow-auto relative`}
          style={{
            borderRadius: windowSize > 1000 ? "0px 0px 20px 20px" : "",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default FullLayout;
