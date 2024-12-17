// Header.jsx
import React from "react";
import { Breadcrumbs, Input } from "@material-tailwind/react";
import ProfileMenu from "./profileMenu/ProfileMenu";
import useWindowSize from "../../hooks/useWindowSize";
import { useLocation } from "react-router-dom";


interface HeaderProps {
  handleDrawer: () => void; // Explicitly type the handleDrawer function
}
export default function Header({ handleDrawer }: HeaderProps) {
  const windowSize = useWindowSize();
  const location = useLocation();

  const getPageDisplayName = (pathname: string): string => {
    const pathMap: Record<string, string> = {
      "/": "Ambulance Services",
      "/medical-staff": "Medical Staff",
    };
    return pathMap[pathname] || pathname;
  };

  return (
    <nav
      className="flex items-center w-full min-h-[10vh] h-auto px-4 py-3 text-gray shadow-md bg-secondary z-50 border-b-2 border-gray-300"
      style={{
        borderRadius: windowSize > 1000 ? "20px 20px 0px 0px" : "",
      }}
    >
      <div className="flex flex-wrap items-center justify-between text-gray gap-y-4 w-full h-auto">
        <div
          className="items-center justify-between flex mr-4 ml-2 cursor-pointer py-1.5 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased"
          onClick={() => {
            handleDrawer();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          {windowSize > 1000 && (
            <Breadcrumbs fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
            >
              <a href="#" className="opacity-60">
                ResQ Nearby
              </a>
              <a href="#">{getPageDisplayName(location.pathname)}</a>
            </Breadcrumbs>
          )}
        </div>

        <ProfileMenu />
      </div>
    </nav>
  );
}
