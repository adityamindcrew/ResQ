import React from "react";
import { Typography, Chip } from "@material-tailwind/react";
import Img from "../../customUI/Img";
import doctorIcon from "../../assets/images/doctor.png";
import copyIcon from "../../assets/images/copyIcon.png";
import useCopyToClipBoard from "../../hooks/useCopyToClipboard";
import ConfirmModal from "@customUI/ConfirmModal";
import { getAdminPermission } from "@utils/permission";


import {
  TrashIcon,
  PencilIcon
} from "@heroicons/react/24/solid";
import { DoctorInterface, DoctorApiResponse } from "interfaces/MedicalStaffINterface";

// Define the type for the props
interface AmbulanceTableProps {
  handleOpenUpdateModal: (item: any) => void; // define handleOpenUpdateModal as a function that returns void
  deleteDoctorHandler: (item: any) => void; // define handleOpenUpdateModal as a function that returns void
  AmbulanceList?: DoctorApiResponse
}
const MedicalStaffTable: React.FC<AmbulanceTableProps> = ({ handleOpenUpdateModal, AmbulanceList, deleteDoctorHandler }) => {
  const handleCopyToClipboard = useCopyToClipBoard();
  const isAdmin = getAdminPermission();

  const TABLE_HEAD = [
    "Name",
    "Specialization",
    "Location",
    "Contact Number",
  ];
  return (
    <table className="w-full min-w-max table-auto text-left relative">
      <thead className="bg-white z-10 sticky -top-[1px] left-0">
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold leading-none opacity-70" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                {head}
              </Typography>
            </th>
          ))}
          {isAdmin && <th
            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold leading-none opacity-70" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
              Actions
            </Typography>
          </th>}
        </tr>

      </thead>
      {AmbulanceList && <tbody>
        {Array.isArray(AmbulanceList) && AmbulanceList.map(
          (
            item: DoctorInterface,
            index: number
          ) => {
            const isLast = index === AmbulanceList?.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr
                key={index}
                className="hover:scale-101 hover:shadow-lg hover:transition hover:duration-75"
              >
                <td className='p-4 border-b border-blue-gray-50 '>
                  <div className="w-max h-full flex items-center justify-start gap-2">
                    <Img src={doctorIcon} />
                    <Chip
                      size="sm"
                      variant="ghost"
                      value={item.name}
                      color='green'
                    />
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Typography
                      placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.specialization}
                    </Typography>
                  </div>
                </td>

                <td className={classes}>
                  <div className="flex flex-col">
                    <Typography
                      placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                      variant="small"
                      color="blue-gray"
                      className="font-bold capitalize"
                    >
                      {item.location}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <div className="w-max flex items-center gap-1">
                    <Img
                      src={copyIcon}
                      className="w-4 h-4 cursor-pointer block sm:hidden"
                      onClick={() => {
                        handleCopyToClipboard(item.HospitalContactNumber);
                      }}
                    />
                    <Typography
                      placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.HospitalContactNumber}
                    </Typography>
                  </div>
                </td>
                {isAdmin && <td className={classes}>
                  <div className="w-max text-black flex items-center gap-2 justify-center">
                    <PencilIcon
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => {
                        handleOpenUpdateModal(item);
                      }}
                    />
                    <ConfirmModal
                      title={`Are you sure you want to delete?`}
                      handleConfirm={() => deleteDoctorHandler(item)} // Wrap in a callback
                    >
                      <TrashIcon className="w-5 h-5 cursor-pointer" />
                    </ConfirmModal>

                  </div>
                </td>}
              </tr>
            );
          }
        )}
      </tbody>}
    </table>
  );
}
export default MedicalStaffTable;
