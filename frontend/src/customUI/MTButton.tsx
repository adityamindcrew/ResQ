import React, { useState } from "react";
import { Button, Tooltip } from "@material-tailwind/react";

interface MTButtonProps {
  content?: string; // Tooltip content
  children: React.ReactNode; // Button content
  color?: string; // Button color
  onClick?: () => Promise<void> | void; // Optional async click handler
  [key: string]: any; // Additional props
}

const MTButton: React.FC<MTButtonProps> = ({
  content = "Click me", // Default tooltip content
  children,
  color = "blue", // Default button color
  onClick,
  ...rest
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = async () => {
    if (!onClick) return; // Handle cases where onClick is undefined
    setIsDisabled(true);
    try {
      await onClick();
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <Tooltip
      content={content}
      className="border border-blue-gray-50 text-black bg-white shadow-xl shadow-black/10"
    >
      <Button
        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        // color={color ? color : 'blue'}
        onClick={handleClick}
        disabled={isDisabled}
        {...rest}
        size="sm"
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default MTButton;
