import { useEffect, useState } from "react";
import FullLayout from "@components/fullLayout/FullLayout";
import MedicalStaffTable from "./MedicalStaffTable";
import CreateModal from "./modal/CreateModal";
import Pagination from "@components/pagination/Pagination";
import AuthDoctorServices from "@services/MedicalStaffServices";
import { DoctorInterface, DoctorApiResponse } from "interfaces/MedicalStaffINterface";
import NoDataImage from '@assets/images/noDataIcon.png'
import { Button } from "@material-tailwind/react";
import UpdateModal from "./modal/UpdateModal1";
import { getAdminPermission } from "@utils/permission";
import { toast } from "react-hot-toast";




export default function MedicalStaff() {
  const isAdmin = getAdminPermission();

  const [open, setOpen] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [AmbulanceList, setAmbulanceList] = useState<DoctorApiResponse>();
  const [locationList, setLocationList] = useState([])
  const [page, setPage] = useState<number>(1)
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const handleOpen = () => {
    setOpen(!open)
  };
  const handleOpenUpdateModal = (item: any) => {
    console.log("Ambulance Details to Edit:", item);
    setAmbulanceDetails(item);
    setOpenUpdateModal(!openUpdateModal);
  };
  const [ambulanceDetails, setAmbulanceDetails] = useState<DoctorInterface>();

  const GetPageCountHandler = (count: number) => setPage(count);

  useEffect(() => {
    fetchDoctorHandler()
  }, [page, selectedLocation])

  useEffect(() => {
    fetchDoctorsLocationHandler()
  }, [])

  const fetchDoctorsLocationHandler = async () => {
    const payload = 'doctor'
    setIsLoading(true)
    await AuthDoctorServices.fetchLocationDoctor(payload, (data, error) => {
      setIsLoading(false)
      if (data) {
        setLocationList(data)
      } else {
        console.error("Error Fetching Ambulances:", error);
      }
    });
  }

  const fetchDoctorHandler = async () => {
    const payload = {
      location: selectedLocation,
      page: page
    }
    setIsLoading(true)
    await AuthDoctorServices.fetchDoctors(payload, (data, error) => {
      setIsLoading(false)
      if (data) {
        if (data?.status === 'success') {
          setAmbulanceList(data?.data)
          setTotalCount(data?.totalItem)
        }
      } else {
        console.error("Error Fetching Ambulances:", error);
      }
    });
  }

  const deleteDoctorHandler = async (item: any) => {
    const payload = item.id
    setIsLoading(true)
    await AuthDoctorServices.deleteDoctor(payload, (data, error) => {
      setIsLoading(false)
      if (data) {
        if (data?.status === 'success') {
          toast.success(data?.message);
          fetchDoctorHandler()
        } else if (data?.status === 'error') {
          toast.error(data?.message);
        }
      } else {
        console.error("Error Fetching Ambulances:", error);
      }
    });
  }
  return (
    <div>
      <FullLayout isLoading={isLoading}>
        <CreateModal open={open} handleOpen={handleOpen} fetchDoctorHandler={fetchDoctorHandler} />
        <UpdateModal
          openUpdateModal={openUpdateModal}
          handleOpenUpdateModal={handleOpenUpdateModal}
          fetchDoctorHandler={fetchDoctorHandler}
          ambulanceDetails={ambulanceDetails}
        />

        <div className="flex w-full items-start sm:items-center sm:flex-row justify-between p-2">
          <div className="w-72">
            <select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
              }}
              defaultValue=""
              className="w-full p-2 text-gray-800 bg-secondary border border-gray-300 rounded-md shadow-sm focus:outline-none"
            >
              <option value="">Select location</option>
              {Array.isArray(locationList) &&
                locationList.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
            </select>

          </div>
          {isAdmin && <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleOpen}>Add</Button>
          }        </div>
        <div className="overflow-auto relative w-full">
          {AmbulanceList && <MedicalStaffTable handleOpenUpdateModal={handleOpenUpdateModal} AmbulanceList={AmbulanceList} deleteDoctorHandler={deleteDoctorHandler} />
          }
        </div>
        {
          !AmbulanceList && <div className="w-full h-full flex justify-center items-center flex-col">
            <img src={NoDataImage} className="!w-40 object-cover" />
            <h1 className="font-bold text-[#101010] text-lg">No Data</h1>
          </div>
        }
        <div className="flex items-center justify-center w-full">
          <Pagination GetPageCountHandler={GetPageCountHandler} itemsPerPage={10}
            totalCount={totalCount}
          />
        </div>
      </FullLayout >
    </div >
  );
}
