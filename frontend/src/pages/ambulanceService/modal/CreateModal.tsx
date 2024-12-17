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
import AuthAmbulanceServices from "@services/AmbulanceServices";
import { toast } from "react-hot-toast";


type FormValues = {
  title: string,
  description: string,
  location: string,
  contactNumber: string | number,
};

type ValidationErrors = { [key: string]: string | undefined };

export default function CreateModal({ open, handleOpen, fetchAmbulanceHandler }: { open: boolean; handleOpen: (item?: any) => void, fetchAmbulanceHandler?: (item?: any) => void }) {
  const [showError, setShowError] = useState<ValidationErrors>({});
  const [formValue, setFormValue] = useState<FormValues>({
    title: "",
    description: "",
    location: "",
    contactNumber: "",
  });

  const handleClose = () => {
    setShowError({});
    setFormValue({
      title: "",
      description: "",
      location: "",
      contactNumber: "",
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

  const addAmbulanceHandler = async () => {
    try {
      await validationSchema.validate(formValue, { abortEarly: false });
      const payload = {
        title: formValue.title,
        description: formValue.description,
        location: formValue.location,
        contactNumber: formValue.contactNumber,
      }
      AuthAmbulanceServices.addAmbulances(payload, (item) => {
        console.log(item.response);

        if (item?.status === 'success') {
          toast.success(item?.message)
          if (fetchAmbulanceHandler) {
            fetchAmbulanceHandler()
          }
          handleClose();
        } else if (item?.status === 'error') {
          toast.error(item?.message)
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
        <h1 className="text-[rgba(23,37,83,1)] text-lg text-center font-bold">Add Ambulance</h1>
        <MTInput
          className="bg-gray-300 col-span-full"
          label="Title"
          size="lg"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (/^[a-zA-Z\s]*$/.test(value)) {
              handleInputChange("title", value);
            }
          }}
          error={showError.title || ''}
          value={formValue.title || ""}
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
                handleInputChange("contactNumber", value);
              }
            }}
            error={showError.contactNumber || ''}
            value={formValue.contactNumber || ""}
          />
        </div>
        <MTTextarea
          className="bg-gray-300 col-span-full"
          label="Description"
          size="lg"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("description", e.target.value)
          }
          error={showError.description}
          value={formValue.description}
        />
      </DialogBody>
      <DialogFooter className="flex items-center gap-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
      >
        <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
          variant="outlined" color="red" onClick={handleClose} size="sm">
          <span>Cancel</span>
        </Button>
        <MTButton variant="filled" className="bg-primary" onClick={addAmbulanceHandler} size="sm">
          <span>Confirm</span>
        </MTButton>
      </DialogFooter>
    </Dialog>
  );
}
