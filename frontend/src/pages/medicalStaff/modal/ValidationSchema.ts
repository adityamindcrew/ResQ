import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  specialization: Yup.string().required("Specialization is required"),
  location: Yup.string().required("Location is required"),
  HospitalContactNumber: Yup.string().required("Contact Number is required"),
});
