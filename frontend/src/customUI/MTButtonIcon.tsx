import React, { useState } from "react";
import { Button, Tooltip } from "@material-tailwind/react";
import useWindowSize from "../hooks/useWindowSize";


interface ButtonProps {
  content?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  color?: string;
  onClick?: () => void;
  [key: string]: any;  // This allows other props to be passed
}
const MTButtonIcon: React.FC<ButtonProps> = ({
  content,
  children,
  icon,
  color = "primary",
  onClick,
  ...rest
}) => {
  const windowSize = useWindowSize();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleClick = async () => {
    setIsDisabled(true);
    try {
      if (onClick) onClick()
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <Tooltip
      content={content}
      className="border border-blue-gray-50 text-black bg-white px-3 py-2 shadow-xl shadow-black/10"
    >
      <Button
        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        // ripple="light"
        onClick={handleClick}
        disabled={isDisabled}
        {...rest}
        size="sm"
        className={`flex gap-1 items-center ${"bg-" + color}`}
      >
        {icon && <i className="text-lg">{icon}</i>}
        {windowSize > 450 && children}
      </Button>
    </Tooltip>
  );
}

export default MTButtonIcon;
