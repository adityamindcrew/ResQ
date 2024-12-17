import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdCancel } from "react-icons/md";
import MTInput from "../../../customUI/MTInput";
import MTTextarea from "../../../customUI/MTTextarea";
import { validationSchema } from "./ValidationSchema";
import MTButton from "../../../customUI/MTButton";
import AuthDoctorServices from "@services/MedicalStaffServices";
import { toast } from "react-hot-toast";


type FormValues = {
  name: string,
  specialization: string,
  location: string,
  hospital: string,
  HospitalContactNumber: string | number,
};

type ValidationErrors = { [key: string]: string | undefined };

export default function CreateModal({ open, handleOpen, fetchDoctorHandler }: { open: boolean; handleOpen: (item?: any) => void, fetchDoctorHandler?: (item?: any) => void }) {
  const [showError, setShowError] = useState<ValidationErrors>({});
  const [formValue, setFormValue] = useState<FormValues>({
    name: "",
    specialization: "",
    location: "",
    hospital: "",
    HospitalContactNumber: "",
  });

  const handleClose = () => {
    setShowError({});
    setFormValue({
      name: "",
      specialization: "",
      location: "",
      hospital: "",
      HospitalContactNumber: "",
    });
    handleOpen()
  };

  const handleInputChange = (name: string, value: string | number) => {
    setFormValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setShowError((prevValues) => ({
      ...prevValues,
      [name]: undefined,
    }));
  };

  const createDoctorHandler = async () => {
    try {
      await validationSchema.validate(formValue, { abortEarly: false });
      const payload = {
        name: formValue.name,
        specialization: formValue.specialization,
        hospital: formValue.hospital,
        location: formValue.location,
        HospitalContactNumber: formValue.HospitalContactNumber,
      }
      AuthDoctorServices.addDoctor(payload, (item) => {
        if (item?.status === 'success') {
          toast.success(item?.message);
          if (fetchDoctorHandler) {
            fetchDoctorHandler()
          }
          handleClose();
        } else if (item?.status === 'error') {
          toast.error(item?.message);
        }
      })
    } catch (err: any) {
      if (err.inner) {
        const newErrors: ValidationErrors = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setShowError(newErrors);
      }
    }
  };

  return (
    <Dialog
      placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
      size="lg"
      open={open}
      handler={handleClose}
      className="shadow-none overflow-auto"
    >
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="rgba(23,37,83,1)"
        style={{ width: "100%", height: "auto" }}
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="shape-fill"
        ></path>
      </svg>
      <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        className="flex justify-end absolute top-1 right-1 p-0">
        <MdCancel onClick={handleClose} className="cursor-pointer text-secondary" />
      </DialogHeader>
      <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        className="h-[32rem] overflow-auto w-full flex flex-col gap-3">
        <h1 className="text-[rgba(23,37,83,1)] text-lg text-center font-bold">Add Doctor</h1>
        <MTInput
          className="bg-gray-300 col-span-full"
          label="Name"
          size="lg"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (/^[a-zA-Z\s]*$/.test(value)) {
              handleInputChange("name", value);
            }
          }}
          error={showError.name || ''}
          value={formValue.name || ""}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <MTInput
            className="bg-gray-300 col-span-full"
            label="Location"
            size="lg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("location", e.target.value)}
            error={showError.location || ''}
            value={formValue.location || ""}
          />
          <MTInput
            className="bg-gray-300 col-span-full"
            label="Contact Number"
            size="lg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                handleInputChange("HospitalContactNumber", value);
              }
            }}
            error={showError.HospitalContactNumber || ''}
            value={formValue.HospitalContactNumber || ""}
          />
        </div>
        <MTTextarea
          className="bg-gray-300 col-span-full"
          label="Specialization"
          size="lg"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("specialization", e.target.value)
          }
          error={showError.specialization}
          value={formValue.specialization}
        />
      </DialogBody>
      <DialogFooter className="flex items-center gap-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
      >
        <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
          variant="outlined" color="red" onClick={handleClose} size="sm">
          <span>Cancel</span>
        </Button>
        <MTButton variant="filled" className="bg-primary" onClick={createDoctorHandler} size="sm">
          <span>Confirm</span>
        </MTButton>
      </DialogFooter>
    </Dialog>
  );
}
