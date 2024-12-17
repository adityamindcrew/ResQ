// SideBarNav.jsx
import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { FaAmbulance } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospital } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import "./styles.css";

const itemList = [
  {
    text: "Ambulance Services",
    icon: <FaAmbulance className="h-5 w-5" />,

    path: "/",
  },
  {
    text: "Medical Staff",
    icon: <FaUserDoctor className="h-5 w-5" />,

    path: "/medical-staff",
  },
];
interface SideBarNavProps {
  isDrawer: boolean; // Explicitly type the isDrawer prop as boolean
}


const SideBarNav: React.FC<SideBarNavProps> = ({ isDrawer }) => {
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <Card
      placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
      className={`h-screen bg-primary w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5${windowSize < 1000 && !isDrawer
        ? "w-0 transition-max-height duration-300 overflow-hidden hidden"
        : windowSize > 1000 && isDrawer
          ? "w-0 transition-max-height duration-300 overflow-hidden hidden"
          : ""
        }`}
    >
      <div className="mb-2 p-4 ">
        <Typography className="flex items-center gap-2 justify-center" variant="h5" color="white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  >
          <FaHospital className="h-5 w-5" /> ResQ Nearby
        </Typography>
      </div>
      <hr className="my-2 border-blue-gray-50" />
      <List className="overflow-auto" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  >
        {itemList.map((item, index) => (
          <div key={index}>
            <ListItem
              placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
              className={`text-white ${location.pathname === item.path
                ? "bg-secondary text-gray"
                : "text-white"
                }`}
              onClick={() => navigate(`${item.path}`)}
            >
              <ListItemPrefix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  >{item.icon}</ListItemPrefix>
              <Typography placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  >{item.text}</Typography>
            </ListItem>
          </div>
        ))}
      </List>
    </Card>
  );
}
export default SideBarNav;
