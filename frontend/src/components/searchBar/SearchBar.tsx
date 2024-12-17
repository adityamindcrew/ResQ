import React from "react";
import { Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ ...props }) {
  return (
    <div className="w-72 flex gap-1 items-start justify-center py-2">
      <Input
        {...props}
        type="search"
        placeholder="Search..."
        style={{ borderRadius: "50px" }}
        className="!border !border-gray-300 bg-white font-medium text-gray-900 shadow-lg shadow-gray-900/5 ring-1 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
        labelProps={{
          className: "hidden",
        }}
        containerProps={{ className: "min-w-[100px]" }}
        icon={<FaSearch />}
      />
    </div>
  );
}
