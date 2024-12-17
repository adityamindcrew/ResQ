import React from "react";
import { Textarea } from "@material-tailwind/react";

interface MTTextareaProps {
  label: string;
  error?: string;
  icon?: React.ReactNode; // You can specify `IconType` if using `react-icons`
  [key: string]: any; // Allow additional props
}

const MTTextarea: React.FC<MTTextareaProps> = ({ label, error, icon, ...rest }) => {
  return (
    <div className="flex flex-col w-full" style={{ width: "100%" }}>
      <div className="flex w-full items-center py-2">
        {icon && <span className="text-gray-500">{icon}</span>}
        <Textarea placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
          label={label} {...rest} />
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default MTTextarea;
