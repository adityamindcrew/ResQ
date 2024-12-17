import React, { useEffect } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface SimplePaginationProps {
  GetPageCountHandler: (count: number) => void;
  itemsPerPage: number;
  totalCount?: number;
}

const SimplePagination: React.FC<SimplePaginationProps> = ({
  GetPageCountHandler,
  itemsPerPage,
  totalCount = 0, // Default to 0 if totalCount is undefined
}) => {
  const [active, setActive] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0); // Total number of pages

  useEffect(() => {
    // Calculate total pages based on the totalItem and itemsPerPage
    const pages = Math.ceil((totalCount || 0) / itemsPerPage); // Rounds up to the nearest integer
    setTotalPages(pages);
  }, [totalCount, itemsPerPage]);

  // Function to go to the next page
  const next = () => {
    if (active < totalPages) {
      setActive((prev) => {
        const newActive = prev + 1;
        GetPageCountHandler(newActive);
        return newActive;
      });
    }
  };

  // Function to go to the previous page
  const prev = () => {
    if (active > 1) {
      setActive((prev) => {
        const newActive = prev - 1;
        GetPageCountHandler(newActive);
        return newActive;
      });
    }
  };

  return (
    <div className="flex items-center gap-8 h-[10vh]">
      <IconButton
        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        size="sm"
        onClick={prev}
        disabled={active === 1}
        className="bg-primary text-white"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>

      <Typography placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} color="gray" className="font-normal">
        Page <strong className="text-gray-700">{active}</strong> of{" "}
        <strong className="text-gray-700">{totalPages}</strong>
      </Typography>

      <IconButton
        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        size="sm"
        onClick={next}
        disabled={active === totalPages}
        className="bg-primary text-white"
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
};

export default SimplePagination;
