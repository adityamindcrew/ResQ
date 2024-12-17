import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { setAdminPermission, getAdminPermission, validateSecretCode } from "./utils/permission";


// Lazy-loaded components
import AmbulanceService from "@pages/ambulanceService/AmbulanceService";
import MedicalStaff from "@pages/medicalStaff/MedicalStaff";


const App: React.FC = () => {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const isAdmin = getAdminPermission();
    if (!isAdmin) {
      const code = prompt("Enter the secret admin code:");

      if (code === null) {
        // User clicked "Cancel"
        setAdminPermission(false); // Set admin permission to true on cancel
        alert("User access granted!");
      } else if (code.trim() === "") {
        // User entered an empty code
        alert("Please enter a code to enter as admin");
      } else if (validateSecretCode(code)) {
        // Correct code entered
        setAdminPermission(true);
        alert("Admin access granted!");
      } else {
        // Incorrect code
        setAdminPermission(false);
        alert("Access denied! Incorrect code.");
      }
    }
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return <div>Checking admin permissions...</div>;
  }
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AmbulanceService />} />
        <Route path="/medical-staff" element={<MedicalStaff />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
