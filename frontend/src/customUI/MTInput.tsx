import React from "react";
import { Input } from "@material-tailwind/react";

interface MTInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
  size?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
}
function MTInput({ label, error, icon, className, size, onChange, value, ...rest }: MTInputProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full items-center py-2">
        {icon && <span className="text-gray-500">{icon}</span>}
        <Input crossOrigin={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
          label={label} {...rest} value={value}
          onChange={onChange} />
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default MTInput;
